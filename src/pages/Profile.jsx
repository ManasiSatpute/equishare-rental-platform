import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';

const Profile = () => {
  const { user, userType, language, logout, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Power Tools',
    pricePerDay: '',
    image: null
  });
  
  const t = getTranslations(language);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, ...editData });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // In a real app, you'd upload the image and save to database
    console.log('Adding product:', newProduct);
    setShowAddProductModal(false);
    setNewProduct({ name: '', description: '', category: 'Power Tools', pricePerDay: '', image: null });
    alert('Product added successfully!');
  };

  const AddProductModal = () => (
    <div className="modal-overlay" onClick={() => setShowAddProductModal(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <div className="flex justify-between align-center mb-20">
          <h2 className="text-xl font-bold">Add New Equipment</h2>
          <button 
            onClick={() => setShowAddProductModal(false)}
            className="btn btn-outline btn-sm"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleAddProduct}>
          <div className="form-group">
            <label className="form-label">Equipment Name</label>
            <input
              type="text"
              className="form-control"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              required
              rows="3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-control form-select"
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              required
            >
              <option value="Power Tools">Power Tools</option>
              <option value="Cutting Tools">Cutting Tools</option>
              <option value="Garden Tools">Garden Tools</option>
              <option value="Cleaning Tools">Cleaning Tools</option>
              <option value="Access Tools">Access Tools</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Price per Day (₹)</label>
            <input
              type="number"
              className="form-control"
              value={newProduct.pricePerDay}
              onChange={(e) => setNewProduct({...newProduct, pricePerDay: e.target.value})}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Equipment Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})}
              required
            />
          </div>

          <div className="flex gap-10">
            <button 
              type="button"
              onClick={() => setShowAddProductModal(false)}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-success flex-1"
            >
              Add Equipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <div className="text-center p-30" style={{ 
          background: 'var(--white)', 
          borderRadius: '10px',
          boxShadow: 'var(--shadow)'
        }}>
          <h2 className="text-2xl font-bold mb-20">Please Login</h2>
          <p style={{ color: 'var(--secondary-color)' }}>
            You need to login to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
      <div className="flex justify-between align-center mb-30">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <span className={`badge ${userType === 'owner' ? 'badge-success' : 'badge-primary'} text-lg`}>
          {userType === 'owner' ? '🏠 Equipment Owner' : '👤 Renter'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-20">
        {/* Profile Information */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ 
            background: 'var(--white)', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            padding: '30px'
          }}>
            <div className="flex justify-between align-center mb-30">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-outline"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    value={editData.address}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="flex gap-10">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-20">
                  <div>
                    <label className="form-label">Name</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <p className="text-lg">{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="form-label">User Type</label>
                    <p className="text-lg">{userType}</p>
                  </div>
                </div>
                
                <div className="mt-20">
                  <label className="form-label">Address</label>
                  <p className="text-lg">{user.address || 'Not provided'}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Quick Stats */}
          <div style={{ 
            background: 'var(--white)', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 className="text-lg font-semibold mb-20">Quick Stats</h3>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>5</div>
              <div style={{ color: 'var(--secondary-color)' }}>Total Orders</div>
            </div>
            <div className="text-center mt-15">
              <div className="text-2xl font-bold" style={{ color: 'var(--success-color)' }}>2</div>
              <div style={{ color: 'var(--secondary-color)' }}>Active Rentals</div>
            </div>
            {userType === 'owner' && (
              <div className="text-center mt-15">
                <div className="text-2xl font-bold" style={{ color: 'var(--info-color)' }}>3</div>
                <div style={{ color: 'var(--secondary-color)' }}>Equipment Listed</div>
              </div>
            )}
          </div>

          {/* Owner Actions */}
          {userType === 'owner' && (
            <div style={{ 
              background: 'var(--white)', 
              borderRadius: '10px',
              boxShadow: 'var(--shadow)',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 className="text-lg font-semibold mb-20">Owner Dashboard</h3>
              <button 
                onClick={() => setShowAddProductModal(true)}
                className="btn btn-success"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                Add New Equipment
              </button>
              <button className="btn btn-outline" style={{ width: '100%', marginBottom: '10px' }}>
                Manage Equipment
              </button>
              <button className="btn btn-outline" style={{ width: '100%' }}>
                View Earnings
              </button>
            </div>
          )}

          {/* Account Actions */}
          <div style={{ 
            background: 'var(--white)', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            padding: '20px'
          }}>
            <h3 className="text-lg font-semibold mb-20">Account</h3>
            <button className="btn btn-outline" style={{ width: '100%', marginBottom: '10px' }}>
              Change Password
            </button>
            <button className="btn btn-outline" style={{ width: '100%', marginBottom: '10px' }}>
              Notification Settings
            </button>
            <button 
              onClick={logout}
              className="btn btn-danger" 
              style={{ width: '100%' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {showAddProductModal && <AddProductModal />}
    </div>
  );
};

export default Profile;