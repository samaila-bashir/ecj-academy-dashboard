import { all, fork } from 'redux-saga/effects'
import { watchHandleLogin, watchHandleLogout } from './authenticatication'

export default function* rootSaga(): Generator {
    yield all([fork(watchHandleLogin), fork(watchHandleLogout)])
}
