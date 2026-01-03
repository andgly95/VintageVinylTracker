<script lang="ts">
	import { base } from '$app/paths';
	import { blueChipRecords, getTopRecords, getCategoryDisplayName, searchRecords, getRecordByMasterId } from '$lib/data/blueChipRecords';
	import { topTen, watchlist, addToWatchlist } from '$lib/stores/watchlist';
	import { collection, addToCollection } from '$lib/stores/collection';
	import { albumArtCache } from '$lib/stores/albumArtCache';
	import AlbumArt from '$lib/components/AlbumArt.svelte';
	import type { BlueChipCategory, BlueChipRecord, Condition } from '$lib/domain/types';

	let searchQuery = '';
	let searchResults: BlueChipRecord[] = [];
	let showSearch = false;

	// Add to collection modal state
	let showAddToCollection = false;
	let selectedRecord: BlueChipRecord | null = null;
	let addCondition: Condition = 'VG+';
	let addPurchasePrice: number | undefined;
	let addNotes = '';
	let addLabel = '';
	let addCatno = '';

	const categories: BlueChipCategory[] = ['blue_note', 'columbia', 'prestige', 'impulse', 'riverside', 'contemporary', 'atlantic', 'verve'];
	const conditions: Condition[] = ['M', 'NM', 'VG+', 'VG', 'G+', 'G', 'F', 'P'];

	function handleSearch() {
		if (searchQuery.trim()) {
			searchResults = searchRecords(searchQuery);
			showSearch = true;
		} else {
			searchResults = [];
			showSearch = false;
		}
	}

	function clearSearch() {
		searchQuery = '';
		searchResults = [];
		showSearch = false;
	}

	function formatPrice(range: { low: number; high: number }): string {
		return `$${range.low} - $${range.high}`;
	}

	function handleAddToWatchlist(record: BlueChipRecord) {
		addToWatchlist(record.masterId, record.artist, record.title, {
			maxPrice: 500,
			targetCondition: 'VG+',
			thumb: record.thumb
		});
	}

	function isInWatchlist(masterId: number): boolean {
		return $watchlist.some(item => item.masterId === masterId);
	}

	function isInCollection(masterId: number): boolean {
		return $collection.some(item => item.masterId === masterId);
	}

	function getCategoryForMasterId(masterId: number): BlueChipCategory | undefined {
		const record = getRecordByMasterId(masterId);
		return record?.category;
	}

	function getCoverUrl(masterId: number): string | undefined {
		return $albumArtCache[masterId]?.url;
	}

	function openAddToCollection(record: BlueChipRecord) {
		selectedRecord = record;
		// Pre-fill with first pressing info if available
		const firstPressing = record.keyPressings[0];
		if (firstPressing) {
			addLabel = firstPressing.label;
			addCatno = firstPressing.catno;
		}
		showAddToCollection = true;
	}

	function handleAddToCollection() {
		if (!selectedRecord) return;
		addToCollection(selectedRecord.masterId, selectedRecord.artist, selectedRecord.title, {
			condition: addCondition,
			purchasePrice: addPurchasePrice,
			notes: addNotes,
			label: addLabel,
			catno: addCatno,
			year: selectedRecord.year,
			thumb: selectedRecord.thumb
		});
		closeAddToCollection();
	}

	function closeAddToCollection() {
		showAddToCollection = false;
		selectedRecord = null;
		addCondition = 'VG+';
		addPurchasePrice = undefined;
		addNotes = '';
		addLabel = '';
		addCatno = '';
	}
</script>

<svelte:head>
	<title>VintageVinylTracker - Blue Chip Jazz Vinyl</title>
</svelte:head>

<div class="space-y-8">
	<!-- Search -->
	<div class="relative">
		<div class="flex gap-2">
			<input
				type="text"
				bind:value={searchQuery}
				on:input={handleSearch}
				placeholder="Search artists, albums, or labels..."
				class="flex-1 bg-vinyl-groove border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-vinyl-label"
			/>
			{#if searchQuery}
				<button
					on:click={clearSearch}
					class="px-4 py-2 bg-vinyl-groove border border-gray-600 rounded-lg text-gray-400 hover:text-white"
				>
					Clear
				</button>
			{/if}
		</div>

		{#if showSearch && searchResults.length > 0}
			<div class="absolute top-full left-0 right-0 mt-2 bg-vinyl-groove border border-gray-600 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
				{#each searchResults as record}
					<a
						href="{base}/masters/{record.masterId}"
						class="flex items-center gap-4 p-4 hover:bg-gray-700 border-b border-gray-700 last:border-0"
						on:click={clearSearch}
					>
						<AlbumArt
							title={record.title}
							artist={record.artist}
							category={record.category}
							imageUrl={getCoverUrl(record.masterId)}
							size="sm"
						/>
						<div class="flex-1 min-w-0">
							<div class="font-medium text-white truncate">{record.title}</div>
							<div class="text-sm text-gray-400 truncate">{record.artist} ({record.year})</div>
						</div>
						<div class="text-vinyl-label text-sm">#{record.rank}</div>
					</a>
				{/each}
			</div>
		{:else if showSearch && searchQuery.length > 2}
			<div class="absolute top-full left-0 right-0 mt-2 bg-vinyl-groove border border-gray-600 rounded-lg shadow-xl z-10 p-4 text-gray-400">
				No results found. Try searching Discogs for more records.
			</div>
		{/if}
	</div>

	<!-- Your Collection -->
	{#if $collection.length > 0}
		<section>
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-bold text-white">Your Collection</h2>
				<a href="{base}/collection" class="text-vinyl-label hover:underline text-sm">View all ({$collection.length}) →</a>
			</div>

			<div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
				{#each $collection.slice(0, 10) as item}
					<a
						href="{base}/masters/{item.masterId}"
						class="flex-shrink-0 w-36 snap-start"
					>
						<div class="bg-vinyl-groove rounded-lg overflow-hidden hover:ring-2 hover:ring-green-500 transition-all">
							<div class="aspect-square relative">
								<AlbumArt
									title={item.title}
									artist={item.artist}
									category={getCategoryForMasterId(item.masterId)}
									imageUrl={getCoverUrl(item.masterId)}
									size="fill"
								/>
								<span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
									{item.condition}
								</span>
							</div>
							<div class="p-3">
								<div class="font-medium text-white text-sm truncate">{item.title}</div>
								<div class="text-xs text-gray-400 truncate">{item.artist}</div>
								{#if item.purchasePrice}
									<div class="text-xs text-green-400 mt-1">${item.purchasePrice}</div>
								{/if}
							</div>
						</div>
					</a>
				{/each}

				<a
					href="{base}/collection"
					class="flex-shrink-0 w-36 snap-start"
				>
					<div class="bg-vinyl-groove rounded-lg overflow-hidden border-2 border-dashed border-gray-600 hover:border-green-500 transition-colors h-full flex flex-col items-center justify-center min-h-[200px]">
						<span class="text-3xl mb-2 text-green-500">+</span>
						<span class="text-sm text-gray-400">Add more</span>
					</div>
				</a>
			</div>
		</section>
	{/if}

	<!-- Your Top 10 Watchlist -->
	<section>
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-xl font-bold text-white">Your Top 10 Watchlist</h2>
			<a href="{base}/watchlist" class="text-vinyl-label hover:underline text-sm">Manage →</a>
		</div>

		{#if $topTen.length > 0}
			<div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
				{#each $topTen as item, i}
					<a
						href="{base}/masters/{item.masterId}"
						class="flex-shrink-0 w-36 snap-start"
					>
						<div class="bg-vinyl-groove rounded-lg overflow-hidden hover:ring-2 hover:ring-vinyl-label transition-all">
							<div class="aspect-square relative">
								<AlbumArt
									title={item.title}
									artist={item.artist}
									category={getCategoryForMasterId(item.masterId)}
									imageUrl={getCoverUrl(item.masterId)}
									size="fill"
								/>
								<span class="absolute top-2 left-2 bg-vinyl-label text-vinyl-black text-xs font-bold px-2 py-1 rounded">
									#{i + 1}
								</span>
							</div>
							<div class="p-3">
								<div class="font-medium text-white text-sm truncate">{item.title}</div>
								<div class="text-xs text-gray-400 truncate">{item.artist}</div>
								<div class="text-xs text-vinyl-label mt-1">Max ${item.maxPrice}</div>
							</div>
						</div>
					</a>
				{/each}

				{#if $topTen.length < 10}
					<a
						href="{base}/watchlist"
						class="flex-shrink-0 w-36 snap-start"
					>
						<div class="bg-vinyl-groove rounded-lg overflow-hidden border-2 border-dashed border-gray-600 hover:border-vinyl-label transition-colors h-full flex flex-col items-center justify-center min-h-[200px]">
							<span class="text-3xl mb-2">+</span>
							<span class="text-sm text-gray-400">Add records</span>
						</div>
					</a>
				{/if}
			</div>
		{:else}
			<div class="card text-center py-8">
				<p class="text-gray-400 mb-4">No records in your Top 10 yet</p>
				<p class="text-sm text-gray-500">Browse the Blue Chip 100 below and add your grails</p>
			</div>
		{/if}
	</section>

	<!-- Label Series Quick Links -->
	<section>
		<h2 class="text-xl font-bold text-white mb-4">Browse by Label</h2>
		<div class="flex flex-wrap gap-2">
			{#each categories as category}
				<a
					href="{base}/labels/{category}"
					class="px-4 py-2 bg-vinyl-groove rounded-full text-sm hover:bg-gray-600 transition-colors border border-gray-600"
				>
					{getCategoryDisplayName(category)}
				</a>
			{/each}
		</div>
	</section>

	<!-- Blue Chip Top 100 -->
	<section>
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-xl font-bold text-white">Blue Chip Top 100</h2>
		</div>

		<div class="space-y-3">
			{#each blueChipRecords as record}
				<div class="card hover:ring-1 hover:ring-gray-600 transition-all">
					<div class="flex items-start gap-4">
						<div class="flex-shrink-0 w-8 text-center">
							<span class="text-vinyl-label font-bold">#{record.rank}</span>
						</div>

						<a href="{base}/masters/{record.masterId}" class="flex-1 min-w-0">
							<div class="flex items-start gap-4">
								<div class="flex-shrink-0">
									<AlbumArt
										title={record.title}
										artist={record.artist}
										category={record.category}
										imageUrl={getCoverUrl(record.masterId)}
										size="md"
									/>
								</div>
								<div class="flex-1 min-w-0">
									<h3 class="font-medium text-white">{record.title}</h3>
									<p class="text-sm text-gray-400">{record.artist} ({record.year})</p>
									<p class="text-xs text-gray-500 mt-1 line-clamp-2">{record.whyValuable}</p>
									<div class="flex items-center gap-3 mt-2">
										<span class="text-xs px-2 py-0.5 bg-vinyl-blue rounded text-white">
											{getCategoryDisplayName(record.category)}
										</span>
										<span class="text-xs text-vinyl-label">
											{formatPrice(record.priceRange)}
										</span>
									</div>
								</div>
							</div>
						</a>

						<div class="flex-shrink-0 flex items-center gap-1">
							<!-- Collection button -->
							{#if isInCollection(record.masterId)}
								<span class="p-2 text-green-400" title="In collection">
									<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
										<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
									</svg>
								</span>
							{:else}
								<button
									on:click|preventDefault|stopPropagation={() => openAddToCollection(record)}
									class="p-2 rounded-full hover:bg-gray-600 transition-colors text-gray-500 hover:text-green-400"
									title="I own this"
								>
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
									</svg>
								</button>
							{/if}

							<!-- Watchlist button -->
							<button
								on:click|preventDefault|stopPropagation={() => handleAddToWatchlist(record)}
								class="p-2 rounded-full hover:bg-gray-600 transition-colors"
								class:text-vinyl-label={isInWatchlist(record.masterId)}
								class:text-gray-500={!isInWatchlist(record.masterId)}
								title={isInWatchlist(record.masterId) ? 'In watchlist' : 'Add to watchlist'}
							>
								{#if isInWatchlist(record.masterId)}
									<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
									</svg>
								{:else}
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
									</svg>
								{/if}
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<!-- Add to Collection Modal -->
{#if showAddToCollection && selectedRecord}
	<div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
		<div class="bg-vinyl-groove rounded-lg max-w-md w-full p-6 space-y-4">
			<h3 class="text-xl font-bold text-white">Add to Collection</h3>
			<p class="text-gray-400">{selectedRecord.title} - {selectedRecord.artist}</p>

			<div class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="addLabel" class="block text-sm text-gray-400 mb-1">Label</label>
						<input
							id="addLabel"
							type="text"
							bind:value={addLabel}
							placeholder="e.g., Blue Note"
							class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
						/>
					</div>
					<div>
						<label for="addCatno" class="block text-sm text-gray-400 mb-1">Catalog #</label>
						<input
							id="addCatno"
							type="text"
							bind:value={addCatno}
							placeholder="e.g., BLP 4003"
							class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
						/>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="addCondition" class="block text-sm text-gray-400 mb-1">Condition</label>
						<select
							id="addCondition"
							bind:value={addCondition}
							class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
						>
							{#each conditions as cond}
								<option value={cond}>{cond}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="addPrice" class="block text-sm text-gray-400 mb-1">Price Paid ($)</label>
						<input
							id="addPrice"
							type="number"
							bind:value={addPurchasePrice}
							placeholder="0"
							class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
						/>
					</div>
				</div>

				<div>
					<label for="addNotes" class="block text-sm text-gray-400 mb-1">Notes</label>
					<input
						id="addNotes"
						type="text"
						bind:value={addNotes}
						placeholder="e.g., Deep groove, RVG, ear mark"
						class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
					/>
				</div>
			</div>

			<div class="flex justify-end gap-3 pt-4">
				<button
					on:click={closeAddToCollection}
					class="btn-secondary"
				>
					Cancel
				</button>
				<button
					on:click={handleAddToCollection}
					class="btn-primary"
				>
					Add to Collection
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
