import { Request, Response } from 'express';
import { userRoutes } from './userRoutes';
import { messageRoutes } from './messageRoutes';
const baseUrl = '/api/v1';

module.exports = (app: any) => {

    app.get('/', function (req: Request, res: Response) {
        res.status(200).send('Welcome');
    });

    //---- User Routes -----//
    app.use(`${baseUrl}/user`, userRoutes);

     //---- Message Routes -----//
     app.use(`${baseUrl}/message`, messageRoutes);

}