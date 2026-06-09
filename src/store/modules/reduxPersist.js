import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default redures => {
    const persistedReducers = persistReducer({
        key: 'NOME-DA-APLICACAO',
        storage,
        whitelist: ['example'] /* Lista de módulos para salvar na sessão do navegador */
    }, redures);

    return persistedReducers;
};
