import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  userType: null, // 'renter' or 'owner'
  language: 'english',
  cart: [],
  orders: [],
  products: [],
  selectedCategory: 'All Categories',
  searchTerm: '',
  isLoading: false,
  error: null
};

// Action types
export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_USER_TYPE: 'SET_USER_TYPE',
  SET_LANGUAGE: 'SET_LANGUAGE',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  ADD_ORDER: 'ADD_ORDER',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        error: null
      };

    case actionTypes.SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload
      };

    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };

    case actionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case actionTypes.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case actionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: []
      };

    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case actionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };

    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case actionTypes.LOGOUT:
      return {
        ...initialState,
        language: state.language // Keep language preference
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    setUserType: (userType) => dispatch({ type: actionTypes.SET_USER_TYPE, payload: userType }),
    setLanguage: (language) => dispatch({ type: actionTypes.SET_LANGUAGE, payload: language }),
    addToCart: (product) => dispatch({ type: actionTypes.ADD_TO_CART, payload: product }),
    removeFromCart: (productId) => dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: productId }),
    updateCartQuantity: (productId, quantity) => dispatch({ 
      type: actionTypes.UPDATE_CART_QUANTITY, 
      payload: { id: productId, quantity } 
    }),
    clearCart: () => dispatch({ type: actionTypes.CLEAR_CART }),
    addOrder: (order) => dispatch({ type: actionTypes.ADD_ORDER, payload: order }),
    setProducts: (products) => dispatch({ type: actionTypes.SET_PRODUCTS, payload: products }),
    setSelectedCategory: (category) => dispatch({ type: actionTypes.SET_SELECTED_CATEGORY, payload: category }),
    setSearchTerm: (term) => dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: term }),
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    logout: () => dispatch({ type: actionTypes.LOGOUT })
  };

  // Computed values
  const cartTotal = state.cart.reduce((total, item) => total + (item.pricePerDay * item.quantity), 0);
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const value = {
    ...state,
    ...actions,
    cartTotal,
    cartItemsCount
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;