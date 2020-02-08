import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(RootReducer, composeWithDevTools(
    applyMiddleware()
));

export default store;