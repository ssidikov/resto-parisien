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
  RefreshCw,
  Filter,
  Search,
  Download,
  Eye,
  EyeOff,
  Menu,
  Bell,
  TrendingUp,
  Plus,
  MoreVertical,
  Edit,
  Sun,
  Moon,
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
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedReservations, setSelectedReservations] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/login')
      return
    }

    fetchReservations()
  }, [session, status, router])

  // Load dark mode preference on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true')
    }
  }, [])

  const fetchReservations = async () => {
    try {
      setIsRefreshing(true)
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
      setIsRefreshing(false)
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
        setSuccessMessage('Statut de la réservation mis à jour avec succès')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error updating reservation:', error)
    }
  }

  const filteredReservations = reservations.filter((reservation) => {
    const matchesFilter = filter === 'all' || reservation.status === filter
    const matchesSearch =
      searchTerm === '' ||
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm)
    return matchesFilter && matchesSearch
  })

  const toggleReservationSelection = (id: number) => {
    setSelectedReservations((prev) =>
      prev.includes(id) ? prev.filter((resId) => resId !== id) : [...prev, id]
    )
  }

  const handleBulkStatusUpdate = async (status: 'confirmed' | 'cancelled') => {
    if (selectedReservations.length === 0) return

    try {
      await Promise.all(selectedReservations.map((id) => updateReservationStatus(id, status)))
      setSelectedReservations([])
    } catch (error) {
      console.error('Error updating reservations:', error)
    }
  }

  const exportToCSV = () => {
    setIsExporting(true)

    const csvData = filteredReservations.map((reservation) => ({
      Nom: reservation.name,
      Email: reservation.email,
      Téléphone: reservation.phone,
      Date: new Date(reservation.date).toLocaleDateString('fr-FR'),
      Heure: reservation.time,
      Convives: reservation.guests,
      Statut: getStatusText(reservation.status),
      'Demandes spéciales': reservation.special_requests || '',
      'Date de création': new Date(reservation.created_at).toLocaleDateString('fr-FR'),
    }))

    const csvContent = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `reservations-${new Date().toISOString().split('T')[0]}.csv`
    link.click()

    setTimeout(() => setIsExporting(false), 1000)
    setSuccessMessage('Données exportées avec succès')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('darkMode', (!isDarkMode).toString())
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className='w-4 h-4 text-green-500' />
      case 'cancelled':
        return <XCircle className='w-4 h-4 text-red-500' />
      default:
        return <AlertCircle className='w-4 h-4 text-yellow-500' />
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

  const getStatusColor = (status: string, isDark = false) => {
    if (isDark) {
      switch (status) {
        case 'confirmed':
          return 'bg-green-900/50 text-green-300 border-green-700'
        case 'cancelled':
          return 'bg-red-900/50 text-red-300 border-red-700'
        default:
          return 'bg-yellow-900/50 text-yellow-300 border-yellow-700'
      }
    } else {
      switch (status) {
        case 'confirmed':
          return 'bg-green-100 text-green-800 border-green-200'
        case 'cancelled':
          return 'bg-red-100 text-red-800 border-red-200'
        default:
          return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      }
    }
  }

  const statsData = [
    {
      title: 'Total Réservations',
      value: reservations.length,
      icon: Calendar,
      color: 'blue',
      change: '+12%',
      isIncrease: true,
    },
    {
      title: 'En Attente',
      value: reservations.filter((r) => r.status === 'pending').length,
      icon: AlertCircle,
      color: 'yellow',
      change: '-5%',
      isIncrease: false,
    },
    {
      title: 'Confirmées',
      value: reservations.filter((r) => r.status === 'confirmed').length,
      icon: CheckCircle,
      color: 'green',
      change: '+8%',
      isIncrease: true,
    },
    {
      title: 'Annulées',
      value: reservations.filter((r) => r.status === 'cancelled').length,
      icon: XCircle,
      color: 'red',
      change: '0%',
      isIncrease: null,
    },
  ]

  if (status === 'loading' || loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
        }`}>
        <div className='text-center'>
          <div className='relative mb-8'>
            <div
              className={`animate-spin rounded-full h-20 w-20 border-4 mx-auto ${
                isDarkMode ? 'border-gray-600' : 'border-amber-200'
              }`}></div>
            <div
              className={`animate-pulse absolute inset-0 rounded-full h-20 w-20 border-4 border-t-transparent mx-auto ${
                isDarkMode ? 'border-yellow-400' : 'border-amber-600'
              }`}></div>
          </div>
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-yellow-400' : 'text-amber-700'
            }`}>
            Le Moderne
          </h2>
          <p
            className={`text-lg font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-amber-600'
            }`}>
            Chargement du tableau de bord...
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-amber-500'}`}>
            Préparation de vos données
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
      }`}>
      {/* Modern Header */}
      <header
        className={`backdrop-blur-xl shadow-lg border-b sticky top-0 z-40 transition-all duration-300 ${
          isDarkMode ? 'bg-gray-900/90 border-gray-700/50' : 'bg-white/90 border-amber-200/50'
        }`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 md:h-20'>
            {/* Logo and Title */}
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-3'>
                <div className='hidden md:block'>
                  <h1
                    className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                      isDarkMode ? 'from-yellow-400 to-orange-400' : 'from-amber-600 to-orange-600'
                    }`}>
                    Le Moderne
                  </h1>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-amber-600'
                    }`}>
                    Tableau de bord administrateur
                  </p>
                </div>
                <div className='md:hidden'>
                  <h1
                    className={`text-xl font-bold ${
                      isDarkMode ? 'text-yellow-400' : 'text-amber-600'
                    }`}>
                    Le Moderne
                  </h1>
                </div>
              </div>
            </div>

            {/* Right side - User Menu */}
            <div className='flex items-center space-x-2 md:space-x-4'>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? 'text-yellow-400 hover:bg-gray-800'
                    : 'text-amber-600 hover:bg-amber-100'
                }`}
                title={isDarkMode ? 'Mode clair' : 'Mode sombre'}>
                {isDarkMode ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
              </button>

              {/* Export Button */}
              <button
                onClick={exportToCSV}
                disabled={isExporting || filteredReservations.length === 0}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                title='Exporter les données'>
                {isExporting ? (
                  <RefreshCw className='w-4 h-4 animate-spin' />
                ) : (
                  <Download className='w-4 h-4' />
                )}
                <span className='hidden md:inline'>{isExporting ? 'Export...' : 'Exporter'}</span>
              </button>

              {/* Notifications */}
              <button
                className={`relative p-2 rounded-full transition-all duration-200 ${
                  isDarkMode
                    ? 'text-yellow-400 hover:bg-gray-800'
                    : 'text-amber-600 hover:bg-amber-100'
                }`}>
                <Bell className='w-5 h-5' />
                {reservations.filter((r) => r.status === 'pending').length > 0 && (
                  <span className='absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse'>
                    {reservations.filter((r) => r.status === 'pending').length}
                  </span>
                )}
              </button>

              {/* User Profile Section */}
              <div
                className={`flex items-center space-x-3 rounded-full px-4 py-2 transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-gray-800 to-gray-700'
                    : 'bg-gradient-to-r from-amber-100 to-orange-100'
                }`}>
                <div className='hidden md:block text-right'>
                  <p
                    className={`text-sm font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {session?.user?.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-amber-600'}`}>
                    Administrateur
                  </p>
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => setIsChangePasswordModalOpen(true)}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-105 ${
                      isDarkMode
                        ? 'text-yellow-400 hover:bg-gray-700'
                        : 'text-amber-600 hover:bg-white/50'
                    }`}
                    title='Paramètres du compte'>
                    <Settings className='w-5 h-5' />
                  </button>
                  <button
                    onClick={() => signOut()}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-105 ${
                      isDarkMode
                        ? 'text-red-400 hover:bg-red-900/30'
                        : 'text-red-600 hover:bg-red-100'
                    }`}
                    title='Se déconnecter'>
                    <LogOut className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8'>
        {/* Statistics Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`backdrop-blur-sm rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/20'
              }`}>
              <div className='flex items-center justify-between'>
                <div className='flex-1'>
                  <p
                    className={`text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {stat.title}
                  </p>
                  <p
                    className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  {stat.change && (
                    <div
                      className={`flex items-center mt-2 text-sm ${
                        stat.isIncrease === true
                          ? isDarkMode
                            ? 'text-green-400'
                            : 'text-green-600'
                          : stat.isIncrease === false
                          ? isDarkMode
                            ? 'text-red-400'
                            : 'text-red-600'
                          : isDarkMode
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      }`}>
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${stat.isIncrease === false ? 'rotate-180' : ''}`}
                      />
                      <span>{stat.change}</span>
                    </div>
                  )}
                </div>
                <div
                  className={`p-3 rounded-full ${
                    stat.color === 'blue'
                      ? isDarkMode
                        ? 'bg-blue-900/50 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                      : stat.color === 'yellow'
                      ? isDarkMode
                        ? 'bg-yellow-900/50 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-600'
                      : stat.color === 'green'
                      ? isDarkMode
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-green-100 text-green-600'
                      : isDarkMode
                      ? 'bg-red-900/50 text-red-400'
                      : 'bg-red-100 text-red-600'
                  }`}>
                  <stat.icon className='w-6 h-6' />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls and Filters */}
        <div
          className={`backdrop-blur-sm rounded-2xl shadow-lg border mb-6 ${
            isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/20'
          }`}>
          {/* Header */}
          <div
            className={`px-6 py-4 border-b ${
              isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
            }`}>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Gestion des Réservations
                </h2>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {filteredReservations.length} réservation
                  {filteredReservations.length !== 1 ? 's' : ''} trouvée
                  {filteredReservations.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <button
                  onClick={fetchReservations}
                  disabled={isRefreshing}
                  className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg ${
                    isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}>
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className='hidden md:inline'>Actualiser</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/50'}`}>
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Search */}
              <div className='flex-1'>
                <div className='relative'>
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type='text'
                    placeholder='Rechercher par nom, email ou téléphone...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className='flex flex-wrap gap-2'>
                {[
                  { key: 'all', label: 'Toutes', count: reservations.length },
                  {
                    key: 'pending',
                    label: 'En attente',
                    count: reservations.filter((r) => r.status === 'pending').length,
                  },
                  {
                    key: 'confirmed',
                    label: 'Confirmées',
                    count: reservations.filter((r) => r.status === 'confirmed').length,
                  },
                  {
                    key: 'cancelled',
                    label: 'Annulées',
                    count: reservations.filter((r) => r.status === 'cancelled').length,
                  },
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key as any)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                      filter === key
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}>
                    <span>{label}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        filter === key
                          ? 'bg-white/20'
                          : isDarkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedReservations.length > 0 && (
              <div
                className={`mt-4 p-4 rounded-lg border ${
                  isDarkMode ? 'bg-blue-900/30 border-blue-700/50' : 'bg-blue-50 border-blue-200'
                }`}>
                <div className='flex items-center justify-between'>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-900'
                    }`}>
                    {selectedReservations.length} réservation
                    {selectedReservations.length !== 1 ? 's' : ''} sélectionnée
                    {selectedReservations.length !== 1 ? 's' : ''}
                  </span>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleBulkStatusUpdate('confirmed')}
                      className='px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors'>
                      Confirmer
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate('cancelled')}
                      className='px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors'>
                      Annuler
                    </button>
                    <button
                      onClick={() => setSelectedReservations([])}
                      className='px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors'>
                      Désélectionner
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reservations List/Cards */}
        <div
          className={`backdrop-blur-sm rounded-2xl shadow-lg border overflow-hidden ${
            isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-white/20'
          }`}>
          {/* Mobile Card View */}
          <div className='md:hidden'>
            {filteredReservations.length === 0 ? (
              <div className='text-center py-12 px-6'>
                <Calendar
                  className={`mx-auto h-16 w-16 mb-4 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
                <h3
                  className={`text-lg font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  Aucune réservation trouvée
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {filter === 'all'
                    ? 'Aucune réservation pour le moment.'
                    : `Aucune réservation avec le statut "${getStatusText(filter)}".`}
                </p>
              </div>
            ) : (
              <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className={`p-6 transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/50'
                    }`}>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <h3
                          className={`text-lg font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                          {reservation.name}
                        </h3>
                        <div className='flex items-center mt-1'>
                          {getStatusIcon(reservation.status)}
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              reservation.status,
                              isDarkMode
                            )}`}>
                            {getStatusText(reservation.status)}
                          </span>
                        </div>
                      </div>
                      <input
                        type='checkbox'
                        checked={selectedReservations.includes(reservation.id)}
                        onChange={() => toggleReservationSelection(reservation.id)}
                        className='h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded'
                      />
                    </div>

                    <div
                      className={`space-y-2 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      <div className='flex items-center'>
                        <Calendar
                          className={`w-4 h-4 mr-2 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        />
                        <span>
                          {new Date(reservation.date).toLocaleDateString('fr-FR')} à{' '}
                          {reservation.time}
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <Users
                          className={`w-4 h-4 mr-2 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        />
                        <span>
                          {reservation.guests} personne{reservation.guests !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <Phone
                          className={`w-4 h-4 mr-2 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        />
                        <span>{reservation.phone}</span>
                      </div>
                      <div className='flex items-center'>
                        <Mail
                          className={`w-4 h-4 mr-2 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        />
                        <span>{reservation.email}</span>
                      </div>
                      {reservation.special_requests && (
                        <div
                          className={`mt-3 p-3 rounded-lg border-l-4 ${
                            isDarkMode
                              ? 'bg-yellow-900/30 border-yellow-600'
                              : 'bg-yellow-50 border-yellow-400'
                          }`}>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
                            }`}>
                            <strong>Demandes spéciales:</strong> {reservation.special_requests}
                          </p>
                        </div>
                      )}
                    </div>

                    {reservation.status === 'pending' && (
                      <div className='flex space-x-2 mt-4'>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className='flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors'>
                          Confirmer
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          className='flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors'>
                          Annuler
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className='hidden md:block overflow-x-auto'>
            {filteredReservations.length === 0 ? (
              <div className='text-center py-12'>
                <Calendar
                  className={`mx-auto h-16 w-16 mb-4 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
                <h3
                  className={`text-lg font-medium mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  Aucune réservation trouvée
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {filter === 'all'
                    ? 'Aucune réservation pour le moment.'
                    : `Aucune réservation avec le statut "${getStatusText(filter)}".`}
                </p>
              </div>
            ) : (
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className={isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'}>
                  <tr>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      <input
                        type='checkbox'
                        checked={
                          selectedReservations.length === filteredReservations.length &&
                          filteredReservations.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedReservations(filteredReservations.map((r) => r.id))
                          } else {
                            setSelectedReservations([])
                          }
                        }}
                        className='h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded'
                      />
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      Client
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      Contact
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      Date & Heure
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      Convives
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      Statut
                    </th>
                    <th
                      className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDarkMode ? 'bg-gray-800/50 divide-gray-700' : 'bg-white divide-gray-200'
                  }`}>
                  {filteredReservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className={`transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/50'
                      }`}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <input
                          type='checkbox'
                          checked={selectedReservations.includes(reservation.id)}
                          onChange={() => toggleReservationSelection(reservation.id)}
                          className='h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded'
                        />
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                          {reservation.name}
                        </div>
                        {reservation.special_requests && (
                          <div
                            className={`text-xs mt-1 max-w-xs truncate ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                            title={reservation.special_requests}>
                            <strong>Demandes:</strong> {reservation.special_requests}
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm'>
                        <div
                          className={`flex items-center mb-1 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                          <Phone
                            className={`w-4 h-4 mr-2 ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          />
                          {reservation.phone}
                        </div>
                        <div
                          className={`flex items-center ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                          <Mail
                            className={`w-4 h-4 mr-2 ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          />
                          {reservation.email}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm'>
                        <div
                          className={`flex items-center mb-1 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                          <Calendar
                            className={`w-4 h-4 mr-2 ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          />
                          {new Date(reservation.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div
                          className={`flex items-center ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                          <Clock
                            className={`w-4 h-4 mr-2 ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          />
                          {reservation.time}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div
                          className={`flex items-center text-sm ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                          <Users
                            className={`w-4 h-4 mr-2 ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          />
                          {reservation.guests}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            reservation.status,
                            isDarkMode
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
                              className='bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-all duration-200 hover:scale-105'>
                              Confirmer
                            </button>
                            <button
                              onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              className='bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-all duration-200 hover:scale-105'>
                              Annuler
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Success Message Toast */}
      {successMessage && (
        <div className='fixed top-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-bounce'>
          <div className='flex items-center space-x-3'>
            <CheckCircle className='w-6 h-6' />
            <span className='font-medium'>{successMessage}</span>
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
