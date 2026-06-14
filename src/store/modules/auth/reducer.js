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

        case types.REGISTER_UPDATED_SUCCESS: {
			const newState = { ...state };

            newState.user.node = action.payload.nome;
            newState.user.email = action.payload.email;
            newState.isLoading = false;

			return newState;
		}

        case types.REGISTER_CREATED_SUCCESS: {
			const newState = { ...state };
            newState.isLoading = false;
			return newState;
		}


        case types.REGISTER_FAILURE: {
			const newState = { ...state };
            newState.isLoading = false;
			return newState;
		}

        case types.REGISTER_REQUEST: {
			const newState = { ...state };
            newState.isLoading = true;
			return newState;
		}

		default:
			return state;
	}
}
