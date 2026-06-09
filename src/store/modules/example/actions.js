import * as types from '../types';

// Função para chamar uma ação
export function clicaBotao() {
    return {
        type: types.BOTAO_CLICADO
    };
}
