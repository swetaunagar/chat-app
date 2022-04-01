# Chat Room
Light Chat Module. Multiple user can chat simultaneously.

### Tech Stack
- [Angular 13](https://angular.io/start)
- [Nebular UI kit](https://akveo.github.io/nebular/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [AWS RDS](https://aws.amazon.com/)

### Prerequisite
Make sure you have installed NodeJS locally. If not then install [Node.js](https://nodejs.org/). Compatible version is 14.19.1

Verify Whether NodeJS installed or not by using this command
```sh
node --version
npm --version
```
### How to run backend app
Clone the repository using this [url](https://github.com/swetaunagar/chat-app.git)

Then go to the project directory and install packages
```sh
cd chat-backend
npm i
```
After successfull instalation run the app using,
```sh
npm run dev
```
### How to run frontend app

Go to the project directory and install packages
```sh
cd chat-frontend
npm i
```
After successfull instalation run the app using,
```sh
ng serve --open
```
Visit localhost:4200
### Note
For security reason please download dev.env file from email attachment and add inside backend project root directory (chat-backend/dev.env)

Database for this app is hosted on AWS RDS so don't need to setup locally

### Author
[Sweta Unagar](https://swetaunagar.com)
