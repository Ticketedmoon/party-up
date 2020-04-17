import {ILoginActionInterface} from "./types/ILoginActionInterface";
import {Login} from "./types/action.constants";
import {IStore} from "./types/store.interface.types";
import {Reducer} from "redux";

const initialState: IStore = {
    activeUser: null
};

const rootReducer: Reducer<IStore, ILoginActionInterface> = (state: IStore = initialState, action: ILoginActionInterface) => {
    switch (action.type) {
        case Login.SET_USER:
            return Object.assign({}, state, {activeUser: action.payload});
        default:
            return state;
    }
};

export default rootReducer;
