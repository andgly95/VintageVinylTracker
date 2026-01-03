<script lang="ts">
	import { base } from '$app/paths';
	import { collection, collectionCount, collectionValue } from '$lib/stores/collection';
	import type { CollectionItem, Condition } from '$lib/domain/types';

	let editingItem: CollectionItem | null = null;
	let editCondition: Condition = 'VG+';
	let editPurchasePrice: number | undefined;
	let editNotes = '';

	let sortBy: 'addedAt' | 'artist' | 'title' | 'purchasePrice' = 'addedAt';
	let sortOrder: 'asc' | 'desc' = 'desc';

	let showImportExport = false;
	let importJson = '';
	let importError = '';

	$: sortedCollection = [...$collection].sort((a, b) => {
		let comparison = 0;
		switch (sortBy) {
			case 'artist':
				comparison = a.artist.localeCompare(b.artist);
				break;
			case 'title':
				comparison = a.title.localeCompare(b.title);
				break;
			case 'purchasePrice':
				comparison = (a.purchasePrice || 0) - (b.purchasePrice || 0);
				break;
			case 'addedAt':
			default:
				comparison = a.addedAt - b.addedAt;
		}
		return sortOrder === 'asc' ? comparison : -comparison;
	});

	function startEdit(item: CollectionItem) {
		editingItem = item;
		editCondition = item.condition;
		editPurchasePrice = item.purchasePrice;
		editNotes = item.notes || '';
	}

	function saveEdit() {
		if (!editingItem) return;
		collection.updateItem(editingItem.id, {
			condition: editCondition,
			purchasePrice: editPurchasePrice,
			notes: editNotes
		});
		editingItem = null;
	}

	function cancelEdit() {
		editingItem = null;
	}

	function handleRemove(id: string) {
		if (confirm('Remove this record from your collection?')) {
			collection.remove(id);
		}
	}

	function handleExport() {
		const json = collection.export();
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `vinyl-collection-${new Date().toISOString().split('T')[0]}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function handleImport() {
		importError = '';
		if (collection.import(importJson)) {
			importJson = '';
			showImportExport = false;
		} else {
			importError = 'Invalid JSON format';
		}
	}

	function formatDate(timestamp: number): string {
		return new Date(timestamp).toLocaleDateString();
	}

	const conditions: Condition[] = ['M', 'NM', 'VG+', 'VG', 'G+', 'G', 'F', 'P'];
</script>

<svelte:head>
	<title>My Collection | VintageVinylTracker</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-bold text-white">My Collection</h1>
			<p class="text-gray-400 mt-1">
				{$collectionCount} records
				{#if $collectionValue > 0}
					· ${$collectionValue.toLocaleString()} invested
				{/if}
			</p>
		</div>

		<div class="flex gap-2">
			<button
				on:click={() => showImportExport = !showImportExport}
				class="btn-secondary text-sm"
			>
				Import/Export
			</button>
		</div>
	</div>

	{#if showImportExport}
		<div class="card space-y-4">
			<h3 class="font-medium text-white">Backup & Restore</h3>

			<div class="flex gap-2">
				<button on:click={handleExport} class="btn-primary text-sm">
					Export Collection (JSON)
				</button>
			</div>

			<div class="border-t border-gray-700 pt-4">
				<label class="block text-sm text-gray-400 mb-2">Import from JSON</label>
				<textarea
					bind:value={importJson}
					placeholder="Paste exported JSON here..."
					class="w-full h-32 bg-vinyl-black border border-gray-600 rounded px-3 py-2 text-sm"
				></textarea>
				{#if importError}
					<p class="text-red-400 text-sm mt-1">{importError}</p>
				{/if}
				<button
					on:click={handleImport}
					disabled={!importJson.trim()}
					class="btn-secondary text-sm mt-2"
				>
					Import
				</button>
			</div>
		</div>
	{/if}

	{#if $collection.length > 0}
		<!-- Sort controls -->
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-2">
				<label for="sortBy" class="text-sm text-gray-400">Sort by:</label>
				<select
					id="sortBy"
					bind:value={sortBy}
					class="bg-vinyl-groove border border-gray-600 rounded px-3 py-1 text-sm"
				>
					<option value="addedAt">Date Added</option>
					<option value="artist">Artist</option>
					<option value="title">Title</option>
					<option value="purchasePrice">Price Paid</option>
				</select>
			</div>

			<button
				on:click={() => sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'}
				class="text-sm text-gray-400 hover:text-white"
			>
				{sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
			</button>
		</div>

		<!-- Collection list -->
		<div class="space-y-3">
			{#each sortedCollection as item (item.id)}
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

							<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div>
									<label for="editCondition" class="block text-sm text-gray-400 mb-1">Condition</label>
									<select
										id="editCondition"
										bind:value={editCondition}
										class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
									>
										{#each conditions as cond}
											<option value={cond}>{cond}</option>
										{/each}
									</select>
								</div>
								<div>
									<label for="editPrice" class="block text-sm text-gray-400 mb-1">Price Paid ($)</label>
									<input
										id="editPrice"
										type="number"
										bind:value={editPurchasePrice}
										placeholder="0"
										class="w-full bg-vinyl-black border border-gray-600 rounded px-3 py-2"
									/>
								</div>
								<div>
									<label for="editNotes" class="block text-sm text-gray-400 mb-1">Notes</label>
									<input
										id="editNotes"
										type="text"
										bind:value={editNotes}
										placeholder="e.g., Deep groove, RVG"
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
								<div class="flex flex-wrap items-center gap-2 mt-1">
									{#if item.label}
										<span class="text-xs text-gray-500">{item.label}</span>
									{/if}
									{#if item.catno}
										<span class="text-xs text-gray-500">· {item.catno}</span>
									{/if}
									{#if item.notes}
										<span class="text-xs text-vinyl-label">· {item.notes}</span>
									{/if}
								</div>
							</a>

							<div class="text-right flex-shrink-0">
								<div class="inline-flex items-center gap-2">
									<span class="quality-badge-medium">{item.condition}</span>
									{#if item.purchasePrice}
										<span class="text-vinyl-label font-medium">${item.purchasePrice}</span>
									{/if}
								</div>
								<div class="text-xs text-gray-500 mt-1">
									Added {formatDate(item.addedAt)}
								</div>
							</div>

							<div class="flex items-center gap-1">
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
	{:else}
		<div class="card text-center py-12">
			<p class="text-gray-400 text-lg mb-4">Your collection is empty</p>
			<p class="text-gray-500 mb-6">Start adding records you own from the catalog</p>
			<a href="{base}/" class="btn-primary">
				Browse Records
			</a>
		</div>
	{/if}
</div>
