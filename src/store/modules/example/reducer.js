import * as types from '../types';

const inicialState = {
    botaoClicado: false
};

// Função que vai escutar as ações que são disparada e executar uma função a partir de um tipo de função
export default function(state = inicialState, action) {

    switch(action.type) {
        case types.BOTAO_CLICADO_SUCCESS: {
            console.log('Sucesso :)');
            const newState = { ...state }
            newState.botaoClicado = !newState.botaoClicado;
            return newState;
        }

        case types.BOTAO_CLICADO_REQUEST: {
            console.log('Estou fazendo a requisição');
            return state;
        }

        case types.BOTAO_CLICADO_FAILURE:{
            console.log('Deu erro :(')
            return state;
        }

        default:
            return state;
    }

};
