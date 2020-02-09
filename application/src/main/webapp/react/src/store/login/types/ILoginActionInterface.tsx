// src/store/chat/types.ts

import {Login} from "./action.constants";

interface ISendMessageAction {
    type: typeof Login.SEND_MESSAGE
    payload: number
}

interface IDeleteMessageAction {
    type: typeof  Login.DELETE_MESSAGE
    payload: {
        timestamp: number
    }
}
export type ILoginActionInterface = ISendMessageAction | IDeleteMessageAction;