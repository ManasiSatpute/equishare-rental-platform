import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';

const Navbar = () => {
  const { 
    user, 
    userType, 
    language, 
    cartItemsCount, 
    setLanguage, 
    setUser, 
    setUserType, 
    logout 
  } = useAppContext();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('renter');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const t = getTranslations(language);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Mock login - in real app, you'd call authAPI.login
    const mockUser = {
      id: 1,
      name: loginType === 'renter' ? 'John Doe' : 'Jane Smith',
      email: loginData.email,
      userType: loginType
    };
    
    setUser(mockUser);
    setUserType(loginType);
    setShowLoginModal(false);
    setLoginData({ email: '', password: '' });
  };

  const handleLogout = () => {
    logout();
  };

  const LoginModal = () => (
    <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between align-center mb-20">
          <h2 className="text-xl font-bold">{t.login}</h2>
          <button 
            onClick={() => setShowLoginModal(false)}
            className="btn btn-outline btn-sm"
          >
            ×
          </button>
        </div>
        
        <div className="flex gap-10 mb-20">
          <button
            className={`btn flex-1 ${loginType === 'renter' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setLoginType('renter')}
          >
            {t.loginAsRenter}
          </button>
          <button
            className={`btn flex-1 ${loginType === 'owner' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setLoginType('owner')}
          >
            {t.loginAsOwner}
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {t.login}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <nav style={{
        background: 'var(--white)',
        boxShadow: 'var(--shadow)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container">
          <div className="flex justify-between align-center" style={{ padding: '15px 0' }}>
            {/* Logo */}
            <div className="flex align-center">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                {t.appName}
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex align-center gap-20">
              <a href="#home" className="text-lg" style={{ textDecoration: 'none', color: 'var(--dark-color)' }}>
                {t.home}
              </a>
              <a href="#products" className="text-lg" style={{ textDecoration: 'none', color: 'var(--dark-color)' }}>
                {t.allProducts}
              </a>
              
              {user && (
                <>
                  <a href="#cart" className="flex align-center gap-10" style={{ textDecoration: 'none', color: 'var(--dark-color)' }}>
                    {t.cart}
                    {cartItemsCount > 0 && (
                      <span className="badge badge-primary">{cartItemsCount}</span>
                    )}
                  </a>
                  <a href="#orders" className="text-lg" style={{ textDecoration: 'none', color: 'var(--dark-color)' }}>
                    {t.orders}
                  </a>
                  <a href="#profile" className="text-lg" style={{ textDecoration: 'none', color: 'var(--dark-color)' }}>
                    {t.profile}
                  </a>
                </>
              )}
            </div>

            {/* Right Section */}
            <div className="flex align-center gap-20">
              {/* Language Selector */}
              <select 
                className="form-control form-select"
                style={{ width: 'auto', minWidth: '120px' }}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="hindi">हिंदी</option>
                <option value="marathi">मराठी</option>
              </select>

              {/* User Actions */}
              {user ? (
                <div className="flex align-center gap-10">
                  <span style={{ color: 'var(--secondary-color)' }}>
                    Welcome, {user.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline btn-sm"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="btn btn-primary"
                >
                  {t.login}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLoginModal && <LoginModal />}
    </>
  );
};

export default Navbar;