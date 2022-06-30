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
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#000000',

					secondary: '#6D3A9C',

					accent: '#51A800',

					neutral: '#000000',

					'base-100': '#000000',

					info: '#2463EB',

					success: '#16A249',

					warning: '#DB7706',

					error: '#DC2828'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};

module.exports = config;
