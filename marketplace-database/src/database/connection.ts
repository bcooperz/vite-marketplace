import knex from "knex";
import config from "../../knexfile.ts";

const environment = process.env.NODE_ENV || "development";
const knexConfig = config[environment];

export const db = knex(knexConfig);
