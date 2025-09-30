import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';

const Orders = () => {
  const { language, orders, user } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const t = getTranslations(language);

  // Mock orders if none exist
  const mockOrders = orders.length === 0 ? [
    {
      id: 1,
      items: [
        { id: 1, name: "Professional Power Drill", pricePerDay: 150, quantity: 1, days: 3 }
      ],
      total: 450,
      days: 3,
      status: 'completed',
      orderDate: '2024-01-15T10:30:00Z',
      deliveryAddress: '123 Main St, Mumbai',
      phone: '+91 9876543210'
    },
    {
      id: 2,
      items: [
        { id: 2, name: "Electric Circular Saw", pricePerDay: 200, quantity: 1, days: 2 },
        { id: 5, name: "Extension Ladder", pricePerDay: 100, quantity: 1, days: 2 }
      ],
      total: 600,
      days: 2,
      status: 'active',
      orderDate: '2024-01-20T09:15:00Z',
      deliveryAddress: '456 Oak St, Delhi',
      phone: '+91 9876543211'
    },
    {
      id: 3,
      items: [
        { id: 4, name: "Pressure Washer", pricePerDay: 250, quantity: 1, days: 1 }
      ],
      total: 250,
      days: 1,
      status: 'pending',
      orderDate: '2024-01-25T14:20:00Z',
      deliveryAddress: '789 Pine St, Bangalore',
      phone: '+91 9876543212'
    }
  ] : orders;

  const filteredOrders = filterStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === filterStatus);

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: 'badge-warning', text: 'Pending' },
      active: { class: 'badge-success', text: 'Active' },
      completed: { class: 'badge-primary', text: 'Completed' },
      cancelled: { class: 'badge-danger', text: 'Cancelled' }
    };
    
    const statusInfo = statusMap[status] || statusMap.pending;
    return <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const OrderModal = () => (
    <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '700px' }}
      >
        <div className="flex justify-between align-center mb-20">
          <h2 className="text-xl font-bold">Order #{selectedOrder?.id}</h2>
          <button 
            onClick={() => setShowOrderModal(false)}
            className="btn btn-outline btn-sm"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-20 mb-20">
          <div>
            <h4 className="font-semibold mb-10">Order Details</h4>
            <p><strong>Order Date:</strong> {formatDate(selectedOrder?.orderDate)}</p>
            <p><strong>Status:</strong> {getStatusBadge(selectedOrder?.status)}</p>
            <p><strong>Duration:</strong> {selectedOrder?.days} days</p>
            <p><strong>Total:</strong> ₹{selectedOrder?.total}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-10">Delivery Details</h4>
            <p><strong>Address:</strong> {selectedOrder?.deliveryAddress}</p>
            <p><strong>Phone:</strong> {selectedOrder?.phone}</p>
            {selectedOrder?.notes && (
              <p><strong>Notes:</strong> {selectedOrder.notes}</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-10">Items Ordered</h4>
          <div style={{ 
            background: 'var(--light-color)', 
            borderRadius: '5px',
            padding: '15px'
          }}>
            {selectedOrder?.items.map((item, index) => (
              <div 
                key={index}
                className="flex justify-between align-center"
                style={{ 
                  paddingBottom: '10px',
                  marginBottom: '10px',
                  borderBottom: index < selectedOrder.items.length - 1 ? '1px solid var(--border-color)' : 'none'
                }}
              >
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <span style={{ color: 'var(--secondary-color)', marginLeft: '10px' }}>
                    x{item.quantity}
                  </span>
                </div>
                <span>₹{item.pricePerDay * item.quantity * selectedOrder.days}</span>
              </div>
            ))}
            
            <div className="flex justify-between font-bold text-lg" style={{ marginTop: '15px' }}>
              <span>Total:</span>
              <span style={{ color: 'var(--primary-color)' }}>₹{selectedOrder?.total}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-10 mt-20">
          {selectedOrder?.status === 'pending' && (
            <button className="btn btn-danger flex-1">
              Cancel Order
            </button>
          )}
          {selectedOrder?.status === 'active' && (
            <button className="btn btn-success flex-1">
              Mark as Returned
            </button>
          )}
          <button 
            onClick={() => setShowOrderModal(false)}
            className="btn btn-outline flex-1"
          >
            Close
          </button>
        </div>
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
            You need to login to view your orders.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
      <div className="flex justify-between align-center mb-30">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="flex align-center gap-20">
          <select 
            className="form-control form-select"
            style={{ width: 'auto', minWidth: '150px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center p-30" style={{ 
          background: 'var(--white)', 
          borderRadius: '10px',
          boxShadow: 'var(--shadow)'
        }}>
          <h3>No Orders Found</h3>
          <p style={{ color: 'var(--secondary-color)', marginBottom: '30px' }}>
            {filterStatus === 'all' 
              ? "You haven't placed any orders yet." 
              : `No ${filterStatus} orders found.`}
          </p>
          <a href="#home" className="btn btn-primary">
            Browse Equipment
          </a>
        </div>
      ) : (
        <div className="grid gap-20">
          {filteredOrders.map((order) => (
            <div 
              key={order.id}
              style={{ 
                background: 'var(--white)', 
                borderRadius: '10px',
                boxShadow: 'var(--shadow)',
                padding: '20px'
              }}
            >
              <div className="flex justify-between align-center mb-15">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p style={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
                    Placed on {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusBadge(order.status)}
                  <div className="text-lg font-bold mt-5" style={{ color: 'var(--primary-color)' }}>
                    ₹{order.total}
                  </div>
                </div>
              </div>

              <div className="flex justify-between align-center mb-15">
                <div>
                  <span style={{ color: 'var(--secondary-color)' }}>
                    {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.days} day{order.days > 1 ? 's' : ''}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--secondary-color)' }}>
                  📍 {order.deliveryAddress}
                </div>
              </div>

              <div className="mb-15">
                <div style={{ fontSize: '14px', color: 'var(--secondary-color)' }}>
                  Items: {order.items.map(item => item.name).join(', ')}
                </div>
              </div>

              <div className="flex gap-10">
                <button 
                  onClick={() => handleViewOrder(order)}
                  className="btn btn-outline btn-sm"
                >
                  View Details
                </button>
                
                {order.status === 'completed' && (
                  <button className="btn btn-primary btn-sm">
                    Order Again
                  </button>
                )}
                
                {order.status === 'active' && (
                  <button className="btn btn-success btn-sm">
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showOrderModal && selectedOrder && <OrderModal />}
    </div>
  );
};

export default Orders;