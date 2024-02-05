import { Router } from 'express';
import {userRouter} from '../../apiServices/users/route.js';
import { videosRouter } from '../../apiServices/videos/route.js'
import fileUpload from 'express-fileupload';
import auth from './auth.js'
const router = Router();
router.use('/users', userRouter);
router.use('/videos', videosRouter)
// set NODE_OPTIONS=--experimental-vm-modules npx jest
export default router;