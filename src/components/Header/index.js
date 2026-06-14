import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

// React Icons
import { FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaPowerOff } from 'react-icons/fa';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

import { Nav } from './styled';

export default function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    // Função para deslogar
    const handleLogout = event => {
        event.preventDefault();

        // Disparando uma ação do Redux
        dispatch(actions.loginFailure());

        // Redirecionando para uma página
        history.push('/');
    };

    return (
        <Nav>
            <Link to="/">
                <FaHome size={24} />
            </Link>

            <Link to="/register">
                <FaUserAlt size={24} />
            </Link>

            {/* Verificando se o usuário esta logado */}
            { isLoggedIn ? (
                <Link onClick={handleLogout} to="/logout">
                    <FaPowerOff size={24} />
                </Link>
            ) : (
                <Link to="/login">
                    <FaSignInAlt size={24} />
                </Link>
            ) }

            { isLoggedIn && <FaCircle size={24} color='#66FF33' /> }
        </Nav>
    );
}
