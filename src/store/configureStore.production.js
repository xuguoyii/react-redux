import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(sagaMiddleware))
	);
	persistStore(store, { whitelist: ['total'], storage: localForage });
	sagaMiddleware.run(rootSaga);
	return store;
}
