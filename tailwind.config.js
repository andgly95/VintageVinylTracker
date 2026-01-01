/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				vinyl: {
					black: '#1a1a1a',
					groove: '#2d2d2d',
					label: '#c4a35a',
					blue: '#1e3a5f',
					warm: '#f5e6d3'
				}
			}
		}
	},
	plugins: []
};
