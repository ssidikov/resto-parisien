import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sendStatusUpdateNotification } from '@/lib/email'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body
    const params = await context.params
    const reservationId = params.id

    // Validate status
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }    // Update reservation status
    const result =
      await sql`UPDATE reservations SET status = ${status} WHERE id = ${reservationId} RETURNING *`

    if (result.length === 0) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    const updatedReservation = result[0];
    console.log('Reservation status updated:', updatedReservation);    // Send status update notification to customer
    if (status === 'confirmed' || status === 'cancelled') {
      try {
        console.log(`📧 Sending ${status} notification to customer...`);
        const emailSent = await sendStatusUpdateNotification({
          id: updatedReservation.id,
          name: updatedReservation.name,
          email: updatedReservation.email,
          phone: updatedReservation.phone,
          date: updatedReservation.date,
          time: updatedReservation.time,
          guests: updatedReservation.guests,
          special_requests: updatedReservation.special_requests,
          status: updatedReservation.status
        }, status);
        console.log(`📧 Status update email sent: ${emailSent}`);
        
        updatedReservation.statusEmailSent = emailSent;
      } catch (emailError) {
        console.error('📧 Failed to send status update email:', emailError);
        updatedReservation.statusEmailSent = false;
      }
    }

    return NextResponse.json(updatedReservation)
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
