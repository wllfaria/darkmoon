module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
		jest: true
	},
	extends: [
		'plugin:react/recommended',
		'standard',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'prettier/standard',
		'prettier/react',
		'plugin:react-hooks/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'space-before-function-paren': 'off',
		'react/prop-types': 'off',
		'no-tabs': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-new': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '_'
			}
		],
		'@typescript-eslint/no-empty-interface': 'off',
		'no-useless-constructor': 'off',
		'import/prefer-default-export': 'off'
	},
	settings: {
		'import/resolver': {
			typescript: {}
		},
		react: {
			version: 'detect'
		}
	}
}
