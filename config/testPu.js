import dotenv from 'dotenv';
dotenv.config();
export const serverTest = {
    port: 4500,
};
export const mongoDbtest = {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    cluster: process.env.MONGODB_CLUSTER ,
    dbname: process.env.MONGODB_DBNAME_TEST ,
    host: '',
};
export const logger = ':method :url :status :res[content-length] - :response-time ms';
