import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function addTestReservations() {
  try {
    console.log('Adding test reservations...');
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    
    const sql = neon(process.env.DATABASE_URL);
    
    const testReservations = [
      {
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        phone: '+33 1 23 45 67 89',
        date: '2025-06-15',
        time: '19:30',
        guests: 2,
        special_requests: 'Anniversaire de mariage - table romantique si possible',
        status: 'pending'
      },
      {
        name: 'Jean-Pierre Martin',
        email: 'jp.martin@company.fr',
        phone: '+33 1 98 76 54 32',
        date: '2025-06-16',
        time: '20:00',
        guests: 4,
        special_requests: 'Dîner d\'affaires',
        status: 'confirmed'
      },
      {
        name: 'Sophie Laurent',
        email: 'sophie.laurent@gmail.com',
        phone: '+33 1 11 22 33 44',
        date: '2025-06-17',
        time: '12:30',
        guests: 3,
        special_requests: 'Menu végétarien pour une personne',
        status: 'pending'
      },
      {
        name: 'Thomas Rousseau',
        email: 'thomas.rousseau@free.fr',
        phone: '+33 1 55 66 77 88',
        date: '2025-06-14',
        time: '21:00',
        guests: 2,
        special_requests: null,
        status: 'cancelled'
      },
      {
        name: 'Isabelle Moreau',
        email: 'isabelle.moreau@hotmail.com',
        phone: '+33 1 44 55 66 77',
        date: '2025-06-18',
        time: '13:00',
        guests: 6,
        special_requests: 'Repas de famille - haute chaise pour bébé nécessaire',
        status: 'confirmed'
      }
    ];
    
    for (const reservation of testReservations) {
      await sql`
        INSERT INTO reservations (name, email, phone, date, time, guests, special_requests, status, created_at) 
        VALUES (${reservation.name}, ${reservation.email}, ${reservation.phone}, ${reservation.date}, 
                ${reservation.time}, ${reservation.guests}, ${reservation.special_requests}, 
                ${reservation.status}, NOW())
      `;
      console.log(`✓ Added reservation for ${reservation.name}`);
    }
    
    console.log('\nTest reservations added successfully!');
    console.log('You can now view them in the dashboard at: http://localhost:3000/dashboard');
    
  } catch (error) {
    console.error('Failed to add test reservations:', error);
    process.exit(1);
  }
}

addTestReservations();
