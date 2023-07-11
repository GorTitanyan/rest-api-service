import express from 'express';
import userController from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';

const userRouter = express.Router();

userRouter.get('/user/:id', isAuth, userController.getUserId);
userRouter.put("/user/:id", isAuth, userController.updateUser)
userRouter.get('/logout', isAuth, userController.logout);

export default userRouter;
