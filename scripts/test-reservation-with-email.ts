import { NextRequest } from 'next/server'

// Test script to simulate a reservation creation
async function testReservationWithEmail() {
  console.log('🧪 Testing reservation creation with email notifications...\n')

  try {
    const testReservationData = {
      name: 'Marie Test',
      email: 'marie.test@example.com',
      phone: '+33 1 23 45 67 89',
      date: '2025-06-20',
      time: '19:30',
      guests: 2,
      special_requests: 'Test de notification email',
    }

    const response = await fetch('http://localhost:3000/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testReservationData),
    })

    const data = await response.json()

    if (response.ok) {
      console.log('✅ Reservation created successfully!')
      console.log('📋 Reservation details:', {
        id: data.id,
        name: data.name,
        email: data.email,
        date: data.date,
        time: data.time,
        guests: data.guests,
        status: data.status,
      })

      if (data.emailNotifications) {
        console.log('\n📬 Email notifications status:')
        console.log(`Admin notified: ${data.emailNotifications.adminNotified ? '✅' : '❌'}`)
        console.log(`Customer notified: ${data.emailNotifications.customerNotified ? '✅' : '❌'}`)
        if (data.emailNotifications.error) {
          console.log(`Error: ${data.emailNotifications.error}`)
        }
      }
    } else {
      console.error('❌ Failed to create reservation:', data)
    }
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testReservationWithEmail()
