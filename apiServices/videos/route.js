import { Router } from 'express'

import { VideoController } from './controller.js'

export const videosRouter = Router()

videosRouter.get('/', VideoController.getAll)
videosRouter.post('/', VideoController.create)

videosRouter.get('/:id', VideoController.getById)
videosRouter.delete('/:id', VideoController.delete)
videosRouter.patch('/:id', VideoController.update)