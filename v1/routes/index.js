import { Router } from 'express';
import {userRouter} from '../../apiServices/users/route.js';
import { videosRouter } from '../../apiServices/videos/route.js'



const router = Router();
router.use('/users', userRouter);
router.use('/videos', videosRouter)

export default router;