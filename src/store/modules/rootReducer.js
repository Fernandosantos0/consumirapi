import { combineReducers } from 'redux';

import exampleReducer from './example/reducer';

// Função para combinar varios reducer
export default combineReducers({
    example: exampleReducer,
});
