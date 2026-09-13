/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"./assets/css/**/*.{html, jsx, js}",
		"./*.js",
		"./index.html",
	],
	theme: {
		extend: {
			colors: {
				primary: "#005754"
			}
		},
	},
	plugins: [],
}

