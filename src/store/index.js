import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

// Função para executar um reducer e inserir numa váriável que será exportada
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Executando o saga
sagaMiddleware.run(rootSaga);

export default store;
