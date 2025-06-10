import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.log('Unauthorized access attempt to reservations');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching reservations for authenticated user:', session.user?.name);
    const reservations = await sql`SELECT * FROM reservations ORDER BY created_at DESC`;
    console.log('Found reservations:', reservations.length);

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received reservation data:', body);
    
    const { name, email, phone, date, time, guests, special_requests } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
      console.log('Missing required fields:', { name, email, phone, date, time, guests });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert reservation into database
    console.log('Inserting reservation into database...');
    const result = await sql`
      INSERT INTO reservations (name, email, phone, date, time, guests, special_requests, status, created_at) 
      VALUES (${name}, ${email}, ${phone}, ${date}, ${time}, ${guests}, ${special_requests || null}, 'pending', NOW()) 
      RETURNING *
    `;
    
    console.log('Reservation created successfully:', result[0]);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
