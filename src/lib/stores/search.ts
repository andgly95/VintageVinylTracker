import { writable } from 'svelte/store';
import type { DiscogsSearchResult, BlueChipRecord } from '../domain/types';
import { searchRecords } from '../data/blueChipRecords';

export interface SearchState {
	query: string;
	isLoading: boolean;
	localResults: BlueChipRecord[];
	discogsResults: DiscogsSearchResult[];
	error: string | null;
	hasSearched: boolean;
}

const initialState: SearchState = {
	query: '',
	isLoading: false,
	localResults: [],
	discogsResults: [],
	error: null,
	hasSearched: false
};

function createSearchStore() {
	const { subscribe, set, update } = writable<SearchState>(initialState);

	return {
		subscribe,

		setQuery: (query: string) => {
			update(state => ({ ...state, query }));
		},

		searchLocal: (query: string) => {
			if (!query.trim()) {
				update(state => ({
					...state,
					query: '',
					localResults: [],
					hasSearched: false
				}));
				return;
			}

			const results = searchRecords(query);
			update(state => ({
				...state,
				query,
				localResults: results,
				hasSearched: true
			}));
		},

		setDiscogsResults: (results: DiscogsSearchResult[]) => {
			update(state => ({
				...state,
				discogsResults: results,
				isLoading: false
			}));
		},

		setLoading: (isLoading: boolean) => {
			update(state => ({ ...state, isLoading }));
		},

		setError: (error: string | null) => {
			update(state => ({ ...state, error, isLoading: false }));
		},

		clear: () => {
			set(initialState);
		}
	};
}

export const searchStore = createSearchStore();
