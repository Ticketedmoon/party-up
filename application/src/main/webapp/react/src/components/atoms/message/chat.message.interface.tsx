import {IMessageTypeResponse} from "./chat.message.enum";

export interface IChatMessageResponse {
    type: IMessageTypeResponse,
    content: string,
    sender: string,
    time: string
}
