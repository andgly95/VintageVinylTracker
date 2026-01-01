<script lang="ts">
	import { base } from '$app/paths';
	import { getCategoryDisplayName } from '$lib/data/blueChipRecords';
	import type { BlueChipCategory } from '$lib/domain/types';

	const categories: { id: BlueChipCategory; description: string; era: string; look_for: string }[] = [
		{
			id: 'blue_note',
			description: 'The gold standard of jazz labels. Alfred Lion and Francis Wolff created an unparalleled catalog.',
			era: '1939-1979',
			look_for: 'RVG stamp, deep groove, Plastylite ear mark, NYC addresses'
		},
		{
			id: 'columbia',
			description: 'Major label with landmark releases from Miles Davis, Dave Brubeck, and Thelonious Monk.',
			era: '1889-present',
			look_for: '6-eye label (pre-1962), deep groove, -1A matrix suffixes'
		},
		{
			id: 'prestige',
			description: 'Bob Weinstock\'s label captured bebop and hard bop greats. Miles, Coltrane, Rollins.',
			era: '1949-1971',
			look_for: 'NYC yellow label, NJ blue label, RVG stamp'
		},
		{
			id: 'impulse',
			description: 'The house that Trane built. Spiritual jazz and avant-garde explorations.',
			era: '1961-1976',
			look_for: 'Orange/black gatefold, Van Gelder mastering'
		},
		{
			id: 'riverside',
			description: 'Orrin Keepnews documented Monk\'s comeback and Bill Evans\' legendary trio.',
			era: '1953-1964',
			look_for: 'Blue microphone label, black label, original deep groove'
		},
		{
			id: 'contemporary',
			description: 'West Coast jazz at its finest. Art Pepper, Ornette Coleman, Shelly Manne.',
			era: '1951-present',
			look_for: 'Yellow/black label, maroon label variations'
		},
		{
			id: 'atlantic',
			description: 'R&B powerhouse that also released landmark jazz: Coltrane, Mingus, Ornette.',
			era: '1947-present',
			look_for: 'Red/black label, white fan logo, green/red label'
		},
		{
			id: 'verve',
			description: 'Norman Granz\'s label for Ella, Oscar Peterson, and jazz at the Philharmonic.',
			era: '1956-present',
			look_for: 'Trumpeter logo, Clef-era pressings, deep groove'
		}
	];
</script>

<svelte:head>
	<title>Label Guide | VintageVinylTracker</title>
</svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-2xl font-bold text-white">Label Identification Guide</h1>
		<p class="text-gray-400 mt-2">Learn to identify original pressings from the great jazz labels</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		{#each categories as category}
			<a
				href="{base}/labels/{category.id}"
				class="card hover:ring-1 hover:ring-vinyl-label transition-all group"
			>
				<div class="flex items-start gap-4">
					<div class="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
						🎵
					</div>
					<div class="flex-1 min-w-0">
						<h2 class="text-lg font-bold text-white group-hover:text-vinyl-label transition-colors">
							{getCategoryDisplayName(category.id)}
						</h2>
						<p class="text-sm text-gray-500 mt-0.5">{category.era}</p>
						<p class="text-sm text-gray-400 mt-2 line-clamp-2">{category.description}</p>
						<div class="mt-3">
							<span class="text-xs text-vinyl-label">Look for: </span>
							<span class="text-xs text-gray-500">{category.look_for}</span>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
