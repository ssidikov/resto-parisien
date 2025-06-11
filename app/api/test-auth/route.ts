import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ 
      status: 'ok',
      message: 'NextAuth API route is working',
      timestamp: new Date().toISOString(),
      env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV,
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'NextAuth API route failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
