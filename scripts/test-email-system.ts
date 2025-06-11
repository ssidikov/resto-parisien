import { testEmailConfiguration, sendAdminNotification } from '../lib/email'

async function testEmail() {
  console.log('🧪 Testing Email System...\n')

  try {
    // Test 1: Check email configuration
    console.log('1️⃣ Testing email configuration...')
    const isConfigured = await testEmailConfiguration()
    console.log(`Configuration valid: ${isConfigured ? '✅ YES' : '❌ NO'}`)

    // Test 2: Send a test email
    if (isConfigured) {
      console.log('\n2️⃣ Sending test email...')
      const testReservation = {
        id: 999999,
        name: 'Test Utilisateur',
        email: 'test@example.com',
        phone: '+33 1 23 45 67 89',
        date: new Date().toISOString().split('T')[0],
        time: '19:30',
        guests: 2,
        special_requests: 'Ceci est un email de test pour vérifier la configuration.',
        status: 'pending' as const,
      }

      const emailSent = await sendAdminNotification(testReservation)
      console.log(`Test email sent: ${emailSent ? '✅ SUCCESS' : '❌ FAILED'}`)
    } else {
      console.log('\n⚠️ Skipping email sending test due to configuration issues')
    }

    console.log('\n📋 Current email configuration:')
    console.log(`SERVICE: ${process.env.EMAIL_SERVICE || 'Not set'}`)
    console.log(`USER: ${process.env.EMAIL_USER ? '***@***' : 'Not set'}`)
    console.log(`TO: ${process.env.EMAIL_TO || 'Not set'}`)
    console.log(`FROM: ${process.env.EMAIL_FROM || 'Not set'}`)

    console.log('\n✅ Email system test completed!')
  } catch (error) {
    console.error('\n❌ Email test failed:', error)
  }
}

testEmail()
