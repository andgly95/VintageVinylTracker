// Core domain types for VintageVinylTracker

export interface Master {
	id: number; // Discogs master_id
	title: string;
	artist: string;
	year: number;
	genres: string[];
	styles: string[];
	thumb?: string;
	discogsUrl: string;
}

export interface Release {
	id: number; // Discogs release_id
	masterId: number;
	title: string;
	artist: string;
	year: number;
	country: string;
	label: string;
	catno: string;
	format: string;
	formatDetails?: string[];
	notes?: string;
	thumb?: string;
	discogsUrl: string;
	numForSale?: number;
	lowestPrice?: number;
}

export interface PressingQuality {
	releaseId: number;
	hasRvgStamp: boolean;
	hasDeepGroove: boolean;
	hasEarMark: boolean;
	matrixSuffix?: string;
	labelVariant: LabelVariant;
	qualityScore: number; // 1-10
	qualityNotes: string[];
	isFirstPressing: boolean;
}

export type LabelVariant =
	| 'blue_note_lexington'
	| 'blue_note_ny_47'
	| 'blue_note_ny_liberty'
	| 'blue_note_ua'
	| 'columbia_6eye_mono'
	| 'columbia_6eye_stereo'
	| 'columbia_2eye'
	| 'prestige_ny'
	| 'prestige_nj'
	| 'prestige_fantasy'
	| 'impulse_orange_black'
	| 'impulse_abc'
	| 'riverside_blue'
	| 'riverside_black'
	| 'contemporary'
	| 'atlantic_red_black'
	| 'verve_clef'
	| 'verve_mgm'
	| 'other';

export interface BlueChipRecord {
	masterId: number;
	rank: number;
	category: BlueChipCategory;
	artist: string;
	title: string;
	year: number;
	whyValuable: string;
	priceRange: { low: number; high: number };
	keyPressings: KeyPressing[];
	thumb?: string;
}

export interface KeyPressing {
	label: string;
	catno: string;
	year: number;
	variant: LabelVariant;
	description: string;
	estimatedValue: number;
	isFirstPressing: boolean;
	releaseId?: number; // Discogs release_id if known
}

export type BlueChipCategory =
	| 'blue_note'
	| 'columbia'
	| 'prestige'
	| 'impulse'
	| 'riverside'
	| 'contemporary'
	| 'atlantic'
	| 'verve';

export interface WatchlistItem {
	id: string;
	masterId: number;
	releaseId?: number; // specific pressing, or null for any pressing of master
	artist: string;
	title: string;
	maxPrice: number;
	targetCondition: Condition;
	notes?: string;
	isTopTen: boolean;
	rank?: number; // 1-10 for top ten
	addedAt: number; // timestamp
	thumb?: string;
}

export type Condition = 'M' | 'NM' | 'VG+' | 'VG' | 'G+' | 'G' | 'F' | 'P';

export interface PriceSnapshot {
	releaseId: number;
	lowestPrice?: number;
	numForSale: number;
	vgPrice?: number;
	vgPlusPrice?: number;
	nmPrice?: number;
	mintPrice?: number;
	capturedAt: number;
}

// Discogs API response types
export interface DiscogsSearchResult {
	id: number;
	type: 'master' | 'release';
	title: string;
	thumb: string;
	uri: string;
	year?: string;
	label?: string[];
	catno?: string;
	country?: string;
}

export interface DiscogsMaster {
	id: number;
	title: string;
	artists: { name: string }[];
	year: number;
	genres: string[];
	styles: string[];
	images?: { uri: string; type: string }[];
	uri: string;
	main_release: number;
	num_for_sale: number;
	lowest_price: number;
}

export interface DiscogsRelease {
	id: number;
	master_id: number;
	title: string;
	artists: { name: string }[];
	year: number;
	country: string;
	labels: { name: string; catno: string }[];
	formats: { name: string; qty: string; descriptions?: string[] }[];
	notes?: string;
	images?: { uri: string; type: string }[];
	uri: string;
	num_for_sale: number;
	lowest_price: number;
}

export interface DiscogsPriceSuggestions {
	'Very Good (VG)': { value: number; currency: string };
	'Very Good Plus (VG+)': { value: number; currency: string };
	'Near Mint (NM or M-)': { value: number; currency: string };
	'Mint (M)': { value: number; currency: string };
}
