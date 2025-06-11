'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError('Identifiants incorrects')
      } else {
        const session = await getSession()
        if (session) {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Panneau d'administration</h1>
          <p className='text-gray-600'>Le Moderne Restaurant</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>
              Nom d'utilisateur
            </label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                placeholder="Entrez le nom d'utilisateur"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Mot de passe
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                placeholder='Entrez le mot de passe'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm'>
              {error}
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>        </form>
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>Panneau de gestion du restaurant Le Moderne</p>
          {process.env.NODE_ENV === 'development' && (
            <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-xs text-blue-700'>
                <strong>Mode développement:</strong><br />
                Utilisez admin/admin123 si la base de données n'est pas configurée
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
