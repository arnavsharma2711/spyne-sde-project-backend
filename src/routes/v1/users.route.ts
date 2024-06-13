import express from 'express';
import { createUser, deleteUser, followUser, getUser, searchUsers, unFollowUser, updateUser } from '../../controllers/v1/user.controller';

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
userRouter.get('/search/:q', searchUsers);

// POST /api/v1/user/:id/follow
userRouter.post('/:following_user_id/follow', followUser);

// POST /api/v1/user/:id/follow
userRouter.delete('/:following_user_id/follow', unFollowUser);

export default userRouter;
