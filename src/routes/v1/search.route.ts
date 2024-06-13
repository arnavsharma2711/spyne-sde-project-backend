import express from 'express';
import { searchUsers } from '../../controllers/v1/user.controller';

const searchRouter = express.Router();

// POST /api/v1/auth/register
searchRouter.post('/user', searchUsers);

export default searchRouter;
