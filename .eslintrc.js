module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'no-underscore-dangle': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		camelcase: 'off',
	},
};
