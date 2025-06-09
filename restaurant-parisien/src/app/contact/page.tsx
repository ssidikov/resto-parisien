'use client'
import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

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
              </ul>
            </div>
          </div>

          {/* Reservation Form */}
          <div id="reservation" className="bg-white rounded-3xl shadow-lg p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-playfair font-semibold text-charcoal-900 mb-2">
                  Demande Envoyée !
                </h3>
                <p className="text-charcoal-600">
                  Nous vous recontacterons dans les plus brefs délais pour confirmer votre réservation.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-playfair font-bold text-charcoal-900 mb-6">
                  Réserver une Table
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-2" htmlFor="name">
                        Nom Complet *
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-2" htmlFor="email">
                        Email *
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-2" htmlFor="phone">
                        Téléphone *
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-2" htmlFor="guests">
                        Nombre de Personnes
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>
                        ))}
                        <option value="9+">9+ personnes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2" htmlFor="date">
                      Date Souhaitée *
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      type="datetime-local"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2" htmlFor="message">
                      Message (Allergies, Demandes Spéciales...)
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Mentionnez ici vos allergies, préférences alimentaires ou toute demande particulière..."
                    ></textarea>
                  </div>

                  <button
                    className="w-full bg-primary-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    type="submit"
                  >
                    <Send className="w-5 h-5" />
                    <span>Envoyer la Demande</span>
                  </button>

                  <p className="text-sm text-charcoal-500 text-center">
                    En soumettant ce formulaire, vous acceptez d'être recontacté par notre équipe pour confirmer votre réservation.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage