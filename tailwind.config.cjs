const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				Scion: ['Scion', 'sans-serif']
			}
		}
	},

	plugins: [require('daisyui')]
};

module.exports = config;
