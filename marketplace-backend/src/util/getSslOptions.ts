import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getSslOptions = () => {
  try {
    return {
      key: fs.readFileSync(
        path.resolve(__dirname, "..", "..", "..", "localhost-key.pem")
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, "..", "..", "..", "localhost.pem")
      ),
    };
  } catch (error) {
    console.error("Failed to load SSL certificates:", error);
    throw new Error("SSL certificate configuration failed");
  }
};
