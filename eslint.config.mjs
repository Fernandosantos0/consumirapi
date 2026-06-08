import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js },
        parser: 'babel-eslint',
        extends: [
            'js/recommended',
            'prettier',
            'prettier/react'
        ],
        languageOptions: { globals: globals.browser },
        plugins: [
            'react',
            'prettier',
            'react-hooks'
        ],
        rules: {
            'prettier/prettier': 'error',
            'react/jsx-filename-extension': 0,
            'import/prefer-default-export': 0,
            'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
            'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencie
        }
    },
    pluginReact.configs.flat.recommended
]);
