import { app } from './app';
import http from 'http';

//Http Server Creation
export const httpServer = http.createServer(app);
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

//Socket.io Connection
import listenSocketIOConnection from './src/config/socket';
listenSocketIOConnection(httpServer);

//Server Activtion
httpServer.listen(port, () => {
    console.log(`server running on port: ${port}`);
});