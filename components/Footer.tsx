import React from 'react'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className='bg-charcoal-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Logo & Description */}
          <div className='lg:col-span-1'>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='text-2xl font-playfair font-bold'>
                <span className='text-white'>Le</span>
                <span className='gold-gradient'>Moderne</span>
              </div>
            </div>
            <p className='text-charcoal-300 mb-6 leading-relaxed'>
              Une expérience gastronomique d'exception au cœur de Paris, où tradition française et
              innovation contemporaine se rencontrent.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200'>
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200'>
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200'>
                <Twitter className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-playfair font-semibold mb-4'>Contact</h3>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <MapPin className='w-5 h-5 text-primary-400 mt-1 flex-shrink-0' />
                <div className='text-charcoal-300'>
                  <p>45 Rue de Rivoli</p>
                  <p>75001 Paris, France</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='w-5 h-5 text-primary-400 flex-shrink-0' />
                <a
                  href='tel:+33142869145'
                  className='text-charcoal-300 hover:text-white transition-colors'>
                  +33 1 42 86 91 45
                </a>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='w-5 h-5 text-primary-400 flex-shrink-0' />
                <a
                  href='mailto:contact@lemoderne.fr'
                  className='text-charcoal-300 hover:text-white transition-colors'>
                  contact@lemoderne.fr
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className='text-lg font-playfair font-semibold mb-4'>Horaires</h3>
            <div className='space-y-2 text-charcoal-300'>
              <div className='flex items-center space-x-2'>
                <Clock className='w-4 h-4 text-primary-400' />
                <span className='text-sm'>Service continu</span>
              </div>
              <div>
                <p className='font-medium'>Mardi - Vendredi</p>
                <p className='text-sm'>12h00 - 14h30 • 19h00 - 22h30</p>
              </div>
              <div>
                <p className='font-medium'>Samedi</p>
                <p className='text-sm'>19h00 - 22h30</p>
              </div>
              <div>
                <p className='font-medium text-red-400'>Dimanche - Lundi</p>
                <p className='text-sm'>Fermé</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className='text-lg font-playfair font-semibold mb-4'>Liens Utiles</h3>
            <div className='space-y-2'>
              <a href='/' className='block text-charcoal-300 hover:text-white transition-colors'>
                Accueil
              </a>
              <a
                href='/menu'
                className='block text-charcoal-300 hover:text-white transition-colors'>
                Notre Carte
              </a>
              <a
                href='/contact'
                className='block text-charcoal-300 hover:text-white transition-colors'>
                Réservations
              </a>
              <a
                href='tel:+33142869145'
                className='block text-primary-400 hover:text-primary-300 transition-colors font-medium'>
                Réserver maintenant
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-charcoal-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex flex-col items-center md:items-start'>
              <p className='text-charcoal-400 text-sm mb-2'>
                © {new Date().getFullYear()} Le Moderne. Tous droits réservés.
              </p>
              <p className='text-charcoal-500 text-xs'>
                Site réalisé par
                <a
                  href='https://sidikoff.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary-400 hover:text-primary-300 transition-colors font-medium ml-1'>
                  Agence web SIDIKOFF DIGITAL
                </a>
              </p>
            </div>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <a href='#' className='text-charcoal-400 hover:text-white text-sm transition-colors'>
                Mentions Légales
              </a>
              <a href='#' className='text-charcoal-400 hover:text-white text-sm transition-colors'>
                Politique de Confidentialité
              </a>
              <a href='#' className='text-charcoal-400 hover:text-white text-sm transition-colors'>
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
