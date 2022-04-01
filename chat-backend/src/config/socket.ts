import { Server, Socket } from 'socket.io';
import { createMessage, GetMessageInfo } from '../controllers/messageController';

 function listenSocketIOConnection (httpServer: any) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:4200"
        }
    });

    io.on('connection', (socket: Socket) => {
        socket.on('message', (msg: GetMessageInfo) => {
            try{
                createMessage({senderId: msg.user.id, messageContent: msg.messageContent});
                socket.broadcast.emit('message-broadcast', msg);
            } catch(error) {
                console.log('createMessage error =>', error);
            }
         });
    });
}

export default listenSocketIOConnection;


