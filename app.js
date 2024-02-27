import express from 'express' 
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from "morgan";
const app = express()
import fileUpload from 'express-fileupload'
import  userCollection  from './database/mongoDb/index.js';
import routes from './v1/routes/index.js';
import swaggerDocs from './v1/swagger.js';

const corsOptions = {
    origin: true,
    credentials: true,
}
dotenv.config()

app.use(fileUpload({
    useTempFiles : false
}));
app.set('PORT', process.env.PORT)
mongoose.set('strictQuery', false);
app.use(express.json())
app.use(cors(corsOptions))
app.use('/v1', routes);


app.use(express.json())
app.use(cors(corsOptions))
app.listen(app.get('PORT'), ()=>{
    console.log(`Server listen too port: ${app.get('PORT')}` );
    swaggerDocs(app, app.get('PORT'));
})


export default app;