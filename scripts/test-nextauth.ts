// Test script to check NextAuth configuration
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function testNextAuth() {
  console.log('🔍 Testing NextAuth Configuration...')

  // Check environment variables
  console.log('📊 Environment Variables:')
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
  console.log('NEXTAUTH_SECRET length:', process.env.NEXTAUTH_SECRET?.length || 0)
  console.log('DATABASE_URL configured:', !!process.env.DATABASE_URL)

  // Test if NextAuth API endpoint is accessible
  try {
    console.log('\n🌐 Testing NextAuth API endpoint...')
    const response = await fetch('http://localhost:3000/api/auth/csrf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (response.ok) {
      const data = await response.text()
      console.log('✅ NextAuth API is working!')
      console.log('Response data:', data.substring(0, 100) + '...')
    } else {
      console.log('❌ NextAuth API returned error status:', response.status)
      const errorText = await response.text()
      console.log('Error response:', errorText.substring(0, 200))
    }
  } catch (error) {
    console.error('❌ Error testing NextAuth API:', error)
  }
}

testNextAuth()
