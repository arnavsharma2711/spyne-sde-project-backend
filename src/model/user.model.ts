import { eq, like, or } from 'drizzle-orm';
import { users as User } from '../lib/db/schema';
import databaseInstance from '../lib/db';
import bcrypt from 'bcrypt';
import { CustomError } from '../lib/error/custom.error';

export const findUserById = async (id: number) => {
  const user = await databaseInstance.select().from(User).where(eq(User.id, id)).limit(1);
  return user[0];
};

export const findUserByEmail = async (email: string) => {
  const user = await databaseInstance.select().from(User).where(eq(User.email, email)).limit(1);
  return user[0];
};

export const validUserAndPassword = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new CustomError(404, 'Authentication Error', 'Invalid credentials!');

  const passwordMatch = user.encrypted_password ? bcrypt.compareSync(password, user.encrypted_password) : false;
  if (!passwordMatch) throw new CustomError(401, 'Authentication Error', 'Invalid credentials!');

  return user;
};

export const createNewUser = async (full_name: string, email: string, password: string, phone_number: string) => {
  const values = {
    full_name,
    email,
    phone_number,
    encrypted_password: bcrypt.hashSync(password, 10),
  };

  if (await findUserByEmail(email)) throw new CustomError(409, 'Conflict Error', 'User already exists!');

  const newUser = await databaseInstance.insert(User).values(values).returning({ id: User.id, full_name: User.full_name, email: User.email });

  return newUser[0];
};

export const updateUserInfo = async (id: number, full_name: string, email: string, phone_number: string) => {
  const values = {
    full_name,
    email,
    phone_number,
  };

  const updatedUser = await databaseInstance
    .update(User)
    .set(values)
    .where(eq(User.id, id))
    .returning({ id: User.id, full_name: User.full_name, email: User.email });

  return updatedUser[0];
};

export const updateUserPassword = async (userId: number, oldPassword: string, newPassword: string) => {
  const user = await findUserById(userId);
  const passwordMatch = user.encrypted_password ? bcrypt.compareSync(oldPassword, user.encrypted_password) : false;
  if (!passwordMatch) throw new CustomError(401, 'Authentication Error', 'Old Password is incorrect!');

  await databaseInstance
    .update(User)
    .set({ encrypted_password: bcrypt.hashSync(newPassword, 10) })
    .where(eq(User.id, userId))
    .returning();

  return true;
};

export const deleteExistingUser = async (id: number) => {
  await databaseInstance.delete(User).where(eq(User.id, id));
  return true;
};

export const searchAllUsers = async (search: string) => {
  console.log('search', search);
  const users = await databaseInstance
    .select()
    .from(User)
    .where(or(like(User.full_name, `%${search}%`), like(User.email, `%${search}%`), like(User.phone_number, `%${search}%`)));
  return users;
};
