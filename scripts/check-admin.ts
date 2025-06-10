import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function checkAdmin() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    console.log('Checking admin users in database...')
    const admins = await sql`SELECT id, username, email, password FROM admins`

    console.log(`Found ${admins.length} admin(s):`)

    for (const admin of admins) {
      console.log(`- ID: ${admin.id}, Username: ${admin.username}, Email: ${admin.email}`)

      // Test password verification
      const isPasswordValid = await bcrypt.compare('admin123', admin.password)
      console.log(`  Password verification: ${isPasswordValid ? '✅ VALID' : '❌ INVALID'}`)
      console.log(`  Password hash: ${admin.password.substring(0, 20)}...`)
    }
  } catch (error) {
    console.error('Error checking admin:', error)
  }
}

checkAdmin()
