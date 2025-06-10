import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function testReservationAPI() {
  try {
    console.log('Testing reservation creation...')

    const testReservation = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+33 1 23 45 67 89',
      date: '2025-06-15',
      time: '19:30',
      guests: 2,
      special_requests: 'Test reservation from script',
    }

    console.log('Sending POST request to API...')
    const response = await fetch('http://localhost:3000/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testReservation),
    })

    console.log('Response status:', response.status)

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Reservation created successfully:', result)
    } else {
      const error = await response.json()
      console.log('❌ Error creating reservation:', error)
    }

    // Now check database directly
    console.log('\nChecking database directly...')
    const sql = neon(process.env.DATABASE_URL!)
    const reservations = await sql`SELECT * FROM reservations ORDER BY created_at DESC LIMIT 5`

    console.log(`Found ${reservations.length} recent reservations:`)
    reservations.forEach((reservation, index) => {
      console.log(
        `${index + 1}. ${reservation.name} - ${reservation.date} ${reservation.time} - Status: ${
          reservation.status
        }`
      )
    })
  } catch (error) {
    console.error('Error testing API:', error)
  }
}

testReservationAPI()
