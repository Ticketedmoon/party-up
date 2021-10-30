import {applyMiddleware, createStore, Store} from "redux";
import RootReducer from "./Reducers/login/login.reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";

export const store: Store = createStore(RootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

