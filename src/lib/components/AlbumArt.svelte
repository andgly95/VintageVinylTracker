<script lang="ts">
	import type { BlueChipCategory } from '$lib/domain/types';

	export let title: string;
	export let artist: string;
	export let category: BlueChipCategory | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' | 'fill' = 'md';
	export let imageUrl: string | undefined = undefined;

	let imageError = false;

	// Generate a consistent color based on category or artist name
	const categoryColors: Record<BlueChipCategory, string> = {
		blue_note: 'from-blue-900 to-blue-700',
		columbia: 'from-red-900 to-red-700',
		prestige: 'from-yellow-900 to-yellow-700',
		impulse: 'from-orange-900 to-orange-700',
		riverside: 'from-cyan-900 to-cyan-700',
		contemporary: 'from-purple-900 to-purple-700',
		atlantic: 'from-green-900 to-green-700',
		verve: 'from-pink-900 to-pink-700'
	};

	// Fallback gradient based on first letter of artist
	function getArtistGradient(artist: string): string {
		const colors = [
			'from-slate-800 to-slate-600',
			'from-zinc-800 to-zinc-600',
			'from-neutral-800 to-neutral-600',
			'from-stone-800 to-stone-600',
			'from-gray-800 to-gray-600'
		];
		const index = artist.charCodeAt(0) % colors.length;
		return colors[index];
	}

	$: gradient = category ? categoryColors[category] : getArtistGradient(artist);
	$: initials = title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
	$: showImage = imageUrl && !imageError;

	const sizeClasses = {
		sm: 'w-12 h-12 text-lg',
		md: 'w-16 h-16 text-xl',
		lg: 'w-24 h-24 text-3xl',
		fill: 'w-full h-full aspect-square text-4xl'
	};

	function handleImageError() {
		imageError = true;
	}

	// Reset error state when URL changes
	$: if (imageUrl) {
		imageError = false;
	}
</script>

{#if showImage}
	<img
		src={imageUrl}
		alt="{title} - {artist}"
		class="rounded-lg object-cover {sizeClasses[size]}"
		on:error={handleImageError}
		loading="lazy"
	/>
{:else}
	<div
		class="rounded-lg bg-gradient-to-br {gradient} flex items-center justify-center font-bold text-white/80 {sizeClasses[size]}"
		title="{title} - {artist}"
	>
		{initials}
	</div>
{/if}
