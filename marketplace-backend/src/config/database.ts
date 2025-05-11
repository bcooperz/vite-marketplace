import pg from "pg";
const { Pool } = pg;

// todo: consider if there's a simpler way of implementing this while still using a singleton pattern
class Database {
  private pool: pg.Pool | null = null;
  private static instance: Database;

  constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public initialize() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!),
      database: process.env.POSTGRES_DB,
      query_timeout: parseInt(process.env.POSTGRES_QUERY_TIMEOUT!),
    });

    // todo: what does this do? specifically process.exit?
    this.pool.on("error", (error) => {
      console.error("Unexpected database error:", error);
      process.exit(1); // Exit the process if the database connection is lost
    });
  }

  public getPool() {
    if (!this.pool) {
      throw new Error("Database not initialized");
    }
    return this.pool;
  }

  // todo: fix params as it has multiple overloads
  public async query(params: Parameters<pg.Pool["query"]>) {
    if (!this.pool) {
      throw new Error("Database not initialized");
    }
    return this.pool.query(...params);
  }

  public async checkDatabaseConnection() {
    try {
      if (!this.pool) {
        throw new Error("Database not initialized");
      }
      const client = await this.pool.connect();
      await client.query("SELECT NOW()");
      client.release();
      console.log("Database connected successfully");
      return true;
    } catch (error) {
      console.error("Database connection error:", error);
      return false;
    }
  }

  public async close() {
    if (!this.pool) {
      throw new Error("Database not initialized");
    }
    await this.pool.end();
  }
}

export const database = Database.getInstance();
