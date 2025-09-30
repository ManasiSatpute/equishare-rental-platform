import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';

const SearchBar = ({ onSearch }) => {
  const { language, searchTerm, setSearchTerm } = useAppContext();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const t = getTranslations(language);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
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
      <form onSubmit={handleSearch} className="flex gap-10">
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            className="form-control"
            placeholder={t.searchPlaceholder}
            value={localSearchTerm}
            onChange={handleInputChange}
            style={{ paddingRight: localSearchTerm ? '50px' : '15px' }}
          />
          
          {localSearchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--secondary-color)',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              ×
            </button>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary">
          🔍 Search
        </button>
      </form>

      {/* Quick search suggestions */}
      <div style={{ marginTop: '15px' }}>
        <span style={{ 
          fontSize: '14px', 
          color: 'var(--secondary-color)',
          marginRight: '10px'
        }}>
          Quick search:
        </span>
        {['drill', 'saw', 'ladder', 'washer'].map((term) => (
          <button
            key={term}
            onClick={() => {
              setLocalSearchTerm(term);
              setSearchTerm(term);
              if (onSearch) onSearch(term);
            }}
            style={{
              background: 'var(--light-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '5px 12px',
              margin: '0 5px',
              fontSize: '12px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;