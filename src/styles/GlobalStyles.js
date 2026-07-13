import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

// Importando o CSS do react toastify
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: "Montserrat", Arial, Helvetica, sans-serif;
    }

    html, body, #root {
        height: 100%;
    }

    html {
        scroll-behavior: smooth;
        scrollbar-color: ${colors.primaryColor} ${colors.primaryDarkColor};
    }

    body {
        background-color: ${colors.primaryDarkColor};
        color: ${colors.primaryDarkColor};
    }

    button {
        cursor: pointer;
        width: 100%;
        background-color: ${colors.primaryColor};
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
        transition: all 300ms;

        &:hover {
            filter: brightness(85%);
        }
    }

    a {
        text-decoration: none;
        color: ${colors.primaryColor}
    }

    ul {
        list-style: none;
    }

    /* Mudando as cores do react-toastify
    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background: ${colors.successColor};
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        background: ${colors.errorColor};
    }
    */

`;

export const Container = styled.section`
    max-width: 500px;
    width: 100%;
    margin-block: 30px;
    margin-inline: auto;
    background-color: white;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
`;
