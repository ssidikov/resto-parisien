import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function initDatabase() {
  try {
    console.log('Initializing database...');
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    
    const sql = neon(process.env.DATABASE_URL);
    
    // Execute individual SQL commands
    console.log('Creating admins table...');
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('Creating reservations table...');
    await sql`
      CREATE TABLE IF NOT EXISTS reservations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          date DATE NOT NULL,
          time VARCHAR(10) NOT NULL,
          guests INTEGER NOT NULL CHECK (guests > 0),
          special_requests TEXT,
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
          created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('Creating default admin user...');
    // Insert a default admin user (password: admin123)
    // Password hash for 'admin123'
    await sql`
      INSERT INTO admins (username, email, password) VALUES 
      ('admin', 'admin@lemoderne.fr', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.LzKepe')
      ON CONFLICT (username) DO NOTHING
    `;
    
    console.log('Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at)`;
    
    console.log('Database initialization completed!');
    console.log('\nDefault admin credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\nYou can now access the dashboard at: http://localhost:3000/auth/login');
    
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initDatabase();
