/**
 * Discogs API client for browser-side use.
 * Unauthenticated tier: 25 requests per minute.
 * Be stingy with calls - cache aggressively.
 */

import type {
	DiscogsSearchResult,
	DiscogsMaster,
	DiscogsRelease,
	DiscogsPriceSuggestions,
	Master,
	Release
} from '../domain/types';

const DISCOGS_API_BASE = 'https://api.discogs.com';
const USER_AGENT = 'VintageVinylTracker/0.1.0';

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours for stable data
const RATE_LIMIT_DELAY = 2500; // 2.5 seconds between calls (safe for 25/min)

let lastRequestTime = 0;

async function rateLimitedFetch(url: string): Promise<Response> {
	const now = Date.now();
	const timeSinceLastRequest = now - lastRequestTime;

	if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
		await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest));
	}

	lastRequestTime = Date.now();

	const response = await fetch(url, {
		headers: {
			'User-Agent': USER_AGENT
		}
	});

	if (response.status === 429) {
		// Rate limited - wait and retry once
		await new Promise(resolve => setTimeout(resolve, 60000));
		return fetch(url, {
			headers: {
				'User-Agent': USER_AGENT
			}
		});
	}

	return response;
}

function getCached<T>(key: string): T | null {
	const cached = cache.get(key);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.data as T;
	}
	cache.delete(key);
	return null;
}

function setCache<T>(key: string, data: T): void {
	cache.set(key, { data, timestamp: Date.now() });
}

export async function searchMasters(query: string, page = 1): Promise<{
	results: DiscogsSearchResult[];
	pagination: { pages: number; items: number };
}> {
	const cacheKey = `search:master:${query}:${page}`;
	const cached = getCached<{ results: DiscogsSearchResult[]; pagination: { pages: number; items: number } }>(cacheKey);
	if (cached) return cached;

	const url = `${DISCOGS_API_BASE}/database/search?q=${encodeURIComponent(query)}&type=master&per_page=25&page=${page}`;
	const response = await rateLimitedFetch(url);

	if (!response.ok) {
		throw new Error(`Discogs API error: ${response.status}`);
	}

	const data = await response.json();
	const result = {
		results: data.results as DiscogsSearchResult[],
		pagination: {
			pages: data.pagination?.pages || 1,
			items: data.pagination?.items || 0
		}
	};

	setCache(cacheKey, result);
	return result;
}

export async function getMaster(masterId: number): Promise<DiscogsMaster> {
	const cacheKey = `master:${masterId}`;
	const cached = getCached<DiscogsMaster>(cacheKey);
	if (cached) return cached;

	const url = `${DISCOGS_API_BASE}/masters/${masterId}`;
	const response = await rateLimitedFetch(url);

	if (!response.ok) {
		throw new Error(`Discogs API error: ${response.status}`);
	}

	const data = await response.json();
	setCache(cacheKey, data);
	return data as DiscogsMaster;
}

export async function getMasterVersions(
	masterId: number,
	options: { page?: number; perPage?: number; sort?: string; sortOrder?: string } = {}
): Promise<{
	versions: DiscogsRelease[];
	pagination: { pages: number; items: number };
}> {
	const { page = 1, perPage = 50, sort = 'released', sortOrder = 'asc' } = options;
	const cacheKey = `master:${masterId}:versions:${page}:${perPage}:${sort}:${sortOrder}`;
	const cached = getCached<{ versions: DiscogsRelease[]; pagination: { pages: number; items: number } }>(cacheKey);
	if (cached) return cached;

	const url = `${DISCOGS_API_BASE}/masters/${masterId}/versions?page=${page}&per_page=${perPage}&sort=${sort}&sort_order=${sortOrder}`;
	const response = await rateLimitedFetch(url);

	if (!response.ok) {
		throw new Error(`Discogs API error: ${response.status}`);
	}

	const data = await response.json();
	const result = {
		versions: data.versions as DiscogsRelease[],
		pagination: {
			pages: data.pagination?.pages || 1,
			items: data.pagination?.items || 0
		}
	};

	setCache(cacheKey, result);
	return result;
}

export async function getRelease(releaseId: number): Promise<DiscogsRelease> {
	const cacheKey = `release:${releaseId}`;
	const cached = getCached<DiscogsRelease>(cacheKey);
	if (cached) return cached;

	const url = `${DISCOGS_API_BASE}/releases/${releaseId}`;
	const response = await rateLimitedFetch(url);

	if (!response.ok) {
		throw new Error(`Discogs API error: ${response.status}`);
	}

	const data = await response.json();
	setCache(cacheKey, data);
	return data as DiscogsRelease;
}

export async function getPriceSuggestions(releaseId: number): Promise<DiscogsPriceSuggestions | null> {
	// Note: This endpoint requires authentication
	// For unauthenticated, we'll return null and use our seed data estimates
	const cacheKey = `price:${releaseId}`;
	const cached = getCached<DiscogsPriceSuggestions | null>(cacheKey);
	if (cached !== null) return cached;

	try {
		const url = `${DISCOGS_API_BASE}/marketplace/price_suggestions/${releaseId}`;
		const response = await rateLimitedFetch(url);

		if (!response.ok) {
			// Expected for unauthenticated requests
			setCache(cacheKey, null);
			return null;
		}

		const data = await response.json();
		setCache(cacheKey, data);
		return data as DiscogsPriceSuggestions;
	} catch {
		setCache(cacheKey, null);
		return null;
	}
}

// Transform Discogs data to our domain types
export function discogsToMaster(d: DiscogsMaster): Master {
	return {
		id: d.id,
		title: d.title,
		artist: d.artists?.[0]?.name || 'Unknown Artist',
		year: d.year,
		genres: d.genres || [],
		styles: d.styles || [],
		thumb: d.images?.[0]?.uri,
		discogsUrl: `https://www.discogs.com${d.uri}`
	};
}

export function discogsToRelease(d: DiscogsRelease): Release {
	return {
		id: d.id,
		masterId: d.master_id,
		title: d.title,
		artist: d.artists?.[0]?.name || 'Unknown Artist',
		year: d.year,
		country: d.country || 'Unknown',
		label: d.labels?.[0]?.name || 'Unknown',
		catno: d.labels?.[0]?.catno || '',
		format: d.formats?.[0]?.name || 'Vinyl',
		formatDetails: d.formats?.[0]?.descriptions,
		notes: d.notes,
		thumb: d.images?.[0]?.uri,
		discogsUrl: `https://www.discogs.com/release/${d.id}`,
		numForSale: d.num_for_sale,
		lowestPrice: d.lowest_price
	};
}

// Generate Discogs marketplace URL for deep linking
export function getMarketplaceUrl(releaseId: number, condition?: string): string {
	let url = `https://www.discogs.com/sell/release/${releaseId}?sort=price%2Casc`;
	if (condition) {
		const conditionMap: Record<string, string> = {
			'M': 'Mint (M)',
			'NM': 'Near Mint (NM or M-)',
			'VG+': 'Very Good Plus (VG+)',
			'VG': 'Very Good (VG)',
			'G+': 'Good Plus (G+)',
			'G': 'Good (G)',
			'F': 'Fair (F)',
			'P': 'Poor (P)'
		};
		const conditionValue = conditionMap[condition];
		if (conditionValue) {
			url += `&condition=${encodeURIComponent(conditionValue)}`;
		}
	}
	return url;
}

// Clear cache (useful for manual refresh)
export function clearCache(): void {
	cache.clear();
}

// Get cache stats
export function getCacheStats(): { size: number; entries: string[] } {
	return {
		size: cache.size,
		entries: Array.from(cache.keys())
	};
}
