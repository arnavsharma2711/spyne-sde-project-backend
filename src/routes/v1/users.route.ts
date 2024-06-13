import express from 'express';
import { createUser, deleteUser, getUser, searchUsers, updateUser } from '../../controllers/v1/user.controller';

const userRouter = express.Router();

// POST /api/v1/user/register
userRouter.post('/register', createUser);

// PUT /api/v1/user/update
userRouter.put('/update', updateUser);

// DELETE /api/v1/user/delete
userRouter.delete('/delete', deleteUser);

// GET /api/v1/user/:id
userRouter.get('/:id', getUser);

// GET /api/v1/user/search/:q
userRouter.get('/search/:search_query', searchUsers);

export default userRouter;
