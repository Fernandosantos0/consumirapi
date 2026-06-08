import { createStore } from 'redux';

const inicialState = {
    botaoClicado: false
};

// Função que vai escutar as ações que são disparada e executar uma função a partir de um tipo de função
const reducer = (state = inicialState, action) => {

    switch(action.type) {
        case 'BOTAO_CLICADO':
            const newState = { ...state }
            newState.botaoClicado = !newState.botaoClicado;
            return newState;

        default:
            return state;
    }

};

const store = createStore(reducer);

export default store;
