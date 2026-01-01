<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { blueChipRecords, getCategoryDisplayName, getRecordsByCategory } from '$lib/data/blueChipRecords';
	import { addToWatchlist, watchlist } from '$lib/stores/watchlist';
	import type { BlueChipCategory, BlueChipRecord } from '$lib/domain/types';

	$: category = $page.params.slug as BlueChipCategory;
	$: categoryName = getCategoryDisplayName(category);
	$: records = getRecordsByCategory(category);

	const labelInfo: Record<BlueChipCategory, { description: string; tips: string[]; eras: { name: string; years: string; description: string }[] }> = {
		blue_note: {
			description: 'Blue Note Records, founded in 1939 by Alfred Lion and Francis Wolff, became the definitive hard bop label. Rudy Van Gelder engineered most sessions, and Reid Miles designed the iconic covers.',
			tips: [
				'Deep groove: A pronounced groove about 1/2" from label edge indicates Plastylite pressing',
				'RVG in dead wax: Van Gelder\'s stamp or initials confirm original mastering',
				'Plastylite "ear": Small raised bump on label edge from pressing plant',
				'Address check: "47 West 63rd" or "43 West 61st" = NYC originals',
				'"A Division of Liberty" or "A Division of United Artists" = later pressings'
			],
			eras: [
				{ name: 'Lexington Ave', years: '1939-1956', description: '767 Lexington Ave address. 10" and early 12" LPs. Extremely rare.' },
				{ name: '47 West 63rd NYC', years: '1956-1962', description: 'The classic era. Deep grooves, RVG, Reid Miles covers. Most desirable.' },
				{ name: '43 West 61st NYC', years: '1962-1966', description: 'Still original NYC pressings. Van Gelder stamp replaces RVG.' },
				{ name: 'Liberty', years: '1966-1970', description: 'Liberty Records distribution. "A Division of Liberty" on label.' },
				{ name: 'United Artists', years: '1970-1979', description: 'UA era. Generally less collectible.' }
			]
		},
		columbia: {
			description: 'Columbia Records, one of the oldest American labels, released landmark jazz albums from Miles Davis, Dave Brubeck, Charles Mingus, and Thelonious Monk.',
			tips: [
				'6-eye label: Six Columbia "walking eye" logos around perimeter (1955-1962)',
				'2-eye label: Two eyes at top only (1962-1970)',
				'Deep groove: Earlier pressings often have deep groove',
				'Matrix suffixes: -1A or -1B indicate earliest pressings',
				'360 Sound: Later stereo labels say "360 Sound" - still desirable'
			],
			eras: [
				{ name: '6-Eye Mono', years: '1955-1962', description: 'Most valuable. Look for deep groove and early matrices.' },
				{ name: '6-Eye Stereo', years: '1958-1962', description: 'Early stereo pressings. CS prefix catalog numbers.' },
				{ name: '2-Eye', years: '1962-1970', description: 'Still original pressings, good quality. Less valuable than 6-eye.' },
				{ name: 'Later', years: '1970+', description: 'Various label designs. Generally common.' }
			]
		},
		prestige: {
			description: 'Bob Weinstock founded Prestige in 1949, documenting bebop and hard bop. Miles Davis, John Coltrane, and Sonny Rollins recorded extensively for the label.',
			tips: [
				'NYC yellow label: Bright yellow with NYC address (1949-1958). Most valuable.',
				'NJ blue label: Blue with Bergenfield, NJ address (1958-1971)',
				'RVG stamp: Van Gelder mastered most Prestige sessions',
				'Trident logo: Later blue labels have trident design',
				'Fantasy reissues: Berkeley, CA address indicates Fantasy era (1972+)'
			],
			eras: [
				{ name: 'NYC Yellow', years: '1949-1958', description: 'Original New York pressings. Bright yellow label. Holy grails.' },
				{ name: 'NJ Blue (early)', years: '1958-1964', description: 'Bergenfield, NJ address. Blue/silver label. RVG stamp.' },
				{ name: 'NJ Blue (later)', years: '1964-1971', description: 'Trident logo version. Still collectable.' },
				{ name: 'Fantasy', years: '1972+', description: 'Berkeley, CA reissues. Common.' }
			]
		},
		impulse: {
			description: 'Impulse! Records, founded in 1960, became John Coltrane\'s home label. Known for gatefold sleeves, orange/black labels, and spiritual jazz.',
			tips: [
				'Orange/black label: Original design (1961-1969)',
				'Gatefold sleeve: All original Impulse releases had gatefolds',
				'Van Gelder: Most sessions mastered by RVG',
				'AS- prefix: Stereo catalog numbers',
				'ABC branding: "ABC Impulse" indicates later pressing (1969+)'
			],
			eras: [
				{ name: 'Original Orange/Black', years: '1961-1969', description: 'Gatefold, orange/black labels, Van Gelder mastering.' },
				{ name: 'ABC Impulse', years: '1969-1974', description: 'ABC Records distribution. Label design changes.' },
				{ name: 'Later', years: '1974+', description: 'Various reissue programs.' }
			]
		},
		riverside: {
			description: 'Riverside Records, founded by Orrin Keepnews, documented Thelonious Monk\'s comeback and Bill Evans\' legendary trios.',
			tips: [
				'Blue microphone label: Early mono pressings (1953-1958)',
				'Black label: Standard label design (1958-1964)',
				'Deep groove: Earlier pressings often have deep groove',
				'Bill Grauer Productions: Check for this credit',
				'Orpheum Productions: Later Fantasy-era reissues'
			],
			eras: [
				{ name: 'Blue Microphone', years: '1953-1958', description: 'White label with blue microphone. Earliest and rarest.' },
				{ name: 'Black Label', years: '1958-1964', description: 'Black label with silver print. Most common originals.' },
				{ name: 'Orpheum/Fantasy', years: '1964+', description: 'Label sold to Fantasy. Various reissues.' }
			]
		},
		contemporary: {
			description: 'Contemporary Records, founded by Lester Koenig in 1951, documented West Coast jazz. Art Pepper, Ornette Coleman, and Shelly Manne recorded landmark albums.',
			tips: [
				'Yellow/black label: Original design',
				'Maroon label: Some variations exist',
				'Deep groove: Check for pressed groove near label',
				'Roy DuNann engineering: Excellent sound quality',
				'S prefix: Stereo catalog numbers'
			],
			eras: [
				{ name: 'Original Mono', years: '1951-1958', description: 'Yellow/black label mono pressings. C prefix.' },
				{ name: 'Stereo Era', years: '1958-1970s', description: 'S prefix catalog numbers. Still desirable.' },
				{ name: 'OJC Reissues', years: '1980s+', description: 'Original Jazz Classics reissue series.' }
			]
		},
		atlantic: {
			description: 'Atlantic Records, primarily known for R&B, also released landmark jazz from John Coltrane, Charles Mingus, and Ornette Coleman.',
			tips: [
				'Red/black label: Original design with white "fan" logo',
				'Green/red label: Later 1960s design',
				'Deep groove: Early pressings often have it',
				'1841 Broadway address: NYC originals',
				'Monarch pressing: Check for "MO" in dead wax'
			],
			eras: [
				{ name: 'Red/Black Fan Logo', years: '1957-1961', description: 'White fan logo on red/black label. Most valuable.' },
				{ name: 'Red/Black Bullseye', years: '1961-1966', description: 'Modified logo design. Still original.' },
				{ name: 'Green/Red', years: '1966-1970s', description: 'Later label design. Less valuable.' }
			]
		},
		verve: {
			description: 'Verve Records, founded by Norman Granz, was home to Ella Fitzgerald, Oscar Peterson, and many Jazz at the Philharmonic recordings.',
			tips: [
				'Trumpeter logo: Silhouette of trumpeter on label',
				'Clef-era: Recordings from Clef/Norgran labels reissued on Verve',
				'Deep groove: Earlier pressings',
				'MGM era: "MGM Records" on label indicates later pressing',
				'Japanese pressings: High quality alternatives'
			],
			eras: [
				{ name: 'Clef/Norgran', years: '1946-1956', description: 'Pre-Verve labels. Very rare.' },
				{ name: 'Trumpeter Logo', years: '1956-1963', description: 'Classic Verve era. Trumpeter silhouette.' },
				{ name: 'MGM', years: '1963-1972', description: 'MGM distribution. "A Division of MGM" on label.' },
				{ name: 'Polydor', years: '1972+', description: 'Various owners and reissues.' }
			]
		}
	};

	$: info = labelInfo[category];

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
</script>

<svelte:head>
	<title>{categoryName} Records | VintageVinylTracker</title>
</svelte:head>

<div class="space-y-8">
	<!-- Back link -->
	<a href="{base}/labels" class="inline-flex items-center text-gray-400 hover:text-white">
		<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
		</svg>
		All Labels
	</a>

	<!-- Header -->
	<div class="card">
		<h1 class="text-2xl font-bold text-white">{categoryName} Records</h1>
		<p class="text-gray-400 mt-2">{info?.description}</p>
	</div>

	<!-- Label Eras -->
	{#if info?.eras}
		<section>
			<h2 class="text-xl font-bold text-white mb-4">Label Eras</h2>
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each info.eras as era}
					<div class="card">
						<h3 class="font-medium text-vinyl-label">{era.name}</h3>
						<p class="text-sm text-gray-500">{era.years}</p>
						<p class="text-sm text-gray-400 mt-2">{era.description}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Identification Tips -->
	{#if info?.tips}
		<section>
			<h2 class="text-xl font-bold text-white mb-4">Identification Tips</h2>
			<div class="card">
				<ul class="space-y-3">
					{#each info.tips as tip}
						<li class="flex items-start gap-3">
							<span class="text-vinyl-label mt-1">•</span>
							<span class="text-gray-300">{tip}</span>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	<!-- Records from this label -->
	<section>
		<h2 class="text-xl font-bold text-white mb-4">Blue Chip {categoryName} Records</h2>

		{#if records.length === 0}
			<div class="card text-center py-8 text-gray-400">
				No records found for this label in the Blue Chip 100.
			</div>
		{:else}
			<div class="space-y-3">
				{#each records as record}
					<div class="card hover:ring-1 hover:ring-gray-600 transition-all">
						<div class="flex items-start gap-4">
							<span class="text-vinyl-label font-bold w-8">#{record.rank}</span>

							<a href="{base}/masters/{record.masterId}" class="flex-1 min-w-0">
								<h3 class="font-medium text-white">{record.title}</h3>
								<p class="text-sm text-gray-400">{record.artist} ({record.year})</p>
								<p class="text-xs text-gray-500 mt-1">{record.whyValuable}</p>
							</a>

							<div class="text-right flex-shrink-0">
								<div class="text-vinyl-label">{formatPrice(record.priceRange)}</div>
								<div class="text-xs text-gray-500">{record.keyPressings.length} key pressings</div>
							</div>

							<button
								on:click|preventDefault={() => handleAddToWatchlist(record)}
								class="flex-shrink-0 p-2 rounded-full hover:bg-gray-600 transition-colors"
								class:text-vinyl-label={isInWatchlist(record.masterId)}
								class:text-gray-500={!isInWatchlist(record.masterId)}
								title={isInWatchlist(record.masterId) ? 'In watchlist' : 'Add to watchlist'}
							>
								{#if isInWatchlist(record.masterId)}
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
									</svg>
								{:else}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
									</svg>
								{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
