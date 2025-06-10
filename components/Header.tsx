'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='glass-effect sticky top-0 z-50 border-b border-primary-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='text-3xl font-playfair font-bold'>
                <span className='text-charcoal-900'>Le</span>{' '}
                <span className='gold-gradient'>Moderne</span>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-charcoal-700 hover:text-primary-600 font-medium transition-colors duration-200'>
              Accueil
            </Link>
            <Link
              href='/menu'
              className='text-charcoal-700 hover:text-primary-600 font-medium transition-colors duration-200'>
              Notre Carte
            </Link>
            <Link
              href='/contact'
              className='text-charcoal-700 hover:text-primary-600 font-medium transition-colors duration-200'>
              Contact
            </Link>
            <Link
              href='/reservation'
              className='bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors duration-200'>
              Réserver
            </Link>
          </nav>

          {/* Menu Mobile Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-charcoal-700 hover:text-primary-600 transition-colors duration-200'>
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-primary-100'>
            <div className='flex flex-col space-y-4'>
              <Link
                href='/'
                className='text-charcoal-700 hover:text-primary-600 font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
              <Link
                href='/menu'
                className='text-charcoal-700 hover:text-primary-600 font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}>
                Notre Carte
              </Link>
              <Link
                href='/contact'
                className='text-charcoal-700 hover:text-primary-600 font-medium transition-colors duration-200'
                onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link
                href='/reservation'
                className='bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors duration-200 text-center'
                onClick={() => setIsMenuOpen(false)}>
                Réserver
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
