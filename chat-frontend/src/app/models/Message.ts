import { User } from "./User";

export interface MessageInfo {
    user: User;
    messageContent: string;
}

export interface NebularChat {
    text: string;
    type: string;
    reply: boolean;
    user: {
        name: string;
    }
}