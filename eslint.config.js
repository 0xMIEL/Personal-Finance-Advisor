import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}'], // Target JavaScript and TypeScript files
		languageOptions: {
			parser: tsParser, // Use TypeScript parser
			globals: {
				...globals.node, // Define global variables for Node.js environment
				...globals.browser, // Include browser globals if needed
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			...pluginJs.configs.recommended.rules, // Include recommended JS rules directly
			...tseslint.configs.recommended.rules, // Include recommended TS rules directly
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: true,
					caughtErrors: 'none', // Ignore unused variables in catch clauses
					argsIgnorePattern: 'next'
				},
			],
		},
	},
]
