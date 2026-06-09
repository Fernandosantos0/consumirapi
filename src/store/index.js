import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

// Função para executar um reducer e inserir numa váriável que será exportada
const store = createStore(rootReducer);

export default store;
