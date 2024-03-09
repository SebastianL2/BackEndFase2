import { Router } from 'express'
import express from 'express';
import { VideoController } from './controller.js'
import { verifyToken } from '../../middlewares/authJwt.js';

export const createVideoRouter = ({ videoModel }) => {
     const videosRouter = express.Router();
    
    const videoController = new VideoController ({ videoModel })

    videosRouter.get('/',verifyToken, videoController.getAll)
    videosRouter.get('/privates',verifyToken, videoController.getByPrivates)
    videosRouter.get('/publics', videoController.getByPublics)
    videosRouter.post('/',verifyToken, videoController.create)
    videosRouter.get('/:id', videoController.getById)
    videosRouter.delete('/:id',verifyToken, videoController.delete)
    videosRouter.patch('/:id',verifyToken, videoController.update)

    return videosRouter;

}



