import * as types from '../types';

const inicialState = {
    botaoClicado: false
};

// Função que vai escutar as ações que são disparada e executar uma função a partir de um tipo de função
export default function(state = inicialState, action) {

    switch(action.type) {
        case types.BOTAO_CLICADO:
            const newState = { ...state }
            newState.botaoClicado = !newState.botaoClicado;
            return newState;

        default:
            return state;
    }

};
