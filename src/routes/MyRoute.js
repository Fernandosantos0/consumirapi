import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MyRoute({ component: Component, isClosed, ...rest }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    // Verificando se a rota e fechada e se o usuário está logado
    if (isClosed && !isLoggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {
                        prevPath: rest.location.pathname,
                    },
                }}
            />
        );
    }

    // Liberando a página
    return <Route {...rest} component={Component} />;
}

// Validando as props do componente
MyRoute.defaultProps = {
    isClosed: false,
};

MyRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
    isClosed: PropTypes.bool,
    rest: PropTypes.array
};
