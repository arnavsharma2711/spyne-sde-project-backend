import express from 'express';
import userRoutes from './v1/users.route';
import authRouter from './v1/auth.route';
import searchRouter from './v1/search.route';
import { authenticationMiddleware } from '../middlewares/authentication';

const v1Router = express.Router();

v1Router.use('/search', searchRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/user', authenticationMiddleware, userRoutes);

export default v1Router;
