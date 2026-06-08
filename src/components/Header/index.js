import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// React Icons
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';

import { Nav } from './styled';

export default function Header() {
    const { botaoClicado } = useSelector(state => state);

    return (
        <Nav>
            <Link to="/">
                <FaHome size={24} />
            </Link>

            <Link to="/login">
                <FaUserAlt size={24} />
            </Link>

            <Link to="/qualquer">
                <FaSignInAlt size={24} />
            </Link>

            { botaoClicado ? 'Botão Clicado' : 'Botão Não Clicado' }
        </Nav>
    );
}
