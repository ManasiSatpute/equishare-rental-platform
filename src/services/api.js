// Mock API service for equipment sharing platform
import { mockEquipment } from '../assets/assets.js';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: "+91 9876543210",
    userType: "renter",
    address: "123 Main St, Mumbai"
  },
  {
    id: 2,
    name: "Jane Smith", 
    email: "jane@example.com",
    password: "password123",
    phone: "+91 9876543211",
    userType: "owner",
    address: "456 Oak St, Delhi"
  }
];

// Authentication API
export const authAPI = {
  // Login user
  login: async (email, password, userType) => {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => 
      u.email === email && 
      u.password === password && 
      u.userType === userType
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return {
        success: true,
        user: userWithoutPassword,
        token: `mock-jwt-token-${user.id}`
      };
    } else {
      throw new Error('Invalid credentials or user type');
    }
  },

  // Register user
  register: async (userData) => {
    await delay(1000);
    
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      success: true,
      user: userWithoutPassword,
      token: `mock-jwt-token-${newUser.id}`
    };
  },

  // Logout user
  logout: async () => {
    await delay(500);
    return { success: true };
  }
};

// Equipment API
export const equipmentAPI = {
  // Get all equipment
  getAllEquipment: async () => {
    await delay(800);
    return {
      success: true,
      data: mockEquipment
    };
  },

  // Get equipment by category
  getEquipmentByCategory: async (category) => {
    await delay(600);
    const filtered = category === 'All Categories' 
      ? mockEquipment 
      : mockEquipment.filter(item => item.category === category);
    
    return {
      success: true,
      data: filtered
    };
  },

  // Search equipment
  searchEquipment: async (searchTerm) => {
    await delay(600);
    const filtered = mockEquipment.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      success: true,
      data: filtered
    };
  },

  // Get equipment by ID
  getEquipmentById: async (id) => {
    await delay(500);
    const equipment = mockEquipment.find(item => item.id === parseInt(id));
    
    if (equipment) {
      return {
        success: true,
        data: equipment
      };
    } else {
      throw new Error('Equipment not found');
    }
  },

  // Add new equipment (for owners)
  addEquipment: async (equipmentData) => {
    await delay(1000);
    
    const newEquipment = {
      id: mockEquipment.length + 1,
      ...equipmentData,
      rating: 0,
      availability: true,
      createdAt: new Date().toISOString()
    };
    
    mockEquipment.push(newEquipment);
    
    return {
      success: true,
      data: newEquipment
    };
  },

  // Update equipment (for owners)
  updateEquipment: async (id, updateData) => {
    await delay(800);
    
    const index = mockEquipment.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      mockEquipment[index] = { ...mockEquipment[index], ...updateData };
      return {
        success: true,
        data: mockEquipment[index]
      };
    } else {
      throw new Error('Equipment not found');
    }
  },

  // Delete equipment (for owners)
  deleteEquipment: async (id) => {
    await delay(600);
    
    const index = mockEquipment.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      const deleted = mockEquipment.splice(index, 1)[0];
      return {
        success: true,
        data: deleted
      };
    } else {
      throw new Error('Equipment not found');
    }
  }
};

// Orders API
export const ordersAPI = {
  // Create new order
  createOrder: async (orderData) => {
    await delay(1000);
    
    const order = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return {
      success: true,
      data: order
    };
  },

  // Get user orders
  getUserOrders: async (userId) => {
    await delay(800);
    
    // Mock orders data
    const mockOrders = [
      {
        id: 1,
        userId: userId,
        items: [
          { ...mockEquipment[0], quantity: 1, days: 3 }
        ],
        total: 450,
        status: 'completed',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-18T14:45:00Z'
      },
      {
        id: 2,
        userId: userId,
        items: [
          { ...mockEquipment[1], quantity: 1, days: 2 }
        ],
        total: 400,
        status: 'active',
        createdAt: '2024-01-20T09:15:00Z',
        updatedAt: '2024-01-20T09:15:00Z'
      }
    ];
    
    return {
      success: true,
      data: mockOrders
    };
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    await delay(600);
    
    return {
      success: true,
      data: {
        id: orderId,
        status: status,
        updatedAt: new Date().toISOString()
      }
    };
  }
};

// Language translations
export const translations = {
  english: {
    appName: "EquiShare",
    home: "Home",
    allProducts: "All Products",
    cart: "Cart",
    orders: "Orders",
    profile: "Profile",
    login: "Login",
    logout: "Logout",
    loginAsRenter: "Login as Renter",
    loginAsOwner: "Login as Owner",
    searchPlaceholder: "Search equipment...",
    pricePerDay: "per day",
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    orderNow: "Order Now",
    available: "Available",
    notAvailable: "Not Available",
    rating: "Rating"
  },
  hindi: {
    appName: "EquiShare",
    home: "होम",
    allProducts: "सभी उत्पाद",
    cart: "कार्ट",
    orders: "ऑर्डर",
    profile: "प्रोफाइल",
    login: "लॉगिन",
    logout: "लॉगआउट",
    loginAsRenter: "किराएदार के रूप में लॉगिन",
    loginAsOwner: "मालिक के रूप में लॉगिन",
    searchPlaceholder: "उपकरण खोजें...",
    pricePerDay: "प्रति दिन",
    addToCart: "कार्ट में डालें",
    viewDetails: "विवरण देखें",
    orderNow: "अभी ऑर्डर करें",
    available: "उपलब्ध",
    notAvailable: "उपलब्ध नहीं",
    rating: "रेटिंग"
  },
  marathi: {
    appName: "EquiShare",
    home: "होम",
    allProducts: "सर्व उत्पादने",
    cart: "कार्ट",
    orders: "ऑर्डर",
    profile: "प्रोफाइल",
    login: "लॉगिन",
    logout: "लॉगआउट",
    loginAsRenter: "भाडेकरू म्हणून लॉगिन",
    loginAsOwner: "मालक म्हणून लॉगिन",
    searchPlaceholder: "उपकरणे शोधा...",
    pricePerDay: "दररोज",
    addToCart: "कार्टमध्ये टाका",
    viewDetails: "तपशील पहा",
    orderNow: "आता ऑर्डर करा",
    available: "उपलब्ध",
    notAvailable: "उपलब्ध नाही",
    rating: "रेटिंग"
  }
};

// Get translations for current language
export const getTranslations = (language) => {
  return translations[language] || translations.english;
};

export default {
  authAPI,
  equipmentAPI,
  ordersAPI,
  getTranslations
};