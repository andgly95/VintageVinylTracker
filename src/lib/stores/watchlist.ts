import { writable, derived, get } from 'svelte/store';
import type { WatchlistItem, Condition } from '../domain/types';

const STORAGE_KEY = 'vvt_watchlist';

// Load from localStorage
function loadWatchlist(): WatchlistItem[] {
	if (typeof window === 'undefined') return [];

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (e) {
		console.error('Failed to load watchlist:', e);
	}
	return [];
}

// Save to localStorage
function saveWatchlist(items: WatchlistItem[]): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch (e) {
		console.error('Failed to save watchlist:', e);
	}
}

// Create the store
function createWatchlistStore() {
	const { subscribe, set, update } = writable<WatchlistItem[]>([]);

	// Initialize from localStorage when in browser
	if (typeof window !== 'undefined') {
		set(loadWatchlist());
	}

	return {
		subscribe,

		add: (item: Omit<WatchlistItem, 'id' | 'addedAt'>) => {
			update(items => {
				// Check if already exists
				if (items.some(i => i.masterId === item.masterId && i.releaseId === item.releaseId)) {
					return items;
				}

				const newItem: WatchlistItem = {
					...item,
					id: crypto.randomUUID(),
					addedAt: Date.now()
				};

				const updated = [...items, newItem];
				saveWatchlist(updated);
				return updated;
			});
		},

		remove: (id: string) => {
			update(items => {
				const updated = items.filter(i => i.id !== id);
				saveWatchlist(updated);
				return updated;
			});
		},

		updateItem: (id: string, updates: Partial<WatchlistItem>) => {
			update(items => {
				const updated = items.map(item =>
					item.id === id ? { ...item, ...updates } : item
				);
				saveWatchlist(updated);
				return updated;
			});
		},

		setTopTen: (id: string, isTopTen: boolean, rank?: number) => {
			update(items => {
				let updated = items.map(item => {
					if (item.id === id) {
						return { ...item, isTopTen, rank: isTopTen ? rank : undefined };
					}
					// If assigning a rank, shift others
					if (isTopTen && rank && item.isTopTen && item.rank && item.rank >= rank) {
						return { ...item, rank: item.rank + 1 };
					}
					return item;
				});

				// Clean up ranks - ensure no gaps and max of 10
				const topTenItems = updated
					.filter(i => i.isTopTen)
					.sort((a, b) => (a.rank || 99) - (b.rank || 99))
					.slice(0, 10);

				updated = updated.map(item => {
					if (item.isTopTen) {
						const idx = topTenItems.findIndex(t => t.id === item.id);
						if (idx === -1) {
							return { ...item, isTopTen: false, rank: undefined };
						}
						return { ...item, rank: idx + 1 };
					}
					return item;
				});

				saveWatchlist(updated);
				return updated;
			});
		},

		isInWatchlist: (masterId: number, releaseId?: number): boolean => {
			const items = get({ subscribe });
			return items.some(i =>
				i.masterId === masterId &&
				(releaseId === undefined || i.releaseId === releaseId)
			);
		},

		clear: () => {
			set([]);
			saveWatchlist([]);
		}
	};
}

export const watchlist = createWatchlistStore();

// Derived stores
export const topTen = derived(watchlist, $watchlist =>
	$watchlist
		.filter(item => item.isTopTen)
		.sort((a, b) => (a.rank || 99) - (b.rank || 99))
		.slice(0, 10)
);

export const watchlistCount = derived(watchlist, $watchlist => $watchlist.length);

// Helper to check if a master is in watchlist
export function isInWatchlist(masterId: number, releaseId?: number): boolean {
	return watchlist.isInWatchlist(masterId, releaseId);
}

// Helper to add to watchlist with defaults
export function addToWatchlist(
	masterId: number,
	artist: string,
	title: string,
	options: {
		releaseId?: number;
		maxPrice?: number;
		targetCondition?: Condition;
		notes?: string;
		isTopTen?: boolean;
		thumb?: string;
	} = {}
): void {
	watchlist.add({
		masterId,
		artist,
		title,
		releaseId: options.releaseId,
		maxPrice: options.maxPrice || 500,
		targetCondition: options.targetCondition || 'VG+',
		notes: options.notes,
		isTopTen: options.isTopTen || false,
		thumb: options.thumb
	});
}
