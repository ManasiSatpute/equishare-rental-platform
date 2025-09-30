import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations, equipmentAPI } from '../services/api';
import { mockEquipment } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const { 
    language, 
    selectedCategory, 
    searchTerm, 
    setProducts, 
    products,
    isLoading,
    setLoading 
  } = useAppContext();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  
  const t = getTranslations(language);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when search term or category changes
  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // In a real app, you'd call equipmentAPI.getAllEquipment()
      // For now, using mock data
      setTimeout(() => {
        setProducts(mockEquipment);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const ProductModal = () => (
    <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <div className="flex justify-between align-center mb-20">
          <h2 className="text-xl font-bold">{selectedProduct?.name}</h2>
          <button 
            onClick={() => setShowProductModal(false)}
            className="btn btn-outline btn-sm"
          >
            ×
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <img 
            src={selectedProduct?.image} 
            alt={selectedProduct?.name}
            style={{ 
              width: '100%', 
              height: '300px', 
              objectFit: 'cover', 
              borderRadius: '10px' 
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div className="flex justify-between align-center mb-10">
            <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
              ₹{selectedProduct?.pricePerDay}/{t.pricePerDay}
            </span>
            <span className={`badge ${selectedProduct?.availability ? 'badge-success' : 'badge-danger'}`}>
              {selectedProduct?.availability ? t.available : t.notAvailable}
            </span>
          </div>
          
          <p style={{ color: 'var(--secondary-color)', marginBottom: '15px' }}>
            {selectedProduct?.description}
          </p>

          <div className="grid grid-cols-2 gap-10 mb-20">
            <div>
              <strong>Category:</strong> {selectedProduct?.category}
            </div>
            <div>
              <strong>{t.rating}:</strong> ⭐ {selectedProduct?.rating}
            </div>
            <div>
              <strong>Owner:</strong> {selectedProduct?.owner}
            </div>
            <div>
              <strong>Location:</strong> {selectedProduct?.location}
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          <button 
            className="btn btn-primary flex-1"
            disabled={!selectedProduct?.availability}
          >
            {t.addToCart}
          </button>
          <button 
            className="btn btn-success flex-1"
            disabled={!selectedProduct?.availability}
          >
            {t.orderNow}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-color), #0056b3)',
        color: 'var(--white)',
        padding: '60px 40px',
        borderRadius: '15px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 className="text-3xl font-bold mb-20">
          Welcome to {t.appName}
        </h1>
        <p className="text-lg mb-30">
          Rent equipment from trusted owners in your area. 
          Get the tools you need, when you need them.
        </p>
        <div className="flex justify-center gap-20">
          <div style={{ textAlign: 'center' }}>
            <div className="text-2xl font-bold">500+</div>
            <div>Equipment Available</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="text-2xl font-bold">1000+</div>
            <div>Happy Customers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="text-2xl font-bold">50+</div>
            <div>Cities Covered</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-4 gap-20 mb-30">
        <div style={{ gridColumn: 'span 3' }}>
          <SearchBar />
        </div>
        <div>
          <CategoryFilter />
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex justify-between align-center mb-20">
          <h2 className="text-2xl font-bold">
            {searchTerm ? `Search Results for "${searchTerm}"` : 
             selectedCategory === 'All Categories' ? 'All Equipment' : selectedCategory}
          </h2>
          <span style={{ color: 'var(--secondary-color)' }}>
            {filteredProducts.length} items found
          </span>
        </div>

        {isLoading ? (
          <div className="text-center p-30">
            <div className="spinner"></div>
            <p>Loading equipment...</p>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-3 gap-20">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-30" style={{ 
                background: 'var(--light-color)', 
                borderRadius: '10px' 
              }}>
                <h3>No equipment found</h3>
                <p style={{ color: 'var(--secondary-color)' }}>
                  Try adjusting your search criteria or browse different categories.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {showProductModal && selectedProduct && <ProductModal />}
    </div>
  );
};

export default Home;