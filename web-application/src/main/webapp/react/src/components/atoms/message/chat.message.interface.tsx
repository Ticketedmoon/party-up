import {IMessageTypeResponse} from "./chat.message.enum";
import {User} from "../../../utils/types/user.dto.type";

export interface IChatMessageResponse {
    type: IMessageTypeResponse,
    content: string,
    sender: User,
    time: string
}
