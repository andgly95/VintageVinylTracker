import { writable, derived, get } from 'svelte/store';
import type { Condition } from '../domain/types';

export interface CollectionItem {
	id: string;
	masterId: number;
	releaseId?: number;
	artist: string;
	title: string;
	label?: string;
	catno?: string;
	year?: number;
	condition: Condition;
	purchasePrice?: number;
	purchaseDate?: string;
	notes?: string;
	addedAt: number;
	thumb?: string;
}

const STORAGE_KEY = 'vvt_collection';

function loadCollection(): CollectionItem[] {
	if (typeof window === 'undefined') return [];

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (e) {
		console.error('Failed to load collection:', e);
	}
	return [];
}

function saveCollection(items: CollectionItem[]): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch (e) {
		console.error('Failed to save collection:', e);
	}
}

function createCollectionStore() {
	const { subscribe, set, update } = writable<CollectionItem[]>([]);

	if (typeof window !== 'undefined') {
		set(loadCollection());
	}

	return {
		subscribe,

		add: (item: Omit<CollectionItem, 'id' | 'addedAt'>) => {
			update(items => {
				const newItem: CollectionItem = {
					...item,
					id: crypto.randomUUID(),
					addedAt: Date.now()
				};

				const updated = [...items, newItem];
				saveCollection(updated);
				return updated;
			});
		},

		remove: (id: string) => {
			update(items => {
				const updated = items.filter(i => i.id !== id);
				saveCollection(updated);
				return updated;
			});
		},

		updateItem: (id: string, updates: Partial<CollectionItem>) => {
			update(items => {
				const updated = items.map(item =>
					item.id === id ? { ...item, ...updates } : item
				);
				saveCollection(updated);
				return updated;
			});
		},

		isInCollection: (masterId: number, releaseId?: number): boolean => {
			const items = get({ subscribe });
			return items.some(i =>
				i.masterId === masterId &&
				(releaseId === undefined || i.releaseId === releaseId)
			);
		},

		getByMasterId: (masterId: number): CollectionItem | undefined => {
			const items = get({ subscribe });
			return items.find(i => i.masterId === masterId);
		},

		clear: () => {
			set([]);
			saveCollection([]);
		},

		// Export collection as JSON for backup
		export: (): string => {
			const items = get({ subscribe });
			return JSON.stringify(items, null, 2);
		},

		// Import collection from JSON
		import: (json: string) => {
			try {
				const items = JSON.parse(json) as CollectionItem[];
				set(items);
				saveCollection(items);
				return true;
			} catch {
				return false;
			}
		}
	};
}

export const collection = createCollectionStore();

export const collectionCount = derived(collection, $collection => $collection.length);

export const collectionValue = derived(collection, $collection =>
	$collection.reduce((sum, item) => sum + (item.purchasePrice || 0), 0)
);

export function addToCollection(
	masterId: number,
	artist: string,
	title: string,
	options: {
		releaseId?: number;
		label?: string;
		catno?: string;
		year?: number;
		condition?: Condition;
		purchasePrice?: number;
		purchaseDate?: string;
		notes?: string;
		thumb?: string;
	} = {}
): void {
	collection.add({
		masterId,
		artist,
		title,
		releaseId: options.releaseId,
		label: options.label,
		catno: options.catno,
		year: options.year,
		condition: options.condition || 'VG+',
		purchasePrice: options.purchasePrice,
		purchaseDate: options.purchaseDate,
		notes: options.notes,
		thumb: options.thumb
	});
}
