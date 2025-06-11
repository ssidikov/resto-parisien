'use client'
import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const ContactPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-charcoal-900 mb-6">
            Nous <span className="gold-gradient">Contacter</span>
          </h1>
          <p className="text-xl text-charcoal-700 mb-8 max-w-2xl mx-auto">
            Réservez votre table ou contactez-nous pour toute demande particulière. 
            Notre équipe se fera un plaisir de vous accueillir.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-charcoal-900 mb-8">
                Informations & Réservations
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-1">Adresse</h3>
                    <p className="text-charcoal-600">
                      45 Rue de Rivoli<br />
                      75001 Paris, France<br />
                      <span className="text-primary-600">Métro: Châtelet (Lignes 1, 4, 7, 11, 14)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-1">Téléphone</h3>
                    <p className="text-charcoal-600">
                      <a href="tel:+33142869145" className="hover:text-primary-600 transition-colors">
                        +33 1 42 86 91 45
                      </a><br />
                      <span className="text-sm text-charcoal-500">Réservations: 10h - 18h</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-1">Email</h3>
                    <p className="text-charcoal-600">
                      <a href="mailto:contact@lemoderne.fr" className="hover:text-primary-600 transition-colors">
                        contact@lemoderne.fr
                      </a><br />
                      <a href="mailto:reservation@lemoderne.fr" className="hover:text-primary-600 transition-colors">
                        reservation@lemoderne.fr
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-1">Horaires</h3>
                    <div className="text-charcoal-600 space-y-1">
                      <p><span className="font-medium">Mardi - Vendredi:</span> 12h00 - 14h30 • 19h00 - 22h30</p>
                      <p><span className="font-medium">Samedi:</span> 19h00 - 22h30</p>
                      <p><span className="font-medium">Dimanche - Lundi:</span> <span className="text-red-500">Fermé</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-primary-50 rounded-2xl p-6">
              <h3 className="text-xl font-playfair font-semibold text-charcoal-900 mb-4">
                Informations Importantes
              </h3>
              <ul className="space-y-2 text-charcoal-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Réservation fortement conseillée
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Menu dégustation sur réservation 48h à l'avance
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Possibilité de privatisation pour groupes (20+ pers.)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Menus végétariens et sans gluten disponibles
                </li>
              </ul>            </div>
          </div>

          {/* Reservation Link */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-6">
              Réserver une Table
            </h2>
            <p className="text-charcoal-600 mb-8">
              Utilisez notre système de réservation en ligne pour réserver votre table facilement et rapidement.
            </p>
            <a
              href="/reservation"
              className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >            <span>Réserver Maintenant</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage