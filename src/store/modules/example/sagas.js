import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
/*
    call - é uma função que vai chamar uma função qualquer, geralmente uma função assincrona
    put - é uma função do Saga que permite disparar uma actions do Redux
    all - permite inserir mais de uma ação para o saga escutar
    takeLatest - é a função que capturar a última ação executada
*/

const requisicao = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });

function* exampleRequest() {
    try {
        /* Disparando uma função */
        // yield call(requisicao, 'parâmetro 1', 'parâmetro 2', 'parâmetro 3');
        yield call(requisicao);

        /* Disparando uma actions */
        yield put(actions.clicaBotaoSuccess());
    } catch (e) {
        toast.error('Deu erro.');
        yield put(actions.clicaBotaoFailure());
    }
}

// Exportando o saga
export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
