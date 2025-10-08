import { User, UserCreate } from "src/types/user/index.js";
import { IUserRepository } from "./interfaces/IUserRepository.js";
import { IPgDatabase } from "./interfaces/PgDatabase.js";

// todo: review

export class UserRepository implements IUserRepository {
  private database: IPgDatabase;

  constructor(database: IPgDatabase) {
    this.database = database;
  }
  async createUser(user: UserCreate, hashedPassword: string): Promise<User> {
    const result = await this.database.getPool().query({
      text: "INSERT INTO users (email, password_hash, created_at, updated_at, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [
        user.email,
        hashedPassword,
        user.createdAt,
        user.updatedAt,
        user.firstName,
        user.lastName,
        user.dob,
      ],
    });

    return result.rows[0];
  }

  async getUserById(id: string): Promise<User> {
    const result = await this.database.getPool().query({
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    });
    return result.rows[0];
  }

  async getUserByEmail(email: string): Promise<User> {
    const result = await this.database.getPool().query({
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    });

    return result.rows[0];
  }

  async updateUser(user: User): Promise<User> {
    const result = await this.database.getPool().query({
      text: "UPDATE users SET email = $1, password_hash = $2, created_at = $3, updated_at = $4, first_name = $5, last_name = $6, date_of_birth = $7 WHERE id = $8 RETURNING id",
      values: [
        user.email,
        user.password_hash,
        user.created_at,
        user.updated_at,
        user.first_name,
        user.last_name,
        user.date_of_birth,
        user.id,
      ],
    });
    return result.rows[0];
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.database.getPool().query({
      text: "DELETE FROM users WHERE id = $1",
      values: [id],
    });
    return result.rows[0];
  }
}
