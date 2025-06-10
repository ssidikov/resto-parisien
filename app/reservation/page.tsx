import ReservationForm from '@/components/ReservationForm'

export default function ReservationPage() {
  return (
    <div className='py-16 bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ReservationForm />
      </div>
    </div>
  )
}
