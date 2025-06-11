'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  User,
  Settings,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import ChangePasswordModal from '@/components/ChangePasswordModal'

interface Reservation {
  id: number
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  special_requests?: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/login')
      return
    }

    fetchReservations()
  }, [session, status, router])
  const fetchReservations = async () => {
    try {
      console.log('Fetching reservations from dashboard...')
      const response = await fetch('/api/reservations')
      console.log('Fetch response status:', response.status)
      console.log('Fetch response ok:', response.ok)

      if (response.ok) {
        const data = await response.json()
        console.log('Received reservations data:', data)
        setReservations(data)
      } else {
        console.error('Failed to fetch reservations:', response.status)
      }
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateReservationStatus = async (id: number, status: 'confirmed' | 'cancelled') => {
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchReservations()
      }
    } catch (error) {
      console.error('Error updating reservation:', error)
    }
  }

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === 'all') return true
    return reservation.status === filter
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className='w-5 h-5 text-green-500' />
      case 'cancelled':
        return <XCircle className='w-5 h-5 text-red-500' />
      default:
        return <AlertCircle className='w-5 h-5 text-yellow-500' />
    }
  }
  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée'
      case 'cancelled':
        return 'Annulée'
      default:
        return 'En attente'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <h1 className='text-2xl font-bold text-gray-900'>Le Moderne Restaurant</h1>
              <span className='ml-4 px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full'>
                Tableau de bord
              </span>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2 text-gray-700'>
                <User className='w-5 h-5' />
                <span>{session?.user?.name}</span>
              </div>
              <button
                onClick={() => setIsChangePasswordModalOpen(true)}
                className='flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'>
                <Settings className='w-5 h-5' />
                <span>Changer le mot de passe</span>
              </button>
              <button
                onClick={() => signOut()}
                className='flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'>
                <LogOut className='w-5 h-5' />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <Calendar className='h-8 w-8 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>Total réservations</p>
                <p className='text-2xl font-semibold text-gray-900'>{reservations.length}</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <AlertCircle className='h-8 w-8 text-yellow-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>En attente</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {reservations.filter((r) => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <CheckCircle className='h-8 w-8 text-green-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>Confirmées</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {reservations.filter((r) => r.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <XCircle className='h-8 w-8 text-red-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>Annulées</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {reservations.filter((r) => r.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className='bg-white rounded-lg shadow mb-6'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-medium text-gray-900'>Gestion des réservations</h2>
              <div className='flex gap-2'>
                <button
                  onClick={fetchReservations}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                  Actualiser les données
                </button>
                <button
                  onClick={() => {
                    console.log('Current reservations state:', reservations)
                    console.log('Loading state:', loading)
                    console.log('Session:', session)
                  }}
                  className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'>
                  Debug Info
                </button>
              </div>
            </div>
          </div>
          <div className='px-6 py-4'>
            <div className='flex space-x-4'>
              {[
                { key: 'all', label: 'Toutes' },
                { key: 'pending', label: 'En attente' },
                { key: 'confirmed', label: 'Confirmées' },
                { key: 'cancelled', label: 'Annulées' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === key
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Reservations List */}
        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>
              Liste des réservations ({filteredReservations.length})
            </h3>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Client
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Contacts
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Date et heure
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Convives
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Statut
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{reservation.name}</div>
                      {reservation.special_requests && (
                        <div className='text-sm text-gray-500'>
                          Demandes spéciales: {reservation.special_requests}
                        </div>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center text-sm text-gray-900 mb-1'>
                        <Phone className='w-4 h-4 mr-2 text-gray-400' />
                        {reservation.phone}
                      </div>
                      <div className='flex items-center text-sm text-gray-500'>
                        <Mail className='w-4 h-4 mr-2 text-gray-400' />
                        {reservation.email}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center text-sm text-gray-900 mb-1'>
                        <Calendar className='w-4 h-4 mr-2 text-gray-400' />
                        {new Date(reservation.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className='flex items-center text-sm text-gray-500'>
                        <Clock className='w-4 h-4 mr-2 text-gray-400' />
                        {reservation.time}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center text-sm text-gray-900'>
                        <Users className='w-4 h-4 mr-2 text-gray-400' />
                        {reservation.guests}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          reservation.status
                        )}`}>
                        {getStatusIcon(reservation.status)}
                        <span className='ml-1'>{getStatusText(reservation.status)}</span>
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      {reservation.status === 'pending' && (
                        <div className='flex justify-end space-x-2'>
                          <button
                            onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                            className='text-green-600 hover:text-green-900 px-3 py-1 rounded bg-green-50 hover:bg-green-100 transition-colors'>
                            Confirmer
                          </button>
                          <button
                            onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                            className='text-red-600 hover:text-red-900 px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors'>
                            Annuler
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredReservations.length === 0 && (
              <div className='text-center py-12'>
                <Calendar className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900'>Aucune réservation</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {filter === 'all'
                    ? 'Aucune réservation pour le moment.'
                    : `Aucune réservation avec le statut "${getStatusText(filter)}".`}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Success Message */}
      {successMessage && (
        <div className='fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'>
          <div className='flex items-center space-x-2'>
            <CheckCircle className='w-5 h-5' />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onSuccess={() => {
          setSuccessMessage('Mot de passe modifié avec succès')
          setTimeout(() => setSuccessMessage(''), 3000)
        }}
      />
    </div>
  )
}
