import React from 'react'
import { Star, Award } from 'lucide-react'

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-cream to-primary-100"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gold opacity-10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Awards */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <div className="flex items-center space-x-2 text-gold">
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm font-medium text-charcoal-600">Guide Michelin</span>
          </div>
          <div className="flex items-center space-x-2 text-gold">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium text-charcoal-600">Prix Gault & Millau</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-playfair font-bold mb-6">
          <span className="text-charcoal-900">Le</span>{' '}
          <span className="gold-gradient">Moderne</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-charcoal-700 mb-4 font-light">
          L'Excellence Culinaire Parisienne
        </p>
        
        {/* Description */}
        <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Une symphonie de saveurs où l'art culinaire français rencontre l'innovation contemporaine. 
          Découvrez une expérience gastronomique inoubliable au cœur de Paris.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/menu"
            className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Découvrir la Carte
          </a>
          <a 
            href="/contact#reservation"
            className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300"
          >
            Réserver une Table
          </a>
        </div>

        {/* Restaurant Info */}
        <div className="mt-12 text-center text-charcoal-600">
          <p className="text-sm">
            45 Rue de Rivoli, 75001 Paris • Ouvert du Mardi au Samedi
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero