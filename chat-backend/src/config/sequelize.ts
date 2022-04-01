import { Sequelize } from 'sequelize';

const connectionUrl: string = process.env.DB_CONNECTION || '';
const sequelizeConnection = new Sequelize(connectionUrl);

sequelizeConnection.authenticate()
  .then(() => console.log('DB connected successfully.'))
  .catch(error => console.error('Unable to connect to the DB:', error));

export default sequelizeConnection;