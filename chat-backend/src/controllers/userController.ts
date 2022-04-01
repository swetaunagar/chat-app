import { Request, Response } from 'express';
import User, { UserAttributes } from '../models/user';
import sequelize from 'sequelize';
import { generateAPIReponse } from '../utils/response';

/**
 * This will create user if not exist in DB else return exisitng user
 */
export const createUser = async (req: Request, res: Response) => {
    console.log('createUser params =>', req.body);
    const { name } = req.body;
    try {
        let user = await findUserByName(name);
        if (user) {
            res.status(200).send(generateAPIReponse('User retrieved successfully', user));
        } else {
            user = await createNewUser(req.body);
            res.status(200).send(generateAPIReponse('User registered successfully', user));
        }
    } catch (error) {
        console.log('createUser error =>', error);
        res.status(500).send({ message: 'Oops! something went wrong, Please try again after some time' })
    }

}

/**
 * This will find user by name in DB
 * @param name string
 * @returns user if found else null
 */
const findUserByName = async (name: string): Promise<UserAttributes | null> => {
    const user = await User.findOne({
        where: {
            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
        }
    }).then(user => {
        return user;
    }).catch(error => {
        throw new Error(error);
    })
    return user;
}

/**
 * This will create user in DB
 * @param body params to create user
 * @returns created user
 */
const createNewUser = async (body: UserAttributes): Promise<UserAttributes> => {
    const user = await User.create(body).then(user => {
        return user;
    }).catch(error => {
        throw new Error(error);
    })
    return user;
}