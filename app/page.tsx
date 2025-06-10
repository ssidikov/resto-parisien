import Hero from '../components/Hero'
import { Clock, MapPin, Phone } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Le Moderne, restaurant parisien contemporain depuis 2018. Découvrez notre cuisine française innovante au cœur de Paris, Rue de Rivoli.',
  openGraph: {
    title: 'Le Moderne - Restaurant Parisien Contemporain',
    description:
      'Expérience culinaire unique alliant tradition française et innovation contemporaine',
  },
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* À Propos Section */}
      <section className='py-20 px-4 bg-cream'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl font-playfair font-bold text-charcoal-900 mb-6'>
                L'Art de la <span className='gold-gradient'>Gastronomie Moderne</span>
              </h2>
              <p className='text-lg text-charcoal-700 mb-6 leading-relaxed'>
                Depuis 2018, Le Moderne redéfinit l'expérience culinaire parisienne en mariant avec
                audace les traditions françaises et les innovations contemporaines.
              </p>
              <p className='text-lg text-charcoal-700 mb-8 leading-relaxed'>
                Notre chef étoilé transforme chaque plat en œuvre d'art, utilisant exclusivement des
                produits de saison sélectionnés auprès de producteurs locaux.
              </p>
              <a
                href='/menu'
                className='inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors duration-300'>
                Découvrir notre Carte
              </a>
            </div>
            <div className='relative'>
              <div className='bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8 shadow-xl'>
                <div className='text-center'>
                  <h3 className='text-2xl font-playfair font-semibold text-charcoal-900 mb-4'>
                    Nos Valeurs
                  </h3>
                  <div className='space-y-4'>
                    <div className='flex items-center'>
                      <div className='w-3 h-3 bg-gold rounded-full mr-3'></div>
                      <span className='text-charcoal-800'>Excellence culinaire</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='w-3 h-3 bg-gold rounded-full mr-3'></div>
                      <span className='text-charcoal-800'>Produits locaux & bio</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='w-3 h-3 bg-gold rounded-full mr-3'></div>
                      <span className='text-charcoal-800'>Service personnalisé</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='w-3 h-3 bg-gold rounded-full mr-3'></div>
                      <span className='text-charcoal-800'>Ambiance raffinée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informations Pratiques */}
      <section className='py-16 px-4 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-playfair font-bold text-center text-charcoal-900 mb-12'>
            Informations Pratiques
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4'>
                <Clock className='w-8 h-8 text-primary-600' />
              </div>
              <h3 className='text-xl font-playfair font-semibold text-charcoal-900 mb-2'>
                Horaires
              </h3>
              <p className='text-charcoal-600'>
                Mardi - Samedi
                <br />
                12h00 - 14h30
                <br />
                19h00 - 22h30
              </p>
            </div>
            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4'>
                <MapPin className='w-8 h-8 text-primary-600' />
              </div>
              <h3 className='text-xl font-playfair font-semibold text-charcoal-900 mb-2'>
                Adresse
              </h3>
              <p className='text-charcoal-600'>
                45 Rue de Rivoli
                <br />
                75001 Paris
                <br />
                Métro: Châtelet
              </p>
            </div>
            <div className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4'>
                <Phone className='w-8 h-8 text-primary-600' />
              </div>
              <h3 className='text-xl font-playfair font-semibold text-charcoal-900 mb-2'>
                Réservation
              </h3>
              <p className='text-charcoal-600'>
                +33 1 42 86 91 45
                <br />
                contact@lemoderne.fr
                <br />
                <span className='text-primary-600'>Réservation conseillée</span>
              </p>
            </div>          </div>
        </div>
      </section>

      {/* Call to Action - Réservation */}
      <section className='py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-700'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-playfair font-bold text-white mb-6'>
            Réservez votre Table d'Exception
          </h2>
          <p className='text-xl text-primary-100 mb-8 max-w-2xl mx-auto'>
            Vivez une expérience culinaire inoubliable dans notre écrin parisien. 
            Nos équipes vous accueillent dans un cadre raffiné pour un moment d'exception.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='/reservation'
              className='bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors duration-300 shadow-lg'>
              Réserver en ligne
            </a>
            <a
              href='tel:+33142869145'
              className='border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors duration-300'>
              Appeler le restaurant
            </a>
          </div>
          <p className='text-primary-200 mt-6 text-sm'>
            Service du mardi au samedi • 12h00 - 14h30 & 19h00 - 22h30
          </p>
        </div>
      </section>
    </>
  )
}
