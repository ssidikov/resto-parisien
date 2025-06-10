import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

async function createTestAdmin() {
  try {
    console.log('Creating test admin user...')

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables')
    }

    const sql = neon(process.env.DATABASE_URL)

    // Delete all existing admins
    await sql`DELETE FROM admins`
    console.log('Cleared existing admins')

    // Create a new hash with lower cost for testing
    const password = 'admin123'
    const saltRounds = 10 // Lower than 12 for faster processing
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    console.log('Generated password hash:', hashedPassword)

    // Insert new admin
    const result = await sql`
      INSERT INTO admins (username, email, password) 
      VALUES ('admin', 'admin@lemoderne.fr', ${hashedPassword})
      RETURNING id, username, email
    `

    console.log('Admin created:', result[0])

    // Immediately test the password
    const testResult = await bcrypt.compare(password, hashedPassword)
    console.log('Password test result:', testResult ? '✅ SUCCESS' : '❌ FAILED')

    if (testResult) {
      console.log('\n🎉 Admin user created successfully!')
      console.log('Login credentials:')
      console.log('  Username: admin')
      console.log('  Password: admin123')
      console.log('\nYou can now login at: http://localhost:3000/auth/login')
    } else {
      console.error('❌ Password verification failed immediately after creation!')
    }
  } catch (error) {
    console.error('Failed to create admin:', error)
    process.exit(1)
  }
}

createTestAdmin()
