import { combineReducers } from 'redux';

import auth from './auth/reducer';

// Função para combinar varios reducer
export default combineReducers({
	auth
});
