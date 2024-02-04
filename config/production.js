//set NODE_ENV=production; node bin/www  
import dotenv from 'dotenv';
dotenv.config();
export const server = {
    port: 4500,
};
export const mongoDb = {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    cluster: process.env.MONGODB_CLUSTER ,
    dbname: process.env.MONGODB_DBNAME ,
    host: '',
};
export const logger = ':method :url :status :res[content-length] - :response-time ms';
