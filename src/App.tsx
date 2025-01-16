import React, { useEffect, useState } from 'react';
import { ShoppingBag, ChevronRight, Menu, X, Sliders, ChevronDown } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  gender: string;
  color: string;
  image: string;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hideInitial, setHideInitial] = useState(false);
  const [activeCategory, setActiveCategory] = useState('все');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [] as string[],
    color: [] as string[],
    priceRange: [] as string[],
  });
  const [sortBy, setSortBy] = useState('default');

  const categories = [
    { name: 'все', image: '' },
    { 
      name: 'мужское',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3',
      description: 'Летняя коллекция для мужчин'
    },
    { 
      name: 'женское',
      image: 'https://images.unsplash.com/photo-1618453292459-53424b66bb6a?ixlib=rb-4.0.3',
      description: 'Свежая летняя коллекция'
    },
    { 
      name: 'детское',
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.3',
      description: 'Коллекция для детей'
    },
    { 
      name: 'унисекс',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3',
      description: 'Универсальная коллекция'
    }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Nike Air Max 2021',
      price: 160,
      oldPrice: 180,
      category: 'кроссовки',
      gender: 'мужское',
      color: 'синий',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3'
    },
    {
      id: '2',
      name: 'Nike Jordan Why Not 5',
      price: 120,
      category: 'кроссовки',
      gender: 'мужское',
      color: 'черный',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3'
    },
    {
      id: '3',
      name: 'Nike Air Max 2021',
      price: 120,
      category: 'кроссовки',
      gender: 'женское',
      color: 'белый',
      image: 'https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?ixlib=rb-4.0.3'
    },
    {
      id: '4',
      name: 'Nike LeBron 19 Low',
      price: 140,
      category: 'кроссовки',
      gender: 'мужское',
      color: 'красный',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3'
    }
  ];

  const filters = {
    gender: ['мужское', 'женское', 'унисекс'],
    color: ['белый', 'черный', 'серый', 'красный', 'синий', 'зеленый', 'желтый', 'розовый', 'фиолетовый', 'оранжевый', 'коричневый', 'лайм'],
    priceRange: ['до 100€', '100€ - 200€', '200€ - 300€', 'более 300€']
  };

  const toggleFilter = (type: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setHideInitial(true);
      }, 1000);
    }, 2500);
  }, []);

  const filteredProducts = products.filter(product => {
    if (activeCategory !== 'все' && product.gender !== activeCategory) return false;
    if (selectedFilters.gender.length && !selectedFilters.gender.includes(product.gender)) return false;
    if (selectedFilters.color.length && !selectedFilters.color.includes(product.color)) return false;
    return true;
  });

  const FilterSection = ({ mobile = false }) => (
    <div className={`${mobile ? 'lg:hidden' : 'hidden lg:block'}`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Сортировка</h3>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Пол</h3>
          <div className="space-y-2">
            {filters.gender.map(gender => (
              <label key={gender} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.gender.includes(gender)}
                  onChange={() => toggleFilter('gender', gender)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Цена</h3>
          <div className="space-y-2">
            {filters.priceRange.map(range => (
              <label key={range} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedFilters.priceRange.includes(range)}
                  onChange={() => toggleFilter('priceRange', range)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm">{range}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4">Цвет</h3>
          <div className="grid grid-cols-4 gap-2">
            {filters.color.map(color => (
              <button
                key={color}
                onClick={() => toggleFilter('color', color)}
                className={`w-full aspect-square rounded-full border-2 ${
                  selectedFilters.color.includes(color)
                    ? 'border-black'
                    : 'border-transparent'
                }`}
                style={{
                  backgroundColor: color === 'белый' ? '#ffffff' : color,
                  boxShadow: color === 'белый' ? 'inset 0 0 0 1px #e5e7eb' : 'none'
                }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Initial hero image */}
      {!hideInitial && (
        <div className={`fixed inset-0 flex items-center justify-center bg-white z-50 ${showContent ? 'animate-fade-out' : ''}`}>
          <div className={`relative ${isLoaded ? 'animate-initial-reveal' : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="mt-12 space-y-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-lg font-medium py-2 border-b border-gray-100"
              >
                {category.name.toUpperCase()}
              </button>
            ))}
            <button className="block w-full text-left text-lg font-medium py-2 border-b border-gray-100">
              ВОЙТИ
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${isFiltersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Фильтры</h2>
            <button onClick={() => setIsFiltersOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <FilterSection mobile />
        </div>
      </div>

      {/* Rest of the content */}
      <div className={`relative ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Навигация */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Left section with menu and logo */}
              <div className={`flex items-center ${showContent ? 'animate-slide-in-left' : ''}`} style={{ opacity: 0, animationDelay: '0.3s' }}>
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="h-6 w-6 mr-4 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold tracking-tighter">NIKE</h1>
              </div>

              {/* Desktop categories in center */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <div className="flex items-center space-x-8">
                  {categories.slice(1).map((category, index) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`text-sm font-medium tracking-wide transition-colors relative
                        ${activeCategory === category.name ? 'text-black' : 'text-gray-500 hover:text-black'}
                        ${showContent ? 'animate-slide-in-top' : ''}
                        after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-black
                        after:transition-all after:duration-300
                        ${activeCategory === category.name ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                      `}
                      style={{ opacity: 0, animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      {category.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right section with login and cart */}
              <div className={`flex items-center space-x-6 ${showContent ? 'animate-slide-in-right' : ''}`} style={{ opacity: 0, animationDelay: '0.3s' }}>
                <button className="hidden lg:block text-sm font-medium hover:text-gray-600 transition-colors">
                  ВОЙТИ
                </button>
                <button className="relative group">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {activeCategory === 'все' ? (
          <>
            {/* Герой секция */}
            <div className="pt-16">
              <div className="relative h-[85vh] bg-gray-100 overflow-hidden">
                <div className={`absolute inset-0 ${showContent ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0, animationDelay: '0.6s' }}>
                  <img
                    src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3"
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Категории */}
            <div className="max-w-7xl mx-auto px-4 py-24">
              <h2 className={`text-4xl font-bold mb-12 tracking-tight ${showContent ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0, animationDelay: '0.8s' }}>
                Категории
              </h2>
              <div className="space-y-12">
                {categories.slice(1).map((category, index) => (
                  <div
                    key={category.name}
                    className={`flex flex-row items-center gap-4 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    } ${showContent ? 'animate-fade-in-up' : ''}`}
                    style={{ opacity: 0, animationDelay: `${1 + index * 0.2}s` }}
                  >
                    <div className="w-1/2">
                      <div className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-2xl">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    </div>
                    <div className="w-1/2 space-y-2 px-2">
                      <h3 className="text-2xl font-bold tracking-tight">{category.name.toUpperCase()}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                      <button className="inline-flex items-center space-x-1 text-sm font-medium hover:text-gray-600 transition-colors group">
                        <span>Смотреть</span>
                        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">{activeCategory.toUpperCase()}</h1>
                <button
                  onClick={() => setIsFiltersOpen(true)}
                  className="lg:hidden flex items-center space-x-2 text-sm font-medium"
                >
                  <Sliders className="h-4 w-4" />
                  <span>Фильтры</span>
                </button>
              </div>

              <div className="flex gap-8">
                {/* Desktop Filters */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                  <FilterSection />
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-4 space-y-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">€{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-sm text-gray-500 line-through">€{product.oldPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;