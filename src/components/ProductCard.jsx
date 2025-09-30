import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';

const ProductCard = ({ product, onViewDetails }) => {
  const { language, addToCart } = useAppContext();
  const t = getTranslations(language);

  const handleAddToCart = () => {
    addToCart(product);
    // You could add a toast notification here
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="card">
      <div style={{ position: 'relative' }}>
        <img 
          src={product.image} 
          alt={product.name}
          className="card-img"
          style={{ cursor: 'pointer' }}
          onClick={() => onViewDetails(product)}
        />
        
        {/* Availability Badge */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}>
          <span className={`badge ${product.availability ? 'badge-success' : 'badge-danger'}`}>
            {product.availability ? t.available : t.notAvailable}
          </span>
        </div>

        {/* Rating Badge */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px'
        }}>
          <span className="badge badge-warning">
            ⭐ {product.rating}
          </span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">{product.description}</p>
        
        <div className="flex justify-between align-center mb-20">
          <div>
            <span className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
              ₹{product.pricePerDay}
            </span>
            <span className="text-sm" style={{ color: 'var(--secondary-color)' }}>
              /{t.pricePerDay}
            </span>
          </div>
          <span className="badge badge-primary">
            {product.category}
          </span>
        </div>

        <div style={{ color: 'var(--secondary-color)', fontSize: '14px', marginBottom: '15px' }}>
          <p>📍 {product.location}</p>
          <p>👤 {product.owner}</p>
        </div>

        <div className="flex gap-10">
          <button 
            className="btn btn-outline btn-sm flex-1"
            onClick={() => onViewDetails(product)}
          >
            {t.viewDetails}
          </button>
          <button 
            className="btn btn-primary btn-sm flex-1"
            onClick={handleAddToCart}
            disabled={!product.availability}
          >
            {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;