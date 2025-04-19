import session from "express-session";
import { pool } from "./database.js";
import connectPgSimple from "connect-pg-simple";

const PgSession = connectPgSimple(session);

export const sessionConfig = {
  store: new PgSession({
    pool,
    tableName: "sessions",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.COOKIE_SECURE === "true",
    httpOnly: true,
    sameSite: process.env.COOKIE_SAME_SITE as "strict" | "lax" | "none",
    maxAge: parseInt(process.env.SESSION_DURATION!),
  },
};
