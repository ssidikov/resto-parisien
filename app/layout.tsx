import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NextAuthProvider from '../components/NextAuthProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Le Moderne - Restaurant Parisien Contemporain',
    template: '%s | Le Moderne',
  },
  description:
    'Découvrez Le Moderne, restaurant parisien alliant tradition française et créativité contemporaine. Une expérience culinaire unique au cœur de Paris.',
  keywords: ['restaurant', 'Paris', 'cuisine française', 'gastronomie', 'moderne', 'contemporain'],
  authors: [{ name: 'Le Moderne' }],
  creator: 'Le Moderne',
  openGraph: {
    title: 'Le Moderne - Restaurant Parisien Contemporain',
    description: 'Une expérience culinaire unique au cœur de Paris',
    url: 'https://lemoderne.fr',
    siteName: 'Le Moderne',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fr' className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
