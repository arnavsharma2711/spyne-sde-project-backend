import express from 'express';
import { createPost } from '../../controllers/v1/post.controller';

const postRouter = express.Router();

// POST /api/v1/auth/register
postRouter.post('/', createPost);

export default postRouter;
