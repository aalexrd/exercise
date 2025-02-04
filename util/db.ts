import { Pool } from "pg";

const dbInstance = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default dbInstance;
