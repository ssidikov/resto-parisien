import React from 'react'
import MenuCard from '../../components/MenuCard'
import { ChefHat, Star } from 'lucide-react'

const menuData = {
  entrees: [
    {
      name: 'Tartare de Saint-Jacques aux Agrumes',
      description: 'Noix de Saint-Jacques bretonnes, émulsion citron vert, caviar d\'Aquitaine, micro-pousses',
      price: '28',
      isSignature: true
    },
    {
      name: 'Foie Gras Mi-Cuit aux Figues',
      description: 'Foie gras du Périgord, compotée de figues violettes, pain brioché toasté, fleur de sel',
      price: '32'
    },
    {
      name: 'Velouté de Châtaigne Truffe',
      description: 'Crème de châtaignes des Cévennes, copeaux de truffe noire, chantilly à l\'huile de noisette',
      price: '24'
    },
    {
      name: 'Carpaccio de Bœuf aux Herbes',
      description: 'Filet de bœuf Black Angus, roquette sauvage, copeaux de parmesan 36 mois, vinaigrette balsamique',
      price: '26'
    }
  ],
  plats: [
    {
      name: 'Homard Bleu aux Aromates',
      description: 'Homard de Bretagne grillé, beurre blanc à l\'estragon, légumes de saison, risotto crémeux',
      price: '58',
      isSignature: true
    },
    {
      name: 'Côte de Bœuf Maturée 28 Jours',
      description: 'Bœuf de race Salers, jus corsé au vin de Cahors, écrasée de pommes de terre à la truffe',
      price: '45'
    },
    {
      name: 'Turbot Sauvage en Croûte',
      description: 'Filet de turbot sauvage, croûte aux herbes fraîches, beurre blanc au champagne, légumes croquants',
      price: '42'
    },
    {
      name: 'Magret de Canard Laqué',
      description: 'Magret des Landes laqué au miel et épices, purée de panais, jus réduit aux cerises griottes',
      price: '38'
    },
    {
      name: 'Agneau de Lozère Rosé',
      description: 'Carré d\'agneau rosé, tian de légumes provençaux, jus d\'agneau aux herbes de Provence',
      price: '44'
    }
  ],
  desserts: [
    {
      name: 'Soufflé au Grand Marnier',
      description: 'Soufflé traditionnel flambé, glace vanille Bourbon, tuile aux amandes',
      price: '18',
      isSignature: true
    },
    {
      name: 'Tarte Fine aux Poires Williams',
      description: 'Pâte sablée, poires pochées au vin rouge, glace cannelle, coulis de caramel beurre salé',
      price: '16'
    },
    {
      name: 'Moelleux au Chocolat Valrhona',
      description: 'Cœur coulant, chocolat noir 70%, glace vanille Madagascar, crumble cacao',
      price: '15'
    },
    {
      name: 'Millefeuille Revisité',
      description: 'Feuilletage croustillant, crème pâtissière vanille, fruits rouges de saison',
      price: '14'
    }
  ]
}

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <ChefHat className="w-8 h-8 text-primary-600" />
            <span className="text-primary-600 font-medium">Carte Gastronomique</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-charcoal-900 mb-6">
            Notre <span className="gold-gradient">Carte</span>
          </h1>
          <p className="text-xl text-charcoal-700 mb-8 max-w-2xl mx-auto">
            Une symphonie de saveurs authentiques, sublimées par la créativité de notre chef étoilé. 
            Chaque plat raconte une histoire, celle de la gastronomie française réinventée.
          </p>
          <div className="flex justify-center items-center space-x-6">
            <div className="flex items-center space-x-2 text-gold">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium text-charcoal-600">Guide Michelin 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Entrées */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-charcoal-900 mb-4">
              Entrées
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-gold mx-auto mb-6"></div>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              L'ouverture de votre voyage culinaire, entre tradition et innovation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuData.entrees.map((item, index) => (
              <MenuCard
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                category="Entrée"
                isSignature={item.isSignature}
              />
            ))}
          </div>
        </section>

        {/* Plats Principaux */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-charcoal-900 mb-4">
              Plats Principaux
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-gold mx-auto mb-6"></div>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              Le cœur de l'expérience, où chaque bouchée révèle l'excellence de notre savoir-faire
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {menuData.plats.map((item, index) => (
              <MenuCard
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                category="Plat Principal"
                isSignature={item.isSignature}
              />
            ))}
          </div>
        </section>

        {/* Desserts */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-charcoal-900 mb-4">
              Desserts
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-gold mx-auto mb-6"></div>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              La note finale parfaite, une symphonie sucrée pour clôturer votre repas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuData.desserts.map((item, index) => (
              <MenuCard
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                category="Dessert"
                isSignature={item.isSignature}
              />
            ))}
          </div>
        </section>

        {/* Menu Information */}
        <section className="bg-primary-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-playfair font-semibold text-charcoal-900 mb-4">
            Menu Dégustation
          </h3>
          <p className="text-charcoal-700 mb-6 max-w-2xl mx-auto">
            Laissez-vous guider par notre chef à travers un parcours gastronomique d'exception. 
            Menu 7 services avec accords mets et vins disponible sur demande.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-primary-600">125€</span>
              <span className="block text-sm text-charcoal-600">par personne</span>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-primary-600">+45€</span>
              <span className="block text-sm text-charcoal-600">avec accords vins</span>
            </div>
          </div>
          <p className="text-sm text-charcoal-500 mt-4">
            *Prix susceptibles de changer selon les produits de saison
          </p>
        </section>
      </div>
    </div>
  )
}

export default MenuPage