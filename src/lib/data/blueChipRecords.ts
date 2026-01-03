import type { BlueChipRecord } from '../domain/types';

/**
 * Curated list of the most valuable and collectible jazz vinyl records.
 * Includes key pressing information for identifying original/desirable versions.
 *
 * Price ranges are estimates for VG+ to NM condition original pressings.
 * Actual prices vary by specific pressing, condition, and market conditions.
 */
export const blueChipRecords: BlueChipRecord[] = [
	// === BLUE NOTE RECORDS ===
	{
		masterId: 62462,
		rank: 1,
		category: 'blue_note',
		artist: 'Art Blakey & The Jazz Messengers',
		title: "Moanin'",
		year: 1958,
		whyValuable: 'Quintessential hard bop. Lee Morgan, Benny Golson, Bobby Timmons. Deep groove RVG originals are holy grails.',
		priceRange: { low: 400, high: 2000 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4003', year: 1958, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG, ear', estimatedValue: 1500, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 84003', year: 1959, variant: 'blue_note_ny_47', description: 'Stereo 47 W 63rd, deep groove', estimatedValue: 800, isFirstPressing: false }
		],
		thumb: 'https://coverartarchive.org/release-group/e809b0f3-5683-3248-b39a-e7ee8e86d2d9/front-250'
	},
	{
		masterId: 118117,
		rank: 2,
		category: 'blue_note',
		artist: 'Cannonball Adderley',
		title: "Somethin' Else",
		year: 1958,
		whyValuable: 'Miles Davis sideman appearance. Only Blue Note album with Miles. RVG deep groove pressings are iconic.',
		priceRange: { low: 350, high: 1800 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1595', year: 1958, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG, ear', estimatedValue: 1400, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 81595', year: 1959, variant: 'blue_note_ny_47', description: 'Stereo deep groove', estimatedValue: 700, isFirstPressing: false }
		]
	},
	{
		masterId: 192306,
		rank: 3,
		category: 'blue_note',
		artist: 'Lee Morgan',
		title: 'The Sidewinder',
		year: 1964,
		whyValuable: 'Crossover hit. NY USA label originals with ear mark are desirable. Funky hard bop classic.',
		priceRange: { low: 150, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4157', year: 1964, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 450, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 84157', year: 1964, variant: 'blue_note_ny_47', description: 'NY USA stereo, Van Gelder', estimatedValue: 350, isFirstPressing: true }
		],
		thumb: 'https://coverartarchive.org/release-group/24d2fedc-7976-3b88-bb91-b49a05f26e55/front-250'
	},
	{
		masterId: 47828,
		rank: 4,
		category: 'blue_note',
		artist: 'Herbie Hancock',
		title: 'Maiden Voyage',
		year: 1965,
		whyValuable: 'Landmark modal jazz. Title track is a jazz standard. NY labels with Van Gelder stamp.',
		priceRange: { low: 200, high: 800 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4195', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 600, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 84195', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA stereo, Van Gelder', estimatedValue: 500, isFirstPressing: true }
		],
		thumb: 'https://coverartarchive.org/release-group/c5e5e8ad-dc89-319e-8b2d-b3ff5e59fcea/front-250'
	},
	{
		masterId: 140424,
		rank: 5,
		category: 'blue_note',
		artist: 'Wayne Shorter',
		title: 'Speak No Evil',
		year: 1966,
		whyValuable: 'All-time great lineup: Hancock, Carter, Elvin Jones. Modal masterpiece. NY originals scarce.',
		priceRange: { low: 300, high: 1200 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4194', year: 1966, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 900, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 84194', year: 1966, variant: 'blue_note_ny_47', description: 'NY USA stereo, Van Gelder', estimatedValue: 700, isFirstPressing: true }
		],
		thumb: 'https://coverartarchive.org/release-group/eae0c18f-f2fd-3b97-8631-3f682a2f3957/front-250'
	},
	{
		masterId: 155008,
		rank: 6,
		category: 'blue_note',
		artist: 'Horace Silver',
		title: 'Song for My Father',
		year: 1965,
		whyValuable: 'Soul jazz landmark. Title track sampled extensively. NY USA originals valued.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4185', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 400, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 84185', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA stereo, Van Gelder', estimatedValue: 300, isFirstPressing: true }
		]
	},
	{
		masterId: 178718,
		rank: 7,
		category: 'blue_note',
		artist: 'Kenny Burrell',
		title: 'Midnight Blue',
		year: 1963,
		whyValuable: 'Late-night guitar jazz perfection. Stanley Turrentine on sax. NY mono is the grail.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4123', year: 1963, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder, ear', estimatedValue: 550, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 84123', year: 1963, variant: 'blue_note_ny_47', description: 'NY USA stereo, Van Gelder', estimatedValue: 400, isFirstPressing: true }
		],
		thumb: 'https://coverartarchive.org/release-group/88861537-d884-370c-800d-7b4a7aed782c/front-250'
	},
	{
		masterId: 72373,
		rank: 8,
		category: 'blue_note',
		artist: 'Freddie Hubbard',
		title: 'Hub-Tones',
		year: 1962,
		whyValuable: 'Hard bop excellence with Herbie Hancock and Philly Joe Jones. Deep groove NY pressings.',
		priceRange: { low: 250, high: 900 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4115', year: 1962, variant: 'blue_note_ny_47', description: 'NY USA mono, deep groove, RVG', estimatedValue: 700, isFirstPressing: true }
		]
	},
	{
		masterId: 64167,
		rank: 9,
		category: 'blue_note',
		artist: 'Eric Dolphy',
		title: 'Out to Lunch!',
		year: 1964,
		whyValuable: 'Avant-garde masterpiece. Revolutionary compositions. NY originals increasingly rare.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4163', year: 1964, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder, ear', estimatedValue: 800, isFirstPressing: true },
			{ label: 'Blue Note', catno: 'BST 84163', year: 1964, variant: 'blue_note_ny_47', description: 'NY USA stereo', estimatedValue: 600, isFirstPressing: true }
		],
		thumb: 'https://coverartarchive.org/release-group/bc6c2573-bc7d-346a-8880-0e34b8fb7e50/front-250'
	},
	{
		masterId: 62796,
		rank: 10,
		category: 'blue_note',
		artist: 'Hank Mobley',
		title: 'Soul Station',
		year: 1960,
		whyValuable: 'Perfect hard bop session. Wynton Kelly, Paul Chambers, Art Blakey. Deep groove essential.',
		priceRange: { low: 400, high: 1500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4031', year: 1960, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG, ear', estimatedValue: 1200, isFirstPressing: true }
		]
	},

	// === COLUMBIA RECORDS ===
	{
		masterId: 5460,
		rank: 11,
		category: 'columbia',
		artist: 'Miles Davis',
		title: 'Kind of Blue',
		year: 1959,
		whyValuable: 'Best-selling jazz album ever. Modal jazz landmark. 6-eye deep groove pressings are museum pieces.',
		priceRange: { low: 400, high: 3000 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1355', year: 1959, variant: 'columbia_6eye_mono', description: '6-eye mono, deep groove, 1A matrix', estimatedValue: 2500, isFirstPressing: true },
			{ label: 'Columbia', catno: 'CS 8163', year: 1959, variant: 'columbia_6eye_stereo', description: '6-eye stereo, 1A matrix', estimatedValue: 1500, isFirstPressing: true }
		]
	},
	{
		masterId: 5468,
		rank: 12,
		category: 'columbia',
		artist: 'Miles Davis',
		title: "'Round About Midnight",
		year: 1957,
		whyValuable: 'First great quintet. Coltrane debut on Columbia. 6-eye mono is exceptionally rare.',
		priceRange: { low: 350, high: 2000 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 949', year: 1957, variant: 'columbia_6eye_mono', description: '6-eye mono, deep groove', estimatedValue: 1800, isFirstPressing: true }
		]
	},
	{
		masterId: 17067,
		rank: 13,
		category: 'columbia',
		artist: 'Dave Brubeck Quartet',
		title: 'Time Out',
		year: 1959,
		whyValuable: 'Take Five became a hit. Odd time signatures. 6-eye pressings in high demand.',
		priceRange: { low: 200, high: 800 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1397', year: 1959, variant: 'columbia_6eye_mono', description: '6-eye mono', estimatedValue: 600, isFirstPressing: true },
			{ label: 'Columbia', catno: 'CS 8192', year: 1959, variant: 'columbia_6eye_stereo', description: '6-eye stereo', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 47968,
		rank: 14,
		category: 'columbia',
		artist: 'Charles Mingus',
		title: 'Mingus Ah Um',
		year: 1959,
		whyValuable: 'Goodbye Pork Pie Hat, Better Git It in Your Soul. 6-eye mono is the definitive pressing.',
		priceRange: { low: 300, high: 1200 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1370', year: 1959, variant: 'columbia_6eye_mono', description: '6-eye mono, deep groove', estimatedValue: 1000, isFirstPressing: true },
			{ label: 'Columbia', catno: 'CS 8171', year: 1959, variant: 'columbia_6eye_stereo', description: '6-eye stereo', estimatedValue: 700, isFirstPressing: true }
		]
	},
	{
		masterId: 5464,
		rank: 15,
		category: 'columbia',
		artist: 'Miles Davis',
		title: 'Sketches of Spain',
		year: 1960,
		whyValuable: 'Gil Evans orchestration. Concierto de Aranjuez. 6-eye pressings have superior dynamics.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1480', year: 1960, variant: 'columbia_6eye_mono', description: '6-eye mono', estimatedValue: 550, isFirstPressing: true },
			{ label: 'Columbia', catno: 'CS 8271', year: 1960, variant: 'columbia_6eye_stereo', description: '6-eye stereo', estimatedValue: 450, isFirstPressing: true }
		]
	},
	{
		masterId: 80627,
		rank: 16,
		category: 'columbia',
		artist: 'Thelonious Monk',
		title: "Monk's Dream",
		year: 1963,
		whyValuable: 'Commercial breakthrough. Best-selling Monk album. 2-eye pressings still desirable.',
		priceRange: { low: 100, high: 400 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1965', year: 1963, variant: 'columbia_2eye', description: '2-eye mono', estimatedValue: 300, isFirstPressing: true },
			{ label: 'Columbia', catno: 'CS 8765', year: 1963, variant: 'columbia_2eye', description: '2-eye stereo', estimatedValue: 250, isFirstPressing: true }
		]
	},

	// === IMPULSE RECORDS ===
	{
		masterId: 62474,
		rank: 17,
		category: 'impulse',
		artist: 'John Coltrane',
		title: 'A Love Supreme',
		year: 1965,
		whyValuable: 'Spiritual jazz pinnacle. Orange/black gatefold originals are grails. Van Gelder mastered.',
		priceRange: { low: 300, high: 1500 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-77', year: 1965, variant: 'impulse_orange_black', description: 'Orange/black gatefold, Van Gelder', estimatedValue: 1200, isFirstPressing: true },
			{ label: 'Impulse!', catno: 'AS-77', year: 1965, variant: 'impulse_orange_black', description: 'Orange/black stereo gatefold', estimatedValue: 800, isFirstPressing: true }
		]
	},
	{
		masterId: 41312,
		rank: 18,
		category: 'impulse',
		artist: 'John Coltrane',
		title: 'Coltrane (Impulse)',
		year: 1962,
		whyValuable: 'First Impulse album. Out of This World, Soul Eyes. Orange/black originals valued.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-21', year: 1962, variant: 'impulse_orange_black', description: 'Orange/black, Van Gelder', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 30959,
		rank: 19,
		category: 'impulse',
		artist: 'John Coltrane',
		title: 'Crescent',
		year: 1964,
		whyValuable: 'Late period masterwork. Wise One, Lonnie\'s Lament. Classic quartet at peak.',
		priceRange: { low: 250, high: 900 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-66', year: 1964, variant: 'impulse_orange_black', description: 'Orange/black gatefold, Van Gelder', estimatedValue: 700, isFirstPressing: true }
		]
	},
	{
		masterId: 56093,
		rank: 20,
		category: 'impulse',
		artist: 'Oliver Nelson',
		title: 'The Blues and the Abstract Truth',
		year: 1961,
		whyValuable: 'Stolen Moments. All-star date with Dolphy, Evans, Hubbard. Perfect session.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-5', year: 1961, variant: 'impulse_orange_black', description: 'Orange/black original', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 58341,
		rank: 21,
		category: 'impulse',
		artist: 'Pharoah Sanders',
		title: 'Karma',
		year: 1969,
		whyValuable: 'The Creator Has a Master Plan. Spiritual jazz epic. Gatefold originals sought after.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'AS-9181', year: 1969, variant: 'impulse_abc', description: 'Gatefold original', estimatedValue: 400, isFirstPressing: true }
		]
	},

	// === PRESTIGE RECORDS ===
	{
		masterId: 48100,
		rank: 22,
		category: 'prestige',
		artist: 'Miles Davis',
		title: 'Relaxin\' with the Miles Davis Quintet',
		year: 1958,
		whyValuable: 'One of the marathon session albums. Yellow label NY pressings are collectible.',
		priceRange: { low: 250, high: 900 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7129', year: 1958, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 700, isFirstPressing: true }
		]
	},
	{
		masterId: 48097,
		rank: 23,
		category: 'prestige',
		artist: 'Miles Davis',
		title: 'Cookin\' with the Miles Davis Quintet',
		year: 1957,
		whyValuable: 'Marathon session. My Funny Valentine version. Yellow NYC label RVG pressings.',
		priceRange: { low: 250, high: 900 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7094', year: 1957, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 750, isFirstPressing: true }
		]
	},
	{
		masterId: 48099,
		rank: 24,
		category: 'prestige',
		artist: 'Miles Davis',
		title: 'Workin\' with the Miles Davis Quintet',
		year: 1959,
		whyValuable: 'It Never Entered My Mind. Marathon session album. Yellow label originals valued.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7166', year: 1959, variant: 'prestige_nj', description: 'NJ blue/silver, RVG', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 33147,
		rank: 25,
		category: 'prestige',
		artist: 'John Coltrane',
		title: 'Coltrane (Prestige)',
		year: 1957,
		whyValuable: 'Baritone and Violets for Your Furs. Yellow label NYC pressing is scarce.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7105', year: 1957, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 800, isFirstPressing: true }
		]
	},
	{
		masterId: 53620,
		rank: 26,
		category: 'prestige',
		artist: 'Sonny Rollins',
		title: 'Saxophone Colossus',
		year: 1956,
		whyValuable: 'St. Thomas, Blue 7, Strode Rode. NYC yellow RVG is one of the great jazz pressings.',
		priceRange: { low: 400, high: 1500 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7079', year: 1956, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 1200, isFirstPressing: true }
		]
	},
	{
		masterId: 82044,
		rank: 27,
		category: 'prestige',
		artist: 'Red Garland',
		title: 'Groovy',
		year: 1957,
		whyValuable: 'C Jam Blues. Classic trio. NYC yellow label is prized.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7113', year: 1957, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 48091,
		rank: 28,
		category: 'prestige',
		artist: 'Miles Davis',
		title: 'Bags\' Groove',
		year: 1957,
		whyValuable: 'Christmas Eve sessions with Monk and Milt Jackson. Historical importance.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7109', year: 1957, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 550, isFirstPressing: true }
		]
	},

	// === RIVERSIDE RECORDS ===
	{
		masterId: 49989,
		rank: 29,
		category: 'riverside',
		artist: 'Bill Evans Trio',
		title: 'Waltz for Debby',
		year: 1962,
		whyValuable: 'Live at Village Vanguard. Recorded 11 days before Scott LaFaro death. Blue label is essential.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 9399', year: 1962, variant: 'riverside_black', description: 'Mono black label', estimatedValue: 800, isFirstPressing: true },
			{ label: 'Riverside', catno: 'RS 9399', year: 1962, variant: 'riverside_black', description: 'Stereo black label', estimatedValue: 600, isFirstPressing: true }
		]
	},
	{
		masterId: 49987,
		rank: 30,
		category: 'riverside',
		artist: 'Bill Evans Trio',
		title: 'Sunday at the Village Vanguard',
		year: 1961,
		whyValuable: 'Companion to Waltz for Debby. Same session. Blue/black labels are collectible.',
		priceRange: { low: 250, high: 800 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 376', year: 1961, variant: 'riverside_black', description: 'Mono black label', estimatedValue: 650, isFirstPressing: true }
		]
	},
	{
		masterId: 58665,
		rank: 31,
		category: 'riverside',
		artist: 'Thelonious Monk',
		title: 'Brilliant Corners',
		year: 1957,
		whyValuable: 'Title track took 25 takes. Blue label mono original is a grail.',
		priceRange: { low: 400, high: 1500 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 12-226', year: 1957, variant: 'riverside_blue', description: 'Blue microphone label', estimatedValue: 1200, isFirstPressing: true }
		]
	},
	{
		masterId: 58666,
		rank: 32,
		category: 'riverside',
		artist: 'Thelonious Monk',
		title: 'Monk\'s Music',
		year: 1957,
		whyValuable: 'With Coltrane and Hawkins. Blue label originals are valued.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 12-242', year: 1957, variant: 'riverside_blue', description: 'Blue microphone label', estimatedValue: 800, isFirstPressing: true }
		]
	},
	{
		masterId: 21159,
		rank: 33,
		category: 'riverside',
		artist: 'Wes Montgomery',
		title: 'The Incredible Jazz Guitar',
		year: 1960,
		whyValuable: 'Debut that made him famous. Four on Six, West Coast Blues. Black label mono is the one.',
		priceRange: { low: 250, high: 800 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 320', year: 1960, variant: 'riverside_black', description: 'Black label mono', estimatedValue: 650, isFirstPressing: true }
		]
	},

	// === CONTEMPORARY RECORDS ===
	{
		masterId: 24282,
		rank: 34,
		category: 'contemporary',
		artist: 'Art Pepper',
		title: 'Art Pepper Meets the Rhythm Section',
		year: 1957,
		whyValuable: 'Miles\' rhythm section. Recorded with no rehearsal. Yellow label mono is classic.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Contemporary', catno: 'C 3532', year: 1957, variant: 'contemporary', description: 'Yellow/black label mono', estimatedValue: 800, isFirstPressing: true }
		]
	},
	{
		masterId: 27100,
		rank: 35,
		category: 'contemporary',
		artist: 'Ornette Coleman',
		title: 'The Shape of Jazz to Come',
		year: 1959,
		whyValuable: 'Free jazz landmark. Lonely Woman. Contemporary originals are scarce.',
		priceRange: { low: 300, high: 1200 },
		keyPressings: [
			{ label: 'Contemporary', catno: 'M 3569', year: 1959, variant: 'contemporary', description: 'Mono original', estimatedValue: 900, isFirstPressing: true }
		]
	},
	{
		masterId: 24235,
		rank: 36,
		category: 'contemporary',
		artist: 'Sonny Rollins',
		title: 'Way Out West',
		year: 1957,
		whyValuable: 'I\'m an Old Cowhand in a cowboy hat. Drummerless trio. Yellow label is the pressing.',
		priceRange: { low: 350, high: 1200 },
		keyPressings: [
			{ label: 'Contemporary', catno: 'C 3530', year: 1957, variant: 'contemporary', description: 'Yellow/black label mono', estimatedValue: 1000, isFirstPressing: true }
		]
	},
	{
		masterId: 26756,
		rank: 37,
		category: 'contemporary',
		artist: 'Shelly Manne',
		title: 'My Fair Lady',
		year: 1956,
		whyValuable: 'Jazz meets Broadway. André Previn trio. Yellow label original.',
		priceRange: { low: 100, high: 350 },
		keyPressings: [
			{ label: 'Contemporary', catno: 'C 3527', year: 1956, variant: 'contemporary', description: 'Yellow/black label mono', estimatedValue: 280, isFirstPressing: true }
		]
	},

	// === ATLANTIC RECORDS ===
	{
		masterId: 74145,
		rank: 38,
		category: 'atlantic',
		artist: 'John Coltrane',
		title: 'Giant Steps',
		year: 1960,
		whyValuable: 'Title track changed jazz harmony. Red/black label mono is the definitive pressing.',
		priceRange: { low: 300, high: 1200 },
		keyPressings: [
			{ label: 'Atlantic', catno: '1311', year: 1960, variant: 'atlantic_red_black', description: 'Red/black mono, white fan logo', estimatedValue: 1000, isFirstPressing: true },
			{ label: 'Atlantic', catno: 'SD 1311', year: 1960, variant: 'atlantic_red_black', description: 'Red/black stereo', estimatedValue: 700, isFirstPressing: true }
		]
	},
	{
		masterId: 74144,
		rank: 39,
		category: 'atlantic',
		artist: 'John Coltrane',
		title: 'My Favorite Things',
		year: 1961,
		whyValuable: 'Soprano sax breakthrough. Title track is iconic. Red/black label is key.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Atlantic', catno: '1361', year: 1961, variant: 'atlantic_red_black', description: 'Red/black mono', estimatedValue: 400, isFirstPressing: true },
			{ label: 'Atlantic', catno: 'SD 1361', year: 1961, variant: 'atlantic_red_black', description: 'Red/black stereo', estimatedValue: 300, isFirstPressing: true }
		]
	},
	{
		masterId: 46091,
		rank: 40,
		category: 'atlantic',
		artist: 'Charles Mingus',
		title: 'The Black Saint and the Sinner Lady',
		year: 1963,
		whyValuable: 'Ballet/orchestral jazz masterpiece. Gatefold original is scarce.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-35', year: 1963, variant: 'impulse_orange_black', description: 'Orange/black gatefold', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 22632,
		rank: 41,
		category: 'atlantic',
		artist: 'Ornette Coleman',
		title: 'Free Jazz',
		year: 1961,
		whyValuable: 'Double quartet collective improvisation. Groundbreaking. Gatefold original.',
		priceRange: { low: 250, high: 800 },
		keyPressings: [
			{ label: 'Atlantic', catno: '1364', year: 1961, variant: 'atlantic_red_black', description: 'Red/black gatefold mono', estimatedValue: 650, isFirstPressing: true }
		]
	},

	// === VERVE RECORDS ===
	{
		masterId: 70500,
		rank: 42,
		category: 'verve',
		artist: 'Stan Getz & João Gilberto',
		title: 'Getz/Gilberto',
		year: 1964,
		whyValuable: 'The Girl from Ipanema. Grammy winner. Trumpeter logo originals.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Verve', catno: 'V-8545', year: 1964, variant: 'verve_mgm', description: 'Trumpeter logo mono', estimatedValue: 400, isFirstPressing: true },
			{ label: 'Verve', catno: 'V6-8545', year: 1964, variant: 'verve_mgm', description: 'Trumpeter logo stereo', estimatedValue: 350, isFirstPressing: true }
		]
	},
	{
		masterId: 69395,
		rank: 43,
		category: 'verve',
		artist: 'Ella Fitzgerald & Louis Armstrong',
		title: 'Ella and Louis',
		year: 1956,
		whyValuable: 'Dream pairing. Oscar Peterson accompanies. Clef/Verve originals valued.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Verve', catno: 'MGV-4003', year: 1956, variant: 'verve_clef', description: 'Trumpeter logo mono', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 86316,
		rank: 44,
		category: 'verve',
		artist: 'Oscar Peterson Trio',
		title: 'Night Train',
		year: 1963,
		whyValuable: 'C Jam Blues, Bags\' Groove. Popular crossover. Trumpeter logo pressings.',
		priceRange: { low: 100, high: 350 },
		keyPressings: [
			{ label: 'Verve', catno: 'V-8538', year: 1963, variant: 'verve_mgm', description: 'Trumpeter logo mono', estimatedValue: 280, isFirstPressing: true }
		]
	},
	{
		masterId: 84523,
		rank: 45,
		category: 'verve',
		artist: 'Billie Holiday',
		title: 'Lady in Satin',
		year: 1958,
		whyValuable: 'Devastating late-period album. Ray Ellis strings. Original is haunting.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1157', year: 1958, variant: 'columbia_6eye_mono', description: '6-eye mono', estimatedValue: 400, isFirstPressing: true }
		]
	},

	// === MORE BLUE NOTE CLASSICS ===
	{
		masterId: 85234,
		rank: 46,
		category: 'blue_note',
		artist: 'Horace Silver',
		title: 'Blowin\' the Blues Away',
		year: 1959,
		whyValuable: 'Sister Sadie, Peace. Peak Silver. Deep groove NY pressings.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4017', year: 1959, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG, ear', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 23657,
		rank: 47,
		category: 'blue_note',
		artist: 'Art Blakey & The Jazz Messengers',
		title: 'A Night at Birdland Vol. 1',
		year: 1954,
		whyValuable: 'Live hard bop before it had a name. Lexington Ave pressing is ultra-rare.',
		priceRange: { low: 500, high: 2500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1521', year: 1954, variant: 'blue_note_lexington', description: 'Lexington Ave, deep groove', estimatedValue: 2000, isFirstPressing: true }
		]
	},
	{
		masterId: 23658,
		rank: 48,
		category: 'blue_note',
		artist: 'Art Blakey & The Jazz Messengers',
		title: 'A Night at Birdland Vol. 2',
		year: 1954,
		whyValuable: 'Companion to Vol. 1. Same session. Lexington Ave pressing scarce.',
		priceRange: { low: 500, high: 2500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1522', year: 1954, variant: 'blue_note_lexington', description: 'Lexington Ave, deep groove', estimatedValue: 2000, isFirstPressing: true }
		]
	},
	{
		masterId: 71589,
		rank: 49,
		category: 'blue_note',
		artist: 'Lee Morgan',
		title: 'The Cooker',
		year: 1958,
		whyValuable: 'Pepper Adams, Bobby Timmons. Hard bop fire. Deep groove NY pressings.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1578', year: 1958, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG', estimatedValue: 800, isFirstPressing: true }
		]
	},
	{
		masterId: 67890,
		rank: 50,
		category: 'blue_note',
		artist: 'Dexter Gordon',
		title: 'Go',
		year: 1962,
		whyValuable: 'Cheese Cake, Second Balcony Jump. NY labels with ear mark are prized.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4112', year: 1962, variant: 'blue_note_ny_47', description: 'NY USA mono, deep groove, RVG', estimatedValue: 550, isFirstPressing: true }
		]
	},

	// === MORE DEEP CUTS (51-100) ===
	{
		masterId: 45678,
		rank: 51,
		category: 'blue_note',
		artist: 'Andrew Hill',
		title: 'Point of Departure',
		year: 1965,
		whyValuable: 'Avant-hard bop. Dolphy\'s final studio date. NY originals scarce.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4167', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 800, isFirstPressing: true }
		]
	},
	{
		masterId: 34567,
		rank: 52,
		category: 'blue_note',
		artist: 'Jackie McLean',
		title: 'Let Freedom Ring',
		year: 1962,
		whyValuable: 'Bridge to the avant-garde. NY mono with deep groove.',
		priceRange: { low: 250, high: 800 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4106', year: 1962, variant: 'blue_note_ny_47', description: 'NY USA mono, deep groove, RVG', estimatedValue: 650, isFirstPressing: true }
		]
	},
	{
		masterId: 23456,
		rank: 53,
		category: 'blue_note',
		artist: 'Grant Green',
		title: 'Idle Moments',
		year: 1965,
		whyValuable: 'Title track is 15 minutes of bliss. Joe Henderson, Bobby Hutcherson.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4154', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 12345,
		rank: 54,
		category: 'blue_note',
		artist: 'Bobby Hutcherson',
		title: 'Dialogue',
		year: 1965,
		whyValuable: 'Vibes master debut as leader. Freddie Hubbard, Sam Rivers.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4198', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA mono', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 56789,
		rank: 55,
		category: 'blue_note',
		artist: 'Donald Byrd',
		title: 'A New Perspective',
		year: 1963,
		whyValuable: 'Cristo Redentor. Gospel jazz. Choir on a Blue Note record.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4124', year: 1963, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 67891,
		rank: 56,
		category: 'blue_note',
		artist: 'Joe Henderson',
		title: 'Page One',
		year: 1963,
		whyValuable: 'Blue Bossa, Recorda Me. Debut as leader. Kenny Dorham.',
		priceRange: { low: 250, high: 800 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4140', year: 1963, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder, ear', estimatedValue: 650, isFirstPressing: true }
		]
	},
	{
		masterId: 78901,
		rank: 57,
		category: 'blue_note',
		artist: 'Sam Rivers',
		title: 'Fuchsia Swing Song',
		year: 1965,
		whyValuable: 'Avant-garde meets tradition. Jaki Byard, Ron Carter.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4184', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA mono', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 89012,
		rank: 58,
		category: 'blue_note',
		artist: 'Pete La Roca',
		title: 'Basra',
		year: 1965,
		whyValuable: 'Joe Henderson, Steve Kuhn. One of the great overlooked Blue Notes.',
		priceRange: { low: 250, high: 700 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4205', year: 1965, variant: 'blue_note_ny_47', description: 'NY USA mono', estimatedValue: 600, isFirstPressing: true }
		]
	},
	{
		masterId: 90123,
		rank: 59,
		category: 'prestige',
		artist: 'Gene Ammons',
		title: 'Boss Tenor',
		year: 1960,
		whyValuable: 'Soul jazz tenor. Close Your Eyes. NJ blue trident label.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7180', year: 1960, variant: 'prestige_nj', description: 'NJ blue trident, RVG', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 12346,
		rank: 60,
		category: 'prestige',
		artist: 'Sonny Stitt',
		title: 'Sits in with the Oscar Peterson Trio',
		year: 1959,
		whyValuable: 'I Can\'t Give You Anything But Love. Relaxed session.',
		priceRange: { low: 100, high: 350 },
		keyPressings: [
			{ label: 'Verve', catno: 'MGV-8334', year: 1959, variant: 'verve_clef', description: 'Trumpeter logo mono', estimatedValue: 280, isFirstPressing: true }
		]
	},
	{
		masterId: 23457,
		rank: 61,
		category: 'impulse',
		artist: 'Duke Ellington & John Coltrane',
		title: 'Duke Ellington & John Coltrane',
		year: 1963,
		whyValuable: 'Two giants meet. In a Sentimental Mood. Orange/black gatefold.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-30', year: 1963, variant: 'impulse_orange_black', description: 'Orange/black gatefold, Van Gelder', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 34568,
		rank: 62,
		category: 'impulse',
		artist: 'John Coltrane & Johnny Hartman',
		title: 'John Coltrane and Johnny Hartman',
		year: 1963,
		whyValuable: 'My One and Only Love. Definitive vocal jazz. Orange/black original.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-40', year: 1963, variant: 'impulse_orange_black', description: 'Orange/black gatefold', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 45679,
		rank: 63,
		category: 'impulse',
		artist: 'Alice Coltrane',
		title: 'Journey in Satchidananda',
		year: 1971,
		whyValuable: 'Spiritual jazz landmark. Pharoah Sanders. Gatefold original.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'AS-9203', year: 1971, variant: 'impulse_abc', description: 'Gatefold original', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 56780,
		rank: 64,
		category: 'columbia',
		artist: 'Thelonious Monk with John Coltrane',
		title: 'Thelonious Monk with John Coltrane',
		year: 1961,
		whyValuable: 'Historic 1957 sessions. Monk\'s Mood. Early pressing is key.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Jazzland', catno: 'JLP 46', year: 1961, variant: 'riverside_black', description: 'Black label mono', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 67892,
		rank: 65,
		category: 'blue_note',
		artist: 'Clifford Brown',
		title: 'Memorial Album',
		year: 1956,
		whyValuable: 'Posthumous release. Lexington Ave deep groove is museum piece.',
		priceRange: { low: 400, high: 1500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1526', year: 1956, variant: 'blue_note_lexington', description: 'Lexington Ave, deep groove', estimatedValue: 1200, isFirstPressing: true }
		]
	},
	{
		masterId: 78902,
		rank: 66,
		category: 'blue_note',
		artist: 'Lou Donaldson',
		title: 'Blues Walk',
		year: 1958,
		whyValuable: 'Soul jazz classic. Title track is a standard. Deep groove NY pressing.',
		priceRange: { low: 250, high: 800 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1593', year: 1958, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG', estimatedValue: 650, isFirstPressing: true }
		]
	},
	{
		masterId: 89013,
		rank: 67,
		category: 'blue_note',
		artist: 'Jimmy Smith',
		title: 'The Sermon!',
		year: 1959,
		whyValuable: '20+ minute title track. Organ jazz landmark. Deep groove RVG.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4011', year: 1959, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 90124,
		rank: 68,
		category: 'blue_note',
		artist: 'Sonny Clark',
		title: 'Cool Struttin\'',
		year: 1958,
		whyValuable: 'Iconic cover. Art Farmer, Jackie McLean. Deep groove NY is essential.',
		priceRange: { low: 400, high: 1500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1588', year: 1958, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG, ear', estimatedValue: 1200, isFirstPressing: true }
		]
	},
	{
		masterId: 12347,
		rank: 69,
		category: 'blue_note',
		artist: 'Kenny Dorham',
		title: 'Afro-Cuban',
		year: 1955,
		whyValuable: 'Latin jazz meets hard bop. Lexington Ave pressing is grail.',
		priceRange: { low: 500, high: 2000 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1535', year: 1955, variant: 'blue_note_lexington', description: 'Lexington Ave, deep groove', estimatedValue: 1500, isFirstPressing: true }
		]
	},
	{
		masterId: 23458,
		rank: 70,
		category: 'riverside',
		artist: 'Cannonball Adderley',
		title: 'Know What I Mean?',
		year: 1961,
		whyValuable: 'With Bill Evans. Waltz for Debby, Goodbye. Black label original.',
		priceRange: { low: 150, high: 450 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 433', year: 1961, variant: 'riverside_black', description: 'Black label mono', estimatedValue: 350, isFirstPressing: true }
		]
	},
	{
		masterId: 34569,
		rank: 71,
		category: 'riverside',
		artist: 'Bill Evans Trio',
		title: 'Explorations',
		year: 1961,
		whyValuable: 'Israel, Nardis. LaFaro trio. Black label mono is essential.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 351', year: 1961, variant: 'riverside_black', description: 'Black label mono', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 45680,
		rank: 72,
		category: 'riverside',
		artist: 'Bill Evans Trio',
		title: 'Portrait in Jazz',
		year: 1960,
		whyValuable: 'Autumn Leaves. First trio with LaFaro and Motian.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Riverside', catno: 'RLP 315', year: 1960, variant: 'riverside_black', description: 'Black label mono', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 56781,
		rank: 73,
		category: 'contemporary',
		artist: 'Art Pepper',
		title: '+Eleven',
		year: 1959,
		whyValuable: 'Big band arrangements by Marty Paich. Move, Groovin\' High.',
		priceRange: { low: 150, high: 450 },
		keyPressings: [
			{ label: 'Contemporary', catno: 'C 3568', year: 1959, variant: 'contemporary', description: 'Yellow/black label mono', estimatedValue: 350, isFirstPressing: true }
		]
	},
	{
		masterId: 67893,
		rank: 74,
		category: 'contemporary',
		artist: 'Chet Baker',
		title: 'Chet Baker Sings',
		year: 1954,
		whyValuable: 'My Funny Valentine, But Not for Me. Definitive vocal jazz.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Pacific Jazz', catno: 'PJ-1222', year: 1954, variant: 'other', description: 'Black/silver label mono', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 78903,
		rank: 75,
		category: 'atlantic',
		artist: 'Charles Mingus',
		title: 'Blues & Roots',
		year: 1960,
		whyValuable: 'Moanin\', Wednesday Night Prayer Meeting. Gospel-tinged jazz.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Atlantic', catno: '1305', year: 1960, variant: 'atlantic_red_black', description: 'Red/black mono', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 89014,
		rank: 76,
		category: 'prestige',
		artist: 'Miles Davis',
		title: 'Steamin\' with the Miles Davis Quintet',
		year: 1961,
		whyValuable: 'Surrey with the Fringe on Top. Marathon session album.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7200', year: 1961, variant: 'prestige_nj', description: 'NJ blue trident, RVG', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 90125,
		rank: 77,
		category: 'prestige',
		artist: 'John Coltrane',
		title: 'Soultrane',
		year: 1958,
		whyValuable: 'Good Bait, I Want to Talk About You. Yellow label original.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7142', year: 1958, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 12348,
		rank: 78,
		category: 'prestige',
		artist: 'Thelonious Monk',
		title: 'Monk\'s Moods',
		year: 1954,
		whyValuable: 'Early Monk. Round Midnight. 10" original is rare.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 166', year: 1954, variant: 'prestige_ny', description: '10" NYC yellow label', estimatedValue: 800, isFirstPressing: true }
		]
	},
	{
		masterId: 23459,
		rank: 79,
		category: 'verve',
		artist: 'Count Basie & His Orchestra',
		title: 'April in Paris',
		year: 1956,
		whyValuable: 'One More Time! Definitive big band swing. Clef pressing.',
		priceRange: { low: 100, high: 350 },
		keyPressings: [
			{ label: 'Verve', catno: 'MGV-8012', year: 1956, variant: 'verve_clef', description: 'Trumpeter logo mono', estimatedValue: 280, isFirstPressing: true }
		]
	},
	{
		masterId: 34570,
		rank: 80,
		category: 'verve',
		artist: 'Dizzy Gillespie',
		title: 'Dizzy Gillespie at Newport',
		year: 1957,
		whyValuable: 'Live bebop fire. Mary Lou Williams. Trumpeter logo pressing.',
		priceRange: { low: 100, high: 300 },
		keyPressings: [
			{ label: 'Verve', catno: 'MGV-8242', year: 1957, variant: 'verve_clef', description: 'Trumpeter logo mono', estimatedValue: 250, isFirstPressing: true }
		]
	},
	{
		masterId: 45681,
		rank: 81,
		category: 'blue_note',
		artist: 'Tina Brooks',
		title: 'True Blue',
		year: 1960,
		whyValuable: 'Underrated tenor. Freddie Hubbard. Deep groove mono is scarce.',
		priceRange: { low: 350, high: 1200 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4041', year: 1960, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG', estimatedValue: 1000, isFirstPressing: true }
		]
	},
	{
		masterId: 56782,
		rank: 82,
		category: 'blue_note',
		artist: 'Stanley Turrentine',
		title: 'Up at Minton\'s Vol. 1',
		year: 1961,
		whyValuable: 'Live hard bop. Grant Green, Horace Parlan. NY mono pressing.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4069', year: 1961, variant: 'blue_note_ny_47', description: 'NY USA mono, RVG, ear', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 67894,
		rank: 83,
		category: 'blue_note',
		artist: 'Larry Young',
		title: 'Unity',
		year: 1966,
		whyValuable: 'Avant-garde organ jazz. Woody Shaw, Joe Henderson, Elvin Jones.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4221', year: 1966, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 78904,
		rank: 84,
		category: 'blue_note',
		artist: 'Grachan Moncur III',
		title: 'Evolution',
		year: 1964,
		whyValuable: 'Avant-garde trombone. Lee Morgan, Jackie McLean. NY mono.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4153', year: 1964, variant: 'blue_note_ny_47', description: 'NY USA mono, Van Gelder', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 89015,
		rank: 85,
		category: 'impulse',
		artist: 'Archie Shepp',
		title: 'Fire Music',
		year: 1965,
		whyValuable: 'Malcolm, Semper Malcolm. Political avant-garde jazz.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Impulse!', catno: 'A-86', year: 1965, variant: 'impulse_orange_black', description: 'Orange/black gatefold', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 90126,
		rank: 86,
		category: 'impulse',
		artist: 'Albert Ayler',
		title: 'Spiritual Unity',
		year: 1965,
		whyValuable: 'Free jazz landmark. Ghosts. ESP-Disk original is key.',
		priceRange: { low: 250, high: 800 },
		keyPressings: [
			{ label: 'ESP-Disk', catno: '1002', year: 1965, variant: 'other', description: 'Original pressing', estimatedValue: 650, isFirstPressing: true }
		]
	},
	{
		masterId: 12349,
		rank: 87,
		category: 'columbia',
		artist: 'Miles Davis',
		title: 'Porgy and Bess',
		year: 1959,
		whyValuable: 'Gil Evans arrangements. Summertime. 6-eye mono/stereo.',
		priceRange: { low: 150, high: 500 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1274', year: 1959, variant: 'columbia_6eye_mono', description: '6-eye mono', estimatedValue: 400, isFirstPressing: true }
		]
	},
	{
		masterId: 23460,
		rank: 88,
		category: 'columbia',
		artist: 'Miles Davis',
		title: 'Miles Ahead',
		year: 1957,
		whyValuable: 'First Gil Evans big band collaboration. Flugelhorn era begins.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1041', year: 1957, variant: 'columbia_6eye_mono', description: '6-eye mono', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 34571,
		rank: 89,
		category: 'columbia',
		artist: 'Miles Davis',
		title: 'Milestones',
		year: 1958,
		whyValuable: 'Modal jazz beginnings. Cannonball and Coltrane together.',
		priceRange: { low: 200, high: 700 },
		keyPressings: [
			{ label: 'Columbia', catno: 'CL 1193', year: 1958, variant: 'columbia_6eye_mono', description: '6-eye mono', estimatedValue: 550, isFirstPressing: true }
		]
	},
	{
		masterId: 45682,
		rank: 90,
		category: 'blue_note',
		artist: 'John Coltrane',
		title: 'Blue Train',
		year: 1957,
		whyValuable: 'Only Blue Note as leader. Title track is a standard. Deep groove essential.',
		priceRange: { low: 500, high: 2500 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1577', year: 1957, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG, ear', estimatedValue: 2000, isFirstPressing: true }
		]
	},
	{
		masterId: 56783,
		rank: 91,
		category: 'prestige',
		artist: 'Art Farmer',
		title: 'Modern Art',
		year: 1958,
		whyValuable: 'Benny Golson arrangements. Mox Nix. Yellow label original.',
		priceRange: { low: 150, high: 450 },
		keyPressings: [
			{ label: 'United Artists', catno: 'UAL 4007', year: 1958, variant: 'other', description: 'Blue/silver label mono', estimatedValue: 350, isFirstPressing: true }
		]
	},
	{
		masterId: 67895,
		rank: 92,
		category: 'blue_note',
		artist: 'Art Taylor',
		title: 'A.T.\'s Delight',
		year: 1960,
		whyValuable: 'Drummer-led date. Stanley Turrentine. Deep groove NY pressing.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4047', year: 1960, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 78905,
		rank: 93,
		category: 'blue_note',
		artist: 'Ike Quebec',
		title: 'Heavy Soul',
		year: 1961,
		whyValuable: 'Comeback album. Blue and Sentimental. NY mono is key.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4093', year: 1961, variant: 'blue_note_ny_47', description: 'NY USA mono, RVG, ear', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 89016,
		rank: 94,
		category: 'blue_note',
		artist: 'Baby Face Willette',
		title: 'Face to Face',
		year: 1961,
		whyValuable: 'Organ soul jazz. Grant Green. NY mono with ear mark.',
		priceRange: { low: 200, high: 600 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4068', year: 1961, variant: 'blue_note_ny_47', description: 'NY USA mono, RVG, ear', estimatedValue: 500, isFirstPressing: true }
		]
	},
	{
		masterId: 90127,
		rank: 95,
		category: 'verve',
		artist: 'Ben Webster',
		title: 'Soulville',
		year: 1957,
		whyValuable: 'Late night ballads. Oscar Peterson rhythm section. Trumpeter logo.',
		priceRange: { low: 150, high: 450 },
		keyPressings: [
			{ label: 'Verve', catno: 'MGV-8274', year: 1957, variant: 'verve_clef', description: 'Trumpeter logo mono', estimatedValue: 350, isFirstPressing: true }
		]
	},
	{
		masterId: 12350,
		rank: 96,
		category: 'verve',
		artist: 'Coleman Hawkins',
		title: 'Coleman Hawkins Encounters Ben Webster',
		year: 1959,
		whyValuable: 'Two tenor titans. Blues for Yolande. Trumpeter logo pressing.',
		priceRange: { low: 150, high: 450 },
		keyPressings: [
			{ label: 'Verve', catno: 'MGV-8327', year: 1959, variant: 'verve_clef', description: 'Trumpeter logo mono', estimatedValue: 350, isFirstPressing: true }
		]
	},
	{
		masterId: 23461,
		rank: 97,
		category: 'atlantic',
		artist: 'Rahsaan Roland Kirk',
		title: 'We Free Kings',
		year: 1962,
		whyValuable: 'Multi-instrumentalist. Three For the Festival. Original pressing.',
		priceRange: { low: 100, high: 350 },
		keyPressings: [
			{ label: 'Mercury', catno: 'MG 20679', year: 1962, variant: 'other', description: 'Black label mono', estimatedValue: 280, isFirstPressing: true }
		]
	},
	{
		masterId: 34572,
		rank: 98,
		category: 'blue_note',
		artist: 'Freddie Redd',
		title: 'The Music from "The Connection"',
		year: 1960,
		whyValuable: 'Jazz play soundtrack. Jackie McLean. Deep groove NY mono.',
		priceRange: { low: 300, high: 900 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 4027', year: 1960, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG', estimatedValue: 750, isFirstPressing: true }
		]
	},
	{
		masterId: 45683,
		rank: 99,
		category: 'prestige',
		artist: 'Eddie "Lockjaw" Davis',
		title: 'Cookbook',
		year: 1958,
		whyValuable: 'Organ combo. Shirley Scott. Yellow label original.',
		priceRange: { low: 100, high: 350 },
		keyPressings: [
			{ label: 'Prestige', catno: 'PRLP 7141', year: 1958, variant: 'prestige_ny', description: 'NYC yellow label, RVG', estimatedValue: 280, isFirstPressing: true }
		]
	},
	{
		masterId: 56784,
		rank: 100,
		category: 'riverside',
		artist: 'Johnny Griffin',
		title: 'A Blowin\' Session',
		year: 1957,
		whyValuable: 'Tenor battle. Coltrane, Mobley, Griffin. Blue label original.',
		priceRange: { low: 300, high: 1000 },
		keyPressings: [
			{ label: 'Blue Note', catno: 'BLP 1559', year: 1957, variant: 'blue_note_ny_47', description: '47 W 63rd, deep groove, RVG', estimatedValue: 800, isFirstPressing: true }
		]
	}
];

// Helper functions for filtering
export function getRecordsByCategory(category: BlueChipCategory): BlueChipRecord[] {
	return blueChipRecords.filter(r => r.category === category);
}

export function getTopRecords(n: number): BlueChipRecord[] {
	return blueChipRecords.slice(0, n);
}

export function searchRecords(query: string): BlueChipRecord[] {
	const q = query.toLowerCase();
	return blueChipRecords.filter(r =>
		r.artist.toLowerCase().includes(q) ||
		r.title.toLowerCase().includes(q) ||
		r.whyValuable.toLowerCase().includes(q)
	);
}

export function getRecordsByPriceRange(maxPrice: number): BlueChipRecord[] {
	return blueChipRecords.filter(r => r.priceRange.low <= maxPrice);
}

export function getCategoryDisplayName(category: BlueChipCategory): string {
	const names: Record<BlueChipCategory, string> = {
		blue_note: 'Blue Note',
		columbia: 'Columbia',
		prestige: 'Prestige',
		impulse: 'Impulse!',
		riverside: 'Riverside',
		contemporary: 'Contemporary',
		atlantic: 'Atlantic',
		verve: 'Verve'
	};
	return names[category];
}

export function getRecordByMasterId(masterId: number): BlueChipRecord | undefined {
	return blueChipRecords.find(r => r.masterId === masterId);
}
