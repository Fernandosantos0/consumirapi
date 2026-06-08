import React from 'react';

import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function () {
    return (
        <Container>
            <Title>
                Login
                <small>Oie</small>
            </Title>
            <Paragrafo>Lorem ipsum dolor sit amet.</Paragrafo>
            <a href="">Oie</a>
        </Container>
    );
}
