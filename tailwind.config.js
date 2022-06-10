module.exports = {
	content: ["./public/**/*.{html,js}"],
	theme: {
		extend: {
			keyframes: {
				slide: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fade: {
					"0%": { opacity: "1" },
					"50%": { opacity: "0" },
					"100%": { opacity: "0" },
				},
			},
			animation: {
				sliding: "slide 250ms 125ms ease-in-out both",
				slidein: "fade 250ms ease-in-out forwards",
			},
			colors: {
				prim: {
					400: "#9274E4",
					500: "#7C3AED",
					600: "#783BE0",
					700: "#5B2AAE",
				},
			},
		},
	},
	plugins: [],
};
