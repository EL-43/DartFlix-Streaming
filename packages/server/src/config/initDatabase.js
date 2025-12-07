import pool from './database.js';

export const initDatabase = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('Database initialized');
    conn.release();
  } catch (err) {
    console.error('Database initialization error:', err.message);
    throw err;
  }
};