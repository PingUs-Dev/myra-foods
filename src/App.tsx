// src/App.tsx - REPLACE YOUR EXISTING FILE WITH THIS

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './components/CartProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AllProducts from './components/products/AllProducts';
import { getFeaturedProducts } from './services/productService';
import { Product } from './types/product';

interface SearchFilters {
  priceRange: [number, number];
  category: string;
  sortBy: string;
}

const AppContent = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    priceRange: [0, 2000],
    category: 'all',
    sortBy: 'relevance'
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updatePageFromURL = () => {
      const path = window.location.pathname;
      if (path === '/cart') {
        setCurrentPage('cart');
      } else if (path === '/admin') {
        setCurrentPage('admin');
      } else if (path === '/admin/dashboard') {
        setCurrentPage('admin-dashboard');
      } else if (path === '/products') {
        setCurrentPage('products');
      } else {
        setCurrentPage('home');
      }
    };

    updatePageFromURL();

    const handlePopState = () => {
      updatePageFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('navigate', handlePopState as any);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handlePopState as any);
    };
  }, []);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  const filterProducts = (productList: Product[]) => {
    if (!searchQuery && searchFilters.category === 'all') return productList;
    
    return productList.filter(product => {
      const matchesQuery = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = product.price >= searchFilters.priceRange[0] && 
                          product.price <= searchFilters.priceRange[1];
      
      const matchesCategory = searchFilters.category === 'all' || 
        product.category === searchFilters.category;
      
      return matchesQuery && matchesPrice && matchesCategory;
    });
  };

  // Route to appropriate page
  if (currentPage === 'admin') {
    return <AdminLogin />;
  }

  if (currentPage === 'admin-dashboard') {
    if (!currentUser) {
      window.location.href = '/admin';
      return null;
    }
    return <AdminDashboard />;
  }

  if (currentPage === 'cart') {
    return <Cart />;
  }

  if (currentPage === 'products') {
    return <AllProducts />;
  }

  // Group products by category
  const corporateProducts = products.filter(p => p.category === 'corporate');
  const festiveProducts = products.filter(p => p.category === 'festive');
  const birthdayProducts = products.filter(p => p.category === 'birthday');
  const cateringProducts = products.filter(p => p.category === 'catering');

  return (
    <>
      <Header />
      <Hero />
      <SearchBar onSearch={handleSearch} products={products as any} />
      
      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : (
        <>
          <ProductSection
            id="snack-boxes"
            title="Corporate"
            subtitle="Curated snack collections specially designed for businesses, meetings, and corporate events."
            products={filterProducts(corporateProducts) as any}
            onProductClick={handleProductClick}
          />
          <ProductSection
            id="event-boxes"
            title="Festive & Other Events"
            subtitle="Thoughtfully crafted snack boxes perfect for celebrations, festivals, corporate meetings, and special occasions."
            products={filterProducts(festiveProducts) as any}
            onProductClick={handleProductClick}
          />
          <ProductSection
            id="catering"
            title="Birthday"
            subtitle="Professional catering for birthdays of all sizes, offering curated snack boxes and exceptional service."
            products={filterProducts(birthdayProducts) as any}
            onProductClick={handleProductClick}
          />
          <ProductSection
            id="other-products"
            title="Catering"
            subtitle="Delicious dishes and special foods for every occasion, from small gatherings to big celebrations."
            products={filterProducts(cateringProducts) as any}
            onProductClick={handleProductClick}
          />
        </>
      )}
      
      <Testimonials />
      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen">
          <AppContent />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;