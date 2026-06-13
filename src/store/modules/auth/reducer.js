import * as types from '../types';

const inicialState = {
	isLoggedIn: false,
	token: '',
	user: {},
	isLoading: false
};

// Função que vai escutar as ações que são disparada e executar uma função a partir de um tipo de função
export default function (state = inicialState, action) {
    switch (action.type) {
		case types.LOGIN_SUCCESS: {
            // Copiando o state (estado)
			const newState = { ...state };

            // Alterando o state (estado)
            newState.isLoggedIn = true;
            newState.token = action.payload.token;
            newState.user = action.payload.user;
            newState.isLoading = false;

            // Retornando o state (estado)
			return newState;
        }

		case types.LOGIN_FAILURE: {
			const newState = { ...inicialState };
			return newState;
		}

        case types.LOGIN_REQUEST: {
			const newState = { ...state };
            newState.isLoading = true;
			return newState;
		}

		default:
			return state;
	}
}
