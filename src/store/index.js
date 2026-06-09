import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import persistedReducers from './modules/reduxPersist';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

// Função para executar um reducer e inserir numa váriável que será exportada
const store = createStore(
	persistedReducers(rootReducer),
	applyMiddleware(sagaMiddleware)
);

// Executando o saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
