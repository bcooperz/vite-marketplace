import session from "express-session";
import { pool } from "./database.js";
import connectPgSimple from "connect-pg-simple";

const PgSession = connectPgSimple(session);

/*
  express-session:
   - Manages user sessions in express apps
   - Creates session IDs and cookies
   - Provides middleware for session management
   - Manages cookie settings and security
   - Handles session expiration -- todo: how?
*/

/*
  connect-pg-simple:
   - Provides PostgreSQL storage for express-session
   - Stores session data in your database instead of memory
   - Creates and manages the session table in your database
   - Handles session cleanup (pruning expired sessions)
   - Enables session persistence across server restarts
*/

const sessionConfig = {
  store: new PgSession({
    pool,
    tableName: "session",
    createTableIfMissing: true,
    errorLog(...args) {
      // todo: handle this properly -- will this make it to my error handler?
      console.error("Session store error:", ...args);
      throw new Error("Session store error");
    },
  }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.COOKIE_SECURE === "true",
    httpOnly: true,
    // todo: investigate what this does and if we need to change it
    sameSite: process.env.COOKIE_SAME_SITE as "strict" | "lax" | "none",
    maxAge: parseInt(process.env.SESSION_DURATION!),
    path: "/",
    rolling: true,
  },
};

export default sessionConfig;
