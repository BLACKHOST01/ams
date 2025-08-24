import { Pool } from "pg";

const pool = new Pool({
  user: "school_admin",
  host: "localhost",
  database: "school_attendance",
  password: "iamsheyin",
  port: 5432,
});

export default pool;
// Note: Replace "yourpassword" with the actual password for the "school_admin" user. Ensure your PostgreSQL server is running and accessible.