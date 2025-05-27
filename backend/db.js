import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new pg.Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

export async function initTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        item_id INTEGER UNIQUE NOT NULL,
        name TEXT NOT NULL,
        examine TEXT,
        members BOOLEAN
      );
      CREATE TABLE IF NOT EXISTS prices (
        id SERIAL PRIMARY KEY,
        item_id INTEGER UNIQUE NOT NULL ,
        high INTEGER,
        low INTEGER,
        highTime BIGINT,
        lowTime BIGINT
      );
    `);
    console.log('Tables checked/created.');
  } catch (err) {
    console.error('Error creating tables:', err.message);
    throw err;
  }
}