import { IDatabase } from "./Database.js";
import pg from "pg";

interface IPgDatabase extends IDatabase {
  query(params: Parameters<pg.Pool["query"]>): Promise<pg.QueryResult<any>>;
  getPool(): pg.Pool;
}

export type { IPgDatabase };
