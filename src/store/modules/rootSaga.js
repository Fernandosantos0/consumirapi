import { all } from 'redux-saga/effects';

// Importando o saga
import example from './example/sagas';

export default function* rootSaga() {
    return yield all([example]);
}
