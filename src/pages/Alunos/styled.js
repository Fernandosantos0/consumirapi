import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
    margin-block-start: 20px;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
    }

    div + div {
        border-top: 1px solid #EEE;
    }
`;

export const ProfilePicture = styled.div`
    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
`;

export const NovoAluno = styled(Link)`
    display: block;
    padding: 20px 0 10px 0;
`;
