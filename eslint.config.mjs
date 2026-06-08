import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js },
        parser: 'babel-eslint',
        extends: ['js/recommended', 'prettier', 'prettier/react'],
        languageOptions: { globals: globals.browser },
        plugins: ['react', 'prettier', 'react-hooks'],
        rules: {
            'prettier/prettier': 'error',
            'react/jsx-filename-extension': 0,
            'import/prefer-default-export': 0,
            'react-hooks/rules-of-hooks': 'error', // Verifica as regras dos Hooks
            'react-hooks/exhaustive-deps': 'warn', // Verifica a dependência do efeito
            'import/no-anonymous-default-export': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
        },
    },
    pluginReact.configs.flat.recommended,
]);
