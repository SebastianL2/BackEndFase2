import { Router } from 'express'
import express from 'express';
import {  UserController } from './controller.js'
export const createUserRouter = ({ userModel }) => {
    const userRouter = express.Router();
    
    const userController = new UserController ({ userModel })
    
    userRouter.get('/', userController.getAll)
    userRouter.post('/signUp/', userController.signUp)
    userRouter.post('/signIn/', userController.signIn)
    userRouter.get('/:id', userController.getById)
    userRouter.delete('/:id', userController.delete)
    userRouter.patch('/:id', userController.update)
    
    return userRouter;
}
