import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { createRouter } from './v1/routes/index.js';
import swaggerDocs from './v1/swagger.js';

export const createApp = ({ userModel,videoModel }) => {
    const app = express();
   
    dotenv.config();
    const corsOptions = {
        origin: true,
        credentials: true,
    };
    app.use(fileUpload({
        useTempFiles: false
    }));
   
    app.set('PORT', process.env.PORT);
    mongoose.set('strictQuery', false);
    app.use(express.json());
    app.use(cors(corsOptions));
   
    app.use('/v1', createRouter({ userModel,videoModel }));
   
    app.listen(app.get('PORT'), () => {
        console.log(`Server listen too port: ${app.get('PORT')}`);
        swaggerDocs(app, app.get('PORT'));
    });
    
};
