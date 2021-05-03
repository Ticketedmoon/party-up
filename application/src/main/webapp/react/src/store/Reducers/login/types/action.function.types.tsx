import {ILoginActionInterface} from "./ILoginActionInterface";
import {Login} from "./action.constants";
import {User} from "../../../../utils/types/user.dto.type";

export function setUser(user: User): ILoginActionInterface {
    return {
        type: Login.SET_USER,
        payload: user
    }
}
