import styled from 'styled-components';

export const Form = styled.form`
    margin-block-start: 20px;


    div {
        display: flex;
        flex-flow: column nowrap;
    }

    input {
        height: 40px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 0 10px;
    }
`;
