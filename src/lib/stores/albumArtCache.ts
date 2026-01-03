import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Cache for album art URLs fetched from Discogs.
 * Persists to localStorage to avoid re-fetching.
 */

interface AlbumArtCache {
	[masterId: number]: {
		url: string;
		fetchedAt: number;
	};
}

const STORAGE_KEY = 'vinyl-tracker-album-art';
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days - album art doesn't change

function loadFromStorage(): AlbumArtCache {
	if (!browser) return {};
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored) as AlbumArtCache;
			// Clean up expired entries
			const now = Date.now();
			const cleaned: AlbumArtCache = {};
			for (const [id, entry] of Object.entries(parsed)) {
				if (now - entry.fetchedAt < CACHE_TTL) {
					cleaned[parseInt(id)] = entry;
				}
			}
			return cleaned;
		}
	} catch (e) {
		console.error('Failed to load album art cache:', e);
	}
	return {};
}

function saveToStorage(cache: AlbumArtCache): void {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
	} catch (e) {
		console.error('Failed to save album art cache:', e);
	}
}

function createAlbumArtCache() {
	const { subscribe, set, update } = writable<AlbumArtCache>(loadFromStorage());

	return {
		subscribe,

		/**
		 * Get cached URL for a master ID, or undefined if not cached
		 */
		get(masterId: number): string | undefined {
			const cache = get({ subscribe });
			const entry = cache[masterId];
			if (entry && Date.now() - entry.fetchedAt < CACHE_TTL) {
				return entry.url;
			}
			return undefined;
		},

		/**
		 * Store a cover URL for a master ID
		 */
		set(masterId: number, url: string): void {
			update(cache => {
				const newCache = {
					...cache,
					[masterId]: { url, fetchedAt: Date.now() }
				};
				saveToStorage(newCache);
				return newCache;
			});
		},

		/**
		 * Check if we have a cached URL (even if loading)
		 */
		has(masterId: number): boolean {
			const cache = get({ subscribe });
			return masterId in cache;
		},

		/**
		 * Get all cached master IDs
		 */
		getCachedIds(): number[] {
			const cache = get({ subscribe });
			return Object.keys(cache).map(id => parseInt(id));
		},

		/**
		 * Clear the entire cache
		 */
		clear(): void {
			set({});
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	};
}

export const albumArtCache = createAlbumArtCache();

// Track in-flight requests to avoid duplicate fetches
const pendingFetches = new Set<number>();

/**
 * Fetch album art for a master ID from Discogs API.
 * Returns the image URL or null if not available.
 * Automatically caches the result.
 */
export async function fetchAlbumArt(masterId: number): Promise<string | null> {
	// Check cache first
	const cached = albumArtCache.get(masterId);
	if (cached) return cached;

	// Avoid duplicate fetches
	if (pendingFetches.has(masterId)) return null;
	pendingFetches.add(masterId);

	try {
		// Import dynamically to avoid SSR issues
		const { getMaster } = await import('$lib/api/discogs');
		const master = await getMaster(masterId);

		// Get the primary image (first one is usually the cover)
		const imageUrl = master.images?.[0]?.uri || master.images?.[0]?.resource_url;

		if (imageUrl) {
			albumArtCache.set(masterId, imageUrl);
			return imageUrl;
		}

		return null;
	} catch (e) {
		console.error(`Failed to fetch album art for master ${masterId}:`, e);
		return null;
	} finally {
		pendingFetches.delete(masterId);
	}
}
