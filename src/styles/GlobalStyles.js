import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: "Montserrat", Arial, Helvetica, sans-serif;
    }

    body {
        background-color: #eee;
    }

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }
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
