import React from 'react';
import { useAppContext } from '../context/AppContext';
import { categories } from '../assets/assets';

const CategoryFilter = ({ onCategoryChange }) => {
  const { selectedCategory, setSelectedCategory } = useAppContext();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div style={{ 
      background: 'var(--white)', 
      padding: '20px', 
      borderRadius: '10px',
      boxShadow: 'var(--shadow)',
      marginBottom: '20px'
    }}>
      <h3 className="text-lg font-semibold mb-20">Categories</h3>
      
      <div className="grid grid-cols-3 gap-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
            style={{ 
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            {getCategoryIcon(category)} {category}
          </button>
        ))}
      </div>

      {/* Category Stats */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: 'var(--light-color)',
        borderRadius: '5px'
      }}>
        <div className="flex justify-between align-center">
          <span style={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
            Selected: <strong>{selectedCategory}</strong>
          </span>
          {selectedCategory !== 'All Categories' && (
            <button
              onClick={() => handleCategoryChange('All Categories')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category) => {
  const icons = {
    'All Categories': '📦',
    'Power Tools': '🔧',
    'Cutting Tools': '🪚',
    'Garden Tools': '🌱',
    'Cleaning Tools': '🧽',
    'Access Tools': '🪜'
  };
  return icons[category] || '🔧';
};

export default CategoryFilter;