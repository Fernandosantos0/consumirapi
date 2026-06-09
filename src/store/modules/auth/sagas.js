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

function* loginRequest({ payload }) {
	console.log('Saga', payload);
}

// Exportando o saga
export default all([takeLatest(types.LOGIN_REQUEST, loginRequest)]);
