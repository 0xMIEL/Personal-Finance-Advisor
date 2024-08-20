import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'

export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}'], // Target JavaScript and TypeScript files
		languageOptions: {
			globals: globals.browser, // Define global variables for the browser environment
		},
		extends: [
			// Extend recommended JavaScript rules
			pluginJs.configs.recommended,
			// Extend recommended TypeScript rules
			...tseslint.configs.recommended,
		],
		rules: {
			// Override TypeScript rule to ignore unused variables in catch clauses
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: true,
					caughtErrors: 'none', // Ignore unused variables in catch clauses
				},
			],
		},
	},
]
