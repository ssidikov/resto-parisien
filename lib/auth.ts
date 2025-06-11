import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
  
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        console.log('🔍 Attempting to authenticate:', credentials.username);

        try {
          // Check if we're in development mode with test credentials
          if (process.env.NODE_ENV === 'development' && credentials.username === 'admin' && credentials.password === 'admin123') {
            console.log('🔧 Using development test credentials');
            return {
              id: '1',
              name: 'admin',
              email: 'admin@lemoderne.fr',
            };
          }

          const users = await sql`SELECT * FROM admins WHERE username = ${credentials.username}`;
          console.log('📊 Found users in DB:', users.length);

          if (users.length === 0) {
            console.log('❌ No user found with username:', credentials.username);
            return null;
          }

          const user = users[0];
          console.log('👤 User found:', { id: user.id, username: user.username, email: user.email });
          
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log('🔐 Password validation result:', isPasswordValid);

          if (!isPasswordValid) {
            console.log('❌ Invalid password for user:', credentials.username);
            return null;
          }

          console.log('✅ Authentication successful for:', user.username);
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error('💥 Auth error:', error);
          
          // In development, provide a fallback
          if (process.env.NODE_ENV === 'development') {
            console.log('🔧 Database error in development, using fallback for admin/admin123');
            if (credentials.username === 'admin' && credentials.password === 'admin123') {
              return {
                id: '1',
                name: 'admin',
                email: 'admin@lemoderne.fr',
              };
            }
          }
          
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
