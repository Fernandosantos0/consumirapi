import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
/*
    call - é uma função que vai chamar uma função qualquer, geralmente uma função assincrona
    put - é uma função do Saga que permite disparar uma actions do Redux
    all - permite inserir mais de uma ação para o saga escutar
    takeLatest - é a função que capturar a última ação executada
*/

// Função para login
function* loginRequest({ payload }) {
	try {
        // const { email, password } = payload;
        const response = yield call(axios.post, '/tokens', payload);

        // Action para sucesso
        yield put(actions.loginSuccess({ ...response.data }));

        // Definindo o cabeçalho padrão do axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        toast.success('Você fez login');

        // Redirecionando para página que o usuário que acessar
        history.push(payload.prevPath);
    } catch(e) {
        toast.error('Usuário ou senha inválidos.');
        yield put(actions.loginFailure());
    }
}

// função para adicionar o token no cabeçalho da requisição
function persistRehydrate(payload) {
    const token = get(payload, 'auth.token', '');

    if(!token) return;

    // Definindo o cabeçalho padrão do axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function registerRequest({ payload }) {
    let { id, nome, email, password } = payload;
    // password: password || undefined;
}

// Exportando o saga
export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest)
]);
