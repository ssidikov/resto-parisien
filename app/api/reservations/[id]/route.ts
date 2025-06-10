import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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
    }

    // Update reservation status
    const result =
      await sql`UPDATE reservations SET status = ${status} WHERE id = ${reservationId} RETURNING *`

    if (result.length === 0) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
