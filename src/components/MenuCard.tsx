import React from 'react'

interface MenuCardProps {
  name: string
  description: string
  price: string
  category?: string
  isSignature?: boolean
}

const MenuCard: React.FC<MenuCardProps> = ({ 
  name, 
  description, 
  price, 
  category,
  isSignature = false 
}) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-primary-100">
      {/* Signature Badge */}
      {isSignature && (
        <div className="absolute -top-2 -right-2 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
          Signature du Chef
        </div>
      )}
      
      {/* Category */}
      {category && (
        <span className="inline-block text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
          {category}
        </span>
      )}
      
      {/* Content */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-playfair font-semibold text-charcoal-900 group-hover:text-primary-600 transition-colors duration-200">
          {name}
        </h3>
        <span className="text-xl font-bold text-primary-600 ml-4">
          {price}€
        </span>
      </div>
      
      <p className="text-charcoal-600 leading-relaxed text-sm">
        {description}
      </p>
      
      {/* Decorative line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
    </div>
  )
}

export default MenuCard