import { Request, Response } from 'express';
import { MessageAttributes } from '../models/message';
import Message from '../models/message';
import { generateAPIReponse } from '../utils/response';
import User, { UserAttributes } from '../models/user';

export interface GetMessageInfo {
    user: UserAttributes;
    messageContent: string;
}

/**
 * 
 * @param data this will add message info in DB
 * @returns created message
 */
export const createMessage = async (data: MessageAttributes): Promise<MessageAttributes> => {
    console.log('createMessage data =>', data);
    const message = await Message.create(data).then(message => {
        return message;
    }).catch(error => {
        throw new Error(error);
    })
    return message;
}

/**
 * This is will fetch all the messages from DB
 */
export const getAllMessages = async (req:Request, res: Response) => {
    await Message.findAll({
        attributes: ['messageContent'],
        include:[{
                model: User,
                attributes: ['name', 'id'],
                as: 'user',
            }],
        order: [['createdAt', 'ASC']]
    })
    .then(messages => {
        res.status(200).send(generateAPIReponse('Messages retrieved successfully', messages));
    }).catch(error => {
        res.status(500).send(generateAPIReponse(error.message, null));
    })
} 