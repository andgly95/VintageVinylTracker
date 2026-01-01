<script lang="ts">
	import { base } from '$app/paths';
	import { watchlist, topTen } from '$lib/stores/watchlist';
	import type { WatchlistItem } from '$lib/domain/types';

	let editingItem: WatchlistItem | null = null;
	let editMaxPrice = 500;
	let editNotes = '';

	function startEdit(item: WatchlistItem) {
		editingItem = item;
		editMaxPrice = item.maxPrice;
		editNotes = item.notes || '';
	}

	function saveEdit() {
		if (!editingItem) return;
		watchlist.updateItem(editingItem.id, {
			maxPrice: editMaxPrice,
			notes: editNotes
		});
		editingItem = null;
	}

	function cancelEdit() {
		editingItem = null;
	}

	function handleRemove(id: string) {
		watchlist.remove(id);
	}

	function handleToggleTopTen(item: WatchlistItem) {
		const newIsTopTen = !item.isTopTen;
		watchlist.setTopTen(item.id, newIsTopTen, newIsTopTen ? 10 : undefined);
	}

	function moveUp(item: WatchlistItem) {
		if (!item.rank || item.rank <= 1) return;
		watchlist.setTopTen(item.id, true, item.rank - 1);
	}

	function moveDown(item: WatchlistItem) {
		if (!item.rank || item.rank >= 10) return;
		watchlist.setTopTen(item.id, true, item.rank + 1);
	}
</script>

<svelte:head>
	<title>Watchlist | VintageVinylTracker</title>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-white">Your Watchlist</h1>
		<span class="text-gray-400">{$watchlist.length} records</span>
	</div>

	<!-- Top 10 Section -->
	{#if $topTen.length > 0}
		<section>
			<h2 class="text-xl font-bold text-white mb-4">Your Top 10</h2>
			<div class="space-y-3">
				{#each $topTen as item, i (item.id)}
					<div class="card flex items-center gap-4">
						<div class="flex flex-col gap-1">
							<button
								on:click={() => moveUp(item)}
								class="text-gray-500 hover:text-white disabled:opacity-30"
								disabled={i === 0}
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
								</svg>
							</button>
							<button
								on:click={() => moveDown(item)}
								class="text-gray-500 hover:text-white disabled:opacity-30"
								disabled={i === $topTen.length - 1}
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
								</svg>
							</button>
						</div>

						<span class="w-8 text-center font-bold text-vinyl-label">#{i + 1}</span>

						<a href="{base}/masters/{item.masterId}" class="flex-1 min-w-0">
							<div class="font-medium text-white truncate">{item.title}</div>
							<div class="text-sm text-gray-400 truncate">{item.artist}</div>
						</a>

						<div class="text-right">
							<div class="text-vinyl-label">Max ${item.maxPrice}</div>
							<div class="text-xs text-gray-500">{item.targetCondition}+</div>
						</div>

						<button
							on:click={() => handleToggleTopTen(item)}
							class="text-vinyl-label hover:text-red-400 transition-colors"
							title="Remove from Top 10"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
							</svg>
						</button>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- All Watchlist Items -->
	<section>
		<h2 class="text-xl font-bold text-white mb-4">
			{$topTen.length > 0 ? 'Other Watchlist Items' : 'All Items'}
		</h2>

		{#if $watchlist.length === 0}
			<div class="card text-center py-12">
				<p class="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
				<p class="text-gray-500 mb-6">Browse the Blue Chip 100 and add records you're hunting for</p>
				<a href="{base}/" class="btn-primary">
					Browse Records
				</a>
			</div>
		{:else}
			<div class="space-y-3">
				{#each $watchlist.filter(item => !item.isTopTen) as item (item.id)}
					<div class="card">
						{#if editingItem?.id === item.id}
							<!-- Edit mode -->
							<div class="space-y-4">
								<div class="flex items-center gap-4">
									<div class="flex-1">
										<div class="font-medium text-white">{item.title}</div>
										<div class="text-sm text-gray-400">{item.artist}</div>
									</div>
								</div>

								<div class="grid grid-cols-2 gap-4">
									<div>
										<label class="block text-sm text-gray-400 mb-1">Max Price</label>
										<input
											type="number"
											bind:value={editMaxPrice}
											class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
										/>
									</div>
									<div>
										<label class="block text-sm text-gray-400 mb-1">Notes</label>
										<input
											type="text"
											bind:value={editNotes}
											placeholder="e.g., Looking for deep groove"
											class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
										/>
									</div>
								</div>

								<div class="flex gap-2">
									<button on:click={saveEdit} class="btn-primary text-sm">Save</button>
									<button on:click={cancelEdit} class="btn-secondary text-sm">Cancel</button>
								</div>
							</div>
						{:else}
							<!-- View mode -->
							<div class="flex items-center gap-4">
								<a href="{base}/masters/{item.masterId}" class="flex-1 min-w-0">
									<div class="font-medium text-white truncate">{item.title}</div>
									<div class="text-sm text-gray-400 truncate">{item.artist}</div>
									{#if item.notes}
										<div class="text-xs text-gray-500 mt-1 truncate">{item.notes}</div>
									{/if}
								</a>

								<div class="text-right">
									<div class="text-vinyl-label">Max ${item.maxPrice}</div>
									<div class="text-xs text-gray-500">{item.targetCondition}+</div>
								</div>

								<div class="flex items-center gap-2">
									<button
										on:click={() => handleToggleTopTen(item)}
										class="p-2 text-gray-500 hover:text-vinyl-label transition-colors"
										title="Add to Top 10"
									>
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
										</svg>
									</button>
									<button
										on:click={() => startEdit(item)}
										class="p-2 text-gray-500 hover:text-white transition-colors"
										title="Edit"
									>
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
										</svg>
									</button>
									<button
										on:click={() => handleRemove(item.id)}
										class="p-2 text-gray-500 hover:text-red-400 transition-colors"
										title="Remove"
									>
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
										</svg>
									</button>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
