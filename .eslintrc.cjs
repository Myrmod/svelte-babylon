module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2021,
		ecmaFeatures: {
			jsx: false,
			experimentalObjectRestSpread: true,
		},
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	settings: {
		'svelte3/ignore-styles': ({ lang }) => {
			if (lang === 'stylus') return true

			return false
		},
	},
}
