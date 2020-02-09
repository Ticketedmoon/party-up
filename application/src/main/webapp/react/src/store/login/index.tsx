/** A reducer is just a JavaScript function.
 *  A reducer takes two parameters: the current state and an action.
 *  Reducers produce the state of the application.
 *  Redux says the only way to change the state is by sending a signal to the store. This signal is an action.
 *
 *  There are two key points for avoiding mutations in Redux:
 *  1. Using concat(), slice(), and …spread for arrays
 *  2. Using Object.assign() and …spread for objects */

import * as React from "react";
import {ILoginActionInterface} from "./types/ILoginActionInterface";
import {Reducer} from "redux";
import {Login} from "./types/action.constants";
import {IStore} from "./types/store.interface.types";

const initialState: IStore = {
    value: 5
};

const rootReducer : Reducer<IStore> = (state = initialState, action: ILoginActionInterface) => {
    switch (action.type) {
        case Login.SEND_MESSAGE:
            return Object.assign({}, state, {value: action.payload});
        case Login.DELETE_MESSAGE:
            return Object.assign({}, state, {});
        default:
            return state;
    }
};

export default rootReducer;