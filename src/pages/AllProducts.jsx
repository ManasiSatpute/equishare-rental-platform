import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';
import { mockEquipment } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const AllProducts = () => {
  const { 
    language, 
    selectedCategory, 
    searchTerm, 
    products,
    setProducts,
    isLoading,
    setLoading 
  } = useAppContext();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const t = getTranslations(language);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, searchTerm, sortBy, sortOrder]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setProducts(mockEquipment);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
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

    // Sort products
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

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
        style={{ maxWidth: '700px' }}
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
        
        <div className="grid grid-cols-2 gap-20">
          <div>
            <img 
              src={selectedProduct?.image} 
              alt={selectedProduct?.name}
              style={{ 
                width: '100%', 
                height: '250px', 
                objectFit: 'cover', 
                borderRadius: '10px' 
              }}
            />
          </div>
          
          <div>
            <div className="mb-20">
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
            </div>

            <div className="mb-20">
              <div style={{ marginBottom: '10px' }}>
                <strong>Category:</strong> {selectedProduct?.category}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>{t.rating}:</strong> ⭐ {selectedProduct?.rating}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Owner:</strong> {selectedProduct?.owner}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Location:</strong> {selectedProduct?.location}
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
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
      <h1 className="text-3xl font-bold mb-30">All Products</h1>
      
      {/* Search and Filter Section */}
      <div className="grid grid-cols-4 gap-20 mb-30">
        <div style={{ gridColumn: 'span 2' }}>
          <SearchBar />
        </div>
        <div>
          <CategoryFilter />
        </div>
        <div>
          {/* Sort Options */}
          <div style={{ 
            background: 'var(--white)', 
            padding: '20px', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            marginBottom: '20px'
          }}>
            <h3 className="text-lg font-semibold mb-20">Sort By</h3>
            
            <div className="form-group">
              <select 
                className="form-control form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="pricePerDay">Price</option>
                <option value="rating">Rating</option>
                <option value="category">Category</option>
              </select>
            </div>
            
            <div className="flex gap-10">
              <button
                className={`btn btn-sm flex-1 ${sortOrder === 'asc' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSortOrder('asc')}
              >
                Ascending
              </button>
              <button
                className={`btn btn-sm flex-1 ${sortOrder === 'desc' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSortOrder('desc')}
              >
                Descending
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between align-center mb-20">
        <h2 className="text-xl font-semibold">
          {searchTerm ? `Search Results for "${searchTerm}"` : 
           selectedCategory === 'All Categories' ? 'All Equipment' : selectedCategory}
        </h2>
        <div className="flex align-center gap-20">
          <span style={{ color: 'var(--secondary-color)' }}>
            {filteredProducts.length} items found
          </span>
          <span style={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
            Sorted by {sortBy} ({sortOrder})
          </span>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="text-center p-30">
          <div className="spinner"></div>
          <p>Loading products...</p>
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
              <h3>No products found</h3>
              <p style={{ color: 'var(--secondary-color)' }}>
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </>
      )}

      {showProductModal && selectedProduct && <ProductModal />}
    </div>
  );
};

export default AllProducts;