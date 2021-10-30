import {Login} from "./action.constants";

interface ISetUserAction {
    type: typeof Login.SET_USER
    payload: Object
}

export type ILoginActionInterface = ISetUserAction;
