import {IMessageTypeResponse} from "./chat.message.enum";
import {UserDtoType} from "../../../utils/types/user.dto.interface";

export interface IChatMessageResponse {
    type: IMessageTypeResponse,
    content: string,
    sender: UserDtoType,
    time: string
}
