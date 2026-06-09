import * as types from '../types';

const inicialState = {
    isLoggedIn: false,
    token: '',
    user: {},
    isLoading: false
};

// Função que vai escutar as ações que são disparada e executar uma função a partir de um tipo de função
export default function(state = inicialState, action) {

    switch(action.type) {
        case types.LOGIN_REQUEST: {
            console.log('REDUCER', action.payload)
            return state;
        }

        default:
            return state;
    }

};
