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
      },      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null;
        }

        console.log('🔍 Attempting to authenticate:', credentials.username);

        try {
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
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
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
};
