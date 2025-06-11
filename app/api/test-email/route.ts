import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { testEmailConfiguration, sendAdminNotification } from '@/lib/email';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🧪 Testing email configuration...');
    const isConfigured = await testEmailConfiguration();

    return NextResponse.json({
      emailConfigured: isConfigured,
      emailService: process.env.EMAIL_SERVICE || 'gmail',
      emailUser: process.env.EMAIL_USER ? '***@***' : 'Not configured',
      emailTo: process.env.EMAIL_TO || 'Not configured',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error testing email configuration:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🧪 Sending test email notification...');
    
    const testReservation = {
      id: 999999,
      name: 'Test Utilisateur',
      email: 'test@example.com',
      phone: '+33 1 23 45 67 89',
      date: new Date().toISOString().split('T')[0],
      time: '19:30',
      guests: 2,
      special_requests: 'Ceci est un email de test pour vérifier la configuration.',
      status: 'pending'
    };

    const emailSent = await sendAdminNotification(testReservation);

    return NextResponse.json({
      testEmailSent: emailSent,
      testReservation,
      timestamp: new Date().toISOString(),
      message: emailSent 
        ? 'Email de test envoyé avec succès!' 
        : 'Échec de l\'envoi de l\'email de test. Vérifiez la configuration.'
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
