// TypeScript infers that this function is returning SendMessageAction
import {ILoginActionInterface} from "./ILoginActionInterface";
import {Login} from "./action.constants";

export function setUser(user: {username: string, role: string}): ILoginActionInterface {
    return {
        type: Login.SET_USER,
        payload: user
    }
}
