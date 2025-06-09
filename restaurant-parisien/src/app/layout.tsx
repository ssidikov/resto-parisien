import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Le Moderne - Restaurant Parisien Contemporain',
  description: 'Découvrez Le Moderne, restaurant parisien alliant tradition française et créativité contemporaine. Une expérience culinaire unique au cœur de Paris.',
  keywords: 'restaurant, Paris, cuisine française, gastronomie, moderne, contemporain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}