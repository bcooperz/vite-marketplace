import { User, UserCreate } from "src/types/user/index.js";

export interface IUserRepository {
  createUser(user: UserCreate, hashedPassword: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
