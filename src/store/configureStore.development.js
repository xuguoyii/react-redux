import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(sagaMiddleware, logger)),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	);
	persistStore(store, { whitelist: ['total'], storage: localForage });
	sagaMiddleware.run(rootSaga);
	return store;
}
