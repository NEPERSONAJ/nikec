import React, { useEffect, useState } from 'react';
import { ShoppingBag, ChevronRight, Menu } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [activeCategory, setActiveCategory] = useState('все');

  const categories = [
    { name: 'все', image: '' },
    { name: 'мужское', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3' },
    { name: 'женское', image: 'https://images.unsplash.com/photo-1618453292459-53424b66bb6a?ixlib=rb-4.0.3' },
    { name: 'новинки', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3' },
    { name: 'распродажа', image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3' },
  ];
  
  const products: Product[] = [
    {
      id: 1,
      name: 'Nike Air Max Plus',
      price: 14999,
      category: 'мужское',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3'
    },
    {
      id: 2,
      name: 'Nike Air Force 1',
      price: 12999,
      category: 'женское',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3'
    },
    {
      id: 3,
      name: 'Nike Zoom Fly 5',
      price: 16999,
      category: 'новинки',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3'
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setShowText(true);
    }, 1500); // Показываем текст после завершения анимации картинки
  }, []);

  return (
    <div className={`min-h-screen bg-white ${isLoaded ? 'animate-zoom-in' : ''}`}>
      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 lg:hidden" />
              <h1 className="text-2xl font-bold tracking-tighter">NIKE</h1>
            </div>
            <div className="hidden lg:flex space-x-12">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`text-sm font-medium tracking-wide transition-colors relative
                    ${activeCategory === category.name ? 'text-black' : 'text-gray-500 hover:text-black'}
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-black
                    after:transition-all after:duration-300
                    ${activeCategory === category.name ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {category.name.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-6">
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

      {/* Герой секция */}
      <div className="pt-16">
        <div className="relative h-[85vh] bg-gray-100 overflow-hidden">
          <div className={`absolute inset-0 transition-transform duration-[1.5s] ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}>
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className={`text-center ${showText ? 'animate-fade-in' : 'opacity-0'}`}>
              <h2 className="text-[120px] font-futura font-bold tracking-tight leading-none text-black">
                JUST<br />DO IT
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Категории */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-12 tracking-tight">Категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(1).map((category, index) => (
            <div
              key={category.name}
              className={`relative h-[400px] group cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-medium tracking-wide">{category.name.toUpperCase()}</h3>
                  <ChevronRight className="h-6 w-6 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Продукты */}
      <div className="max-w-7xl mx-auto px-4 py-24 bg-gray-50">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Популярные модели</h2>
          <button className="hidden lg:flex items-center space-x-2 text-lg font-medium hover:text-gray-600 transition-colors">
            <span>Смотреть все</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <button className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 rounded-lg font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Добавить в корзину
                </button>
              </div>
              <h3 className="text-xl font-medium mb-2">{product.name}</h3>
              <p className="text-gray-900 text-lg font-medium">{product.price.toLocaleString('ru-RU')} ₽</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;