import { controllerWrapper } from '../../lib/controllerWrapper';
import build_response from '../../lib/response/MessageResponse';
import { createUserSchema, updateUserInfoSchema, userIdSchema, userSearchParamsSchema } from '../../lib/zod/user.schema';
import { createNewUser, deleteExistingUser, findUserById, searchAllUsers, updateUserInfo } from '../../model/user.model';
import { userInfoSchema } from '../../lib/zod/common.schema';

export const createUser = controllerWrapper(async (req, res) => {
  const { full_name, email, phone_number, password } = createUserSchema.parse(req.body);

  const userDetails = await createNewUser(full_name, email, password, phone_number);

  const userInfo = userInfoSchema.parse(userDetails);
  res.status(201).json(build_response(true, 'User data updated successfully!', null, null, userInfo));
});

export const updateUser = controllerWrapper(async (req, res) => {
  const { id, full_name, email, phone_number } = updateUserInfoSchema.parse(req.body);

  const userDetails = await updateUserInfo(id, full_name, email, phone_number);

  const userInfo = userInfoSchema.parse(userDetails);
  res.status(200).json(build_response(true, 'User data updated successfully!', null, null, userInfo));
});

export const deleteUser = controllerWrapper(async (req, res) => {
  const { id } = userIdSchema.parse(req.params);

  await deleteExistingUser(id);

  res.status(204).json(build_response(true, 'User deleted successfully!', null, null, null));
});

export const getUser = controllerWrapper(async (req, res) => {
  const { id } = userIdSchema.parse(req.params);

  const user = await findUserById(id);

  const userInfo = userInfoSchema.parse(user);
  res.status(200).json(build_response(true, 'User fetched successfully!', null, null, userInfo));
});

//Add Pagination
export const searchUsers = controllerWrapper(async (req, res) => {
  const { q } = userSearchParamsSchema.parse(req.params);

  const users = await searchAllUsers(q);

  const userInfo = userInfoSchema.array().parse(users);
  res.status(200).json(build_response(true, 'Users fetched successfully!', null, userInfo.length > 0 ? userInfo.length : null, userInfo));
});