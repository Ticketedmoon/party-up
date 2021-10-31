import {applyMiddleware, createStore, Store} from "redux";
import RootReducer from "./Reducers/login/login.reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {persistReducer, persistStore} from 'redux-persist'

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

const store: Store = createStore(persistedReducer, composeWithDevTools(
	applyMiddleware(thunk)
));

export const persistedStore = {
	store: store,
	persistor: persistStore(store),
}