// TypeScript infers that this function is returning SendMessageAction
import {ILoginActionInterface} from "./ILoginActionInterface";
import {Login} from "./action.constants";

export function sendMessage(amount: number): ILoginActionInterface {
    return {
        type: Login.SEND_MESSAGE,
        payload: amount
    }
}

// TypeScript infers that this function is returning DeleteMessageAction
export function deleteMessage(timestamp: number): ILoginActionInterface {
    return {
        type: Login.DELETE_MESSAGE,
        payload: {
            timestamp
        }
    }
}