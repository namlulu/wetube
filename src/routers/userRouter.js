import express from 'express';
import { edit, remove, logout, see } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/edit', edit);
userRouter.get('/logout', logout);
userRouter.get('/delete', remove);
userRouter.get(':id', see);

export default userRouter;
