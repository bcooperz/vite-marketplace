import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: process.env.MIGRATION_DIR!,
      extension: "ts",
      loadExtensions: [".ts"],
    },
    seeds: {
      directory: process.env.SEED_DIR!,
      extension: "ts",
      loadExtensions: [".ts"],
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL!,
    migrations: {
      directory: process.env.MIGRATION_DIR!,
      extension: "ts",
    },
    seeds: {
      directory: process.env.SEED_DIR!,
      extension: "ts",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
