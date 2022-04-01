import express from 'express';
export const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';

//Load environmental variable
const currentEnv = process.env.NODE_ENV || 'dev';
dotenv.config({ path: __dirname + `/${currentEnv}.env` });

//Enable all CORS requests
app.use(cors());

//Parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB Connection
import sequelizeConnection from './src/config/sequelize';
sequelizeConnection;

//Initialized API routes
require('./src/routes')(app);