'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, Phone, Mail, MessageSquare } from 'lucide-react'

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    special_requests: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Submitting reservation form with data:', formData)

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (response.ok) {
        const responseData = await response.json()
        console.log('Reservation created successfully:', responseData)
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          special_requests: '',
        })
      } else {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        setError(errorData.error || 'Une erreur est survenue lors de la réservation')
      }
    } catch (error) {
      console.error('Network error:', error)
      setError("Une erreur est survenue lors de l'envoi de la demande")
    } finally {
      setLoading(false)
    }
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  if (success) {
    return (
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-gray-900 mb-2'>Demande Envoyée !</h3>
          <p className='text-gray-600 mb-6'>
            Nous vous recontacterons dans les plus brefs délais pour confirmer votre réservation.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className='bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors'>
            Nouvelle réservation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Réserver une Table</h2>
        <p className='text-gray-600'>
          Remplissez le formulaire ci-dessous et nous vous confirmerons votre réservation
        </p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
              Nom *
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              value={formData.name}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
              placeholder='Votre nom'
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email *
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='email'
                id='email'
                name='email'
                required
                value={formData.email}
                onChange={handleChange}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                placeholder='your@email.com'
              />
            </div>
          </div>
          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
              Téléphone *
            </label>
            <div className='relative'>
              <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='tel'
                id='phone'
                name='phone'
                required
                value={formData.phone}
                onChange={handleChange}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                placeholder='+33 1 23 45 67 89'
              />
            </div>
          </div>
          <div>
            <label htmlFor='guests' className='block text-sm font-medium text-gray-700 mb-2'>
              Nombre de personnes *
            </label>
            <div className='relative'>
              <Users className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <select
                id='guests'
                name='guests'
                required
                value={formData.guests}
                onChange={handleChange}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'personne' : 'personnes'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor='date' className='block text-sm font-medium text-gray-700 mb-2'>
              Date *
            </label>
            <div className='relative'>
              <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='date'
                id='date'
                name='date'
                required
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
              />
            </div>
          </div>
          <div>
            <label htmlFor='time' className='block text-sm font-medium text-gray-700 mb-2'>
              Heure *
            </label>
            <div className='relative'>
              <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <select
                id='time'
                name='time'
                required
                value={formData.time}
                onChange={handleChange}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none'>
                <option value=''>Choisissez l'heure</option>
                <option value='12:00'>12:00</option>
                <option value='12:30'>12:30</option>
                <option value='13:00'>13:00</option>
                <option value='13:30'>13:30</option>
                <option value='14:00'>14:00</option>
                <option value='14:30'>14:30</option>
                <option value='19:00'>19:00</option>
                <option value='19:30'>19:30</option>
                <option value='20:00'>20:00</option>
                <option value='20:30'>20:30</option>
                <option value='21:00'>21:00</option>
                <option value='21:30'>21:30</option>
                <option value='22:00'>22:00</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor='special_requests'
            className='block text-sm font-medium text-gray-700 mb-2'>
            Demandes particulières
          </label>
          <div className='relative'>
            <MessageSquare className='absolute left-3 top-4 text-gray-400 w-5 h-5' />
            <textarea
              id='special_requests'
              name='special_requests'
              rows={4}
              value={formData.special_requests}
              onChange={handleChange}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none'
              placeholder='Allergies, régimes alimentaires particuliers, événement spécial à célébrer...'
            />
          </div>
        </div>
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>{error}</div>
        )}
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
          {loading ? 'Envoi en cours...' : 'Réserver une table'}
        </button>
      </form>
      <p className='text-sm text-gray-500 text-center mt-6'>
        * Champs obligatoires. Nous vous contacterons dans les 24 heures pour confirmer votre
        réservation.
      </p>
    </div>
  )
}
