import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const setupDatabase = async () => {
  let connection;
  
  try {
    // First, connect without database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    console.log('✓ Connected to MySQL');

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS dartflix');
    console.log('✓ Database created');

    // Switch to database
    await connection.query('USE dartflix');

    // Read and execute schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = schema
      .split(';')
      .filter(stmt => stmt.trim().length > 0);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.query(statement);
          console.log(`✓ Executed statement ${i + 1}/${statements.length}`);
        } catch (error) {
          console.error(`✗ Error in statement ${i + 1}:`, error.message);
          console.log('Statement:', statement.substring(0, 100) + '...');
        }
      }
    }

    console.log('✓ Database setup complete!');
    
  } catch (err) {
    console.error('✗ Database setup failed:', err.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✓ Connection closed');
    }
    process.exit(0);
  }
};

setupDatabase();