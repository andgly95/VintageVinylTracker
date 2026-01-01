<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { blueChipRecords, getCategoryDisplayName } from '$lib/data/blueChipRecords';
	import { watchlist, addToWatchlist, topTen } from '$lib/stores/watchlist';
	import { getMarketplaceUrl } from '$lib/api/discogs';
	import { getLabelVariantDisplayName, getQualityGrade } from '$lib/domain/pressingEvaluator';
	import type { BlueChipRecord, KeyPressing } from '$lib/domain/types';

	$: masterId = parseInt($page.params.id);
	$: record = blueChipRecords.find(r => r.masterId === masterId);
	$: isInWatchlist = $watchlist.some(item => item.masterId === masterId);
	$: watchlistItem = $watchlist.find(item => item.masterId === masterId);
	$: isInTopTen = $topTen.some(item => item.masterId === masterId);

	let activeTab: 'pressings' | 'about' = 'pressings';
	let maxPriceFilter = 500;
	let showOnlyFirstPressings = false;

	$: filteredPressings = record?.keyPressings.filter(p => {
		if (p.estimatedValue > maxPriceFilter) return false;
		if (showOnlyFirstPressings && !p.isFirstPressing) return false;
		return true;
	}) || [];

	function handleAddToWatchlist() {
		if (!record) return;
		addToWatchlist(record.masterId, record.artist, record.title, {
			maxPrice: 500,
			targetCondition: 'VG+',
			thumb: record.thumb
		});
	}

	function handleRemoveFromWatchlist() {
		if (!watchlistItem) return;
		watchlist.remove(watchlistItem.id);
	}

	function handleToggleTopTen() {
		if (!watchlistItem) return;
		const newIsTopTen = !isInTopTen;
		watchlist.setTopTen(watchlistItem.id, newIsTopTen, newIsTopTen ? 10 : undefined);
	}

	function getPressingQualityClass(pressing: KeyPressing): string {
		if (pressing.isFirstPressing) return 'quality-badge-high';
		if (pressing.estimatedValue > 500) return 'quality-badge-medium';
		return 'quality-badge-low';
	}
</script>

<svelte:head>
	<title>{record ? `${record.title} - ${record.artist}` : 'Record'} | VintageVinylTracker</title>
</svelte:head>

{#if record}
	<div class="space-y-6">
		<!-- Back button -->
		<a href="{base}/" class="inline-flex items-center text-gray-400 hover:text-white">
			<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
			</svg>
			Back to Dashboard
		</a>

		<!-- Header -->
		<div class="card">
			<div class="flex flex-col md:flex-row gap-6">
				<!-- Album art placeholder -->
				<div class="w-full md:w-48 aspect-square bg-gray-700 rounded-lg flex items-center justify-center text-6xl flex-shrink-0">
					🎵
				</div>

				<div class="flex-1">
					<div class="flex items-start justify-between gap-4">
						<div>
							<h1 class="text-2xl md:text-3xl font-bold text-white">{record.title}</h1>
							<p class="text-lg text-gray-300 mt-1">{record.artist}</p>
							<p class="text-gray-500">{record.year}</p>
						</div>

						<span class="text-vinyl-label font-bold text-xl">#{record.rank}</span>
					</div>

					<div class="flex flex-wrap items-center gap-3 mt-4">
						<span class="px-3 py-1 bg-vinyl-blue rounded text-white text-sm">
							{getCategoryDisplayName(record.category)}
						</span>
						<span class="text-vinyl-label font-medium">
							${record.priceRange.low} - ${record.priceRange.high}
						</span>
					</div>

					<p class="text-gray-400 mt-4">{record.whyValuable}</p>

					<!-- Action buttons -->
					<div class="flex flex-wrap gap-3 mt-6">
						{#if isInWatchlist}
							<button
								on:click={handleRemoveFromWatchlist}
								class="btn-secondary flex items-center gap-2"
							>
								<svg class="w-5 h-5 text-vinyl-label" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
								</svg>
								In Watchlist
							</button>
							<button
								on:click={handleToggleTopTen}
								class="btn-secondary"
								class:bg-vinyl-label={isInTopTen}
								class:text-vinyl-black={isInTopTen}
							>
								{isInTopTen ? '★ In Top 10' : '☆ Add to Top 10'}
							</button>
						{:else}
							<button
								on:click={handleAddToWatchlist}
								class="btn-primary flex items-center gap-2"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
								</svg>
								Add to Watchlist
							</button>
						{/if}

						<a
							href="https://www.discogs.com/master/{record.masterId}"
							target="_blank"
							rel="noopener noreferrer"
							class="btn-secondary"
						>
							View on Discogs →
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Tabs -->
		<div class="border-b border-gray-700">
			<nav class="flex gap-8">
				<button
					on:click={() => activeTab = 'pressings'}
					class="pb-3 text-sm font-medium transition-colors relative"
					class:text-vinyl-label={activeTab === 'pressings'}
					class:text-gray-400={activeTab !== 'pressings'}
				>
					Key Pressings
					{#if activeTab === 'pressings'}
						<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-vinyl-label"></span>
					{/if}
				</button>
				<button
					on:click={() => activeTab = 'about'}
					class="pb-3 text-sm font-medium transition-colors relative"
					class:text-vinyl-label={activeTab === 'about'}
					class:text-gray-400={activeTab !== 'about'}
				>
					Identification Guide
					{#if activeTab === 'about'}
						<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-vinyl-label"></span>
					{/if}
				</button>
			</nav>
		</div>

		{#if activeTab === 'pressings'}
			<!-- Filters -->
			<div class="card">
				<div class="flex flex-wrap items-center gap-4">
					<div class="flex items-center gap-2">
						<label for="maxPrice" class="text-sm text-gray-400">Max Price:</label>
						<select
							id="maxPrice"
							bind:value={maxPriceFilter}
							class="bg-vinyl-black border border-gray-600 rounded px-3 py-1 text-sm"
						>
							<option value={200}>$200</option>
							<option value={300}>$300</option>
							<option value={500}>$500</option>
							<option value={1000}>$1000</option>
							<option value={5000}>All</option>
						</select>
					</div>

					<label class="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={showOnlyFirstPressings}
							class="rounded border-gray-600 bg-vinyl-black text-vinyl-label focus:ring-vinyl-label"
						/>
						<span class="text-sm text-gray-400">First pressings only</span>
					</label>
				</div>
			</div>

			<!-- Pressings list -->
			<div class="space-y-4">
				{#each filteredPressings as pressing}
					<div class="card hover:ring-1 hover:ring-gray-600 transition-all">
						<div class="flex flex-col md:flex-row md:items-center gap-4">
							<div class="flex-1">
								<div class="flex items-center gap-3">
									<h3 class="font-medium text-white">{pressing.catno}</h3>
									{#if pressing.isFirstPressing}
										<span class="quality-badge-high">1st Pressing</span>
									{/if}
								</div>
								<p class="text-sm text-gray-400 mt-1">
									{pressing.label} ({pressing.year}, {getLabelVariantDisplayName(pressing.variant)})
								</p>
								<p class="text-sm text-gray-500 mt-2">{pressing.description}</p>
							</div>

							<div class="flex items-center gap-4">
								<div class="text-right">
									<div class="text-vinyl-label font-bold">${pressing.estimatedValue}</div>
									<div class="text-xs text-gray-500">est. VG+</div>
								</div>

								<a
									href={getMarketplaceUrl(pressing.releaseId || 0, 'VG+')}
									target="_blank"
									rel="noopener noreferrer"
									class="btn-primary text-sm whitespace-nowrap"
								>
									Shop →
								</a>
							</div>
						</div>
					</div>
				{:else}
					<div class="card text-center py-8 text-gray-400">
						No pressings match your filters. Try adjusting the max price.
					</div>
				{/each}
			</div>
		{:else}
			<!-- Identification Guide -->
			<div class="card prose prose-invert max-w-none">
				<h3>How to Identify Original Pressings</h3>

				{#if record.category === 'blue_note'}
					<h4>Blue Note Records</h4>
					<ul>
						<li><strong>Deep Groove:</strong> Look for a deep groove pressed into the label area, about 1/2" from the edge. This indicates Plastylite pressing (pre-1966).</li>
						<li><strong>RVG Stamp:</strong> "RVG" or "VAN GELDER" stamp in the dead wax indicates Van Gelder mastering.</li>
						<li><strong>Ear Mark:</strong> Small raised "ear" on the label edge from Plastylite pressing.</li>
						<li><strong>Address:</strong> "47 West 63rd NYC" or "43 West 61st NYC" = original. "A Division of Liberty" = later pressing.</li>
					</ul>
				{:else if record.category === 'columbia'}
					<h4>Columbia Records</h4>
					<ul>
						<li><strong>6-Eye Label:</strong> Six "eye" logos around the perimeter (1955-1962). Most valuable Columbia pressings.</li>
						<li><strong>2-Eye Label:</strong> Two eyes at the top (1962-1970). Still desirable but less valuable.</li>
						<li><strong>Deep Groove:</strong> Earlier pressings often have a deep groove.</li>
						<li><strong>Matrix:</strong> Look for "-1A" or "-1B" suffixes indicating early cuts.</li>
					</ul>
				{:else if record.category === 'prestige'}
					<h4>Prestige Records</h4>
					<ul>
						<li><strong>NYC Yellow Label:</strong> Bright yellow label with NYC address (1949-1958). Most valuable.</li>
						<li><strong>NJ Blue Label:</strong> Blue label with Bergenfield, NJ address (1958-1971).</li>
						<li><strong>RVG:</strong> Van Gelder mastered most Prestige sessions. Look for RVG stamp.</li>
					</ul>
				{:else if record.category === 'impulse'}
					<h4>Impulse! Records</h4>
					<ul>
						<li><strong>Orange/Black Label:</strong> Original label design (1961-1969). Gatefold covers.</li>
						<li><strong>ABC Impulse:</strong> Later pressings with ABC branding (1969+).</li>
						<li><strong>Van Gelder:</strong> Most Impulse sessions were RVG mastered.</li>
					</ul>
				{:else}
					<h4>General Tips</h4>
					<ul>
						<li>Check the label design and address for era indicators.</li>
						<li>Look for deep grooves on earlier pressings.</li>
						<li>Matrix/runout info can indicate pressing sequence.</li>
						<li>Original inner sleeves add value.</li>
					</ul>
				{/if}

				<h4>Condition Grading</h4>
				<ul>
					<li><strong>M (Mint):</strong> Perfect, unplayed. Rare for vintage records.</li>
					<li><strong>NM (Near Mint):</strong> Nearly perfect, minimal signs of handling.</li>
					<li><strong>VG+ (Very Good Plus):</strong> Shows some wear but plays well. Sweet spot for value.</li>
					<li><strong>VG (Very Good):</strong> Noticeable wear, surface noise. Budget option.</li>
				</ul>
			</div>
		{/if}
	</div>
{:else}
	<div class="text-center py-12">
		<p class="text-gray-400 text-lg">Record not found in the Blue Chip 100</p>
		<a href="{base}/" class="text-vinyl-label hover:underline mt-4 inline-block">
			← Back to Dashboard
		</a>
	</div>
{/if}

<style>
	.prose {
		color: #d1d5db;
	}
	.prose h3 {
		color: white;
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}
	.prose h4 {
		color: #c4a35a;
		font-size: 1rem;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}
	.prose ul {
		list-style-type: disc;
		padding-left: 1.5rem;
	}
	.prose li {
		margin-bottom: 0.5rem;
	}
	.prose strong {
		color: white;
	}
</style>
