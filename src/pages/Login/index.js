import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';

// Importando as actions do Redux
import * as exampleActions from '../../store/modules/example/actions'

export default function Login() {
    // Função para disparar ação do Redux
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();

        // Disparando uma ação
        dispatch(exampleActions.clicaBotao());
    }

    return (
        <Container>
            <Title>
                Login
                <small>Oie</small>
            </Title>
            <Paragrafo>Lorem ipsum dolor sit amet.</Paragrafo>

            <button type="button" onClick={handleClick}>Enviar</button>
        </Container>
    );
}
