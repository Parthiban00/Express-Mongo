import express from 'express';
const userRouter = express.Router();
import { saveUser, getAllUsers, getOneUserById, updateOneUserById, deleteOneUserById } from '../user/user.controller';
import { middlewares } from '../../middlewares/index';

userRouter.post('/saveUser', middlewares.checkDuplicate, saveUser);
userRouter.get('/getAllUsers', middlewares.verifyToken, getAllUsers);
userRouter.get('/getOneUserById/:id', middlewares.verifyToken, getOneUserById);
userRouter.patch('/updateOneUserById/:id', middlewares.verifyToken, updateOneUserById);
userRouter.delete('/deleteOneUserById/:id', middlewares.verifyToken, deleteOneUserById);

module.exports = userRouter