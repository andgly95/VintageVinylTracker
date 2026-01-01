<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';

	let isMenuOpen = false;
</script>

<div class="min-h-screen bg-vinyl-black">
	<!-- Header -->
	<header class="sticky top-0 z-50 bg-vinyl-groove border-b border-gray-700">
		<div class="max-w-7xl mx-auto px-4 py-3">
			<div class="flex items-center justify-between">
				<a href="{base}/" class="flex items-center gap-2">
					<span class="text-2xl">🎵</span>
					<span class="font-bold text-lg text-vinyl-label">VintageVinylTracker</span>
				</a>

				<!-- Mobile menu button -->
				<button
					class="md:hidden p-2 text-gray-400 hover:text-white"
					on:click={() => isMenuOpen = !isMenuOpen}
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if isMenuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						{/if}
					</svg>
				</button>

				<!-- Desktop nav -->
				<nav class="hidden md:flex items-center gap-6">
					<a href="{base}/" class="text-gray-300 hover:text-white transition-colors">Dashboard</a>
					<a href="{base}/watchlist" class="text-gray-300 hover:text-white transition-colors">Watchlist</a>
					<a href="{base}/labels" class="text-gray-300 hover:text-white transition-colors">Labels</a>
				</nav>
			</div>

			<!-- Mobile nav -->
			{#if isMenuOpen}
				<nav class="md:hidden mt-4 pb-2 flex flex-col gap-3">
					<a href="{base}/" class="text-gray-300 hover:text-white transition-colors" on:click={() => isMenuOpen = false}>Dashboard</a>
					<a href="{base}/watchlist" class="text-gray-300 hover:text-white transition-colors" on:click={() => isMenuOpen = false}>Watchlist</a>
					<a href="{base}/labels" class="text-gray-300 hover:text-white transition-colors" on:click={() => isMenuOpen = false}>Labels</a>
				</nav>
			{/if}
		</div>
	</header>

	<!-- Main content -->
	<main class="max-w-7xl mx-auto px-4 py-6">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="border-t border-gray-800 mt-auto">
		<div class="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
			<p>Data from <a href="https://www.discogs.com" class="text-vinyl-label hover:underline" target="_blank" rel="noopener">Discogs</a></p>
			<p class="mt-1">Built for vinyl collectors who appreciate the good pressings</p>
		</div>
	</footer>
</div>
