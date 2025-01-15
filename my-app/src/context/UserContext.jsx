import React, { createContext, useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Validation Utilities
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Custom validation error
class ValidationError extends Error {
  constructor(errors) {
    super('Validation Failed');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Validate user data
const validateUserData = (userData, isUpdate = false) => {
  const errors = {};
  
  // Name validation
  if (!isUpdate && (!userData.name || userData.name.trim() === '')) {
    errors.name = 'Name is required';
  } else if (userData.name && userData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  // Email validation
  if (!isUpdate && !userData.email) {
    errors.email = 'Email is required';
  } else if (userData.email && !isValidEmail(userData.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Role validation
  if (!isUpdate && !userData.role) {
    errors.role = 'Role is required';
  }
  
  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }
  
  return userData;
};

// Initial users data
export const initialUsers = [
  { 
    id: uuidv4(), 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    role: 'Admin',
    createdAt: new Date().toISOString()
  },
  { 
    id: uuidv4(), 
    name: 'Bob Smith', 
    email: 'bob@example.com', 
    role: 'Editor',
    createdAt: new Date().toISOString()
  },
  { 
    id: uuidv4(), 
    name: 'Charlie Brown', 
    email: 'charlie@example.com', 
    role: 'Viewer',
    createdAt: new Date().toISOString()
  },
];

// Create context
export const UserContext = createContext();

// Action types with more descriptive names
const ACTION_TYPES = {
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_USERS: 'SET_USERS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

const USERS_STORAGE_KEY = 'dashboard_users';

// Helper functions for localStorage with enhanced error handling
const loadFromStorage = () => {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return initialUsers;
  }
};

const saveToStorage = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

// Initial state structure
const initialState = {
  users: [],
  isLoading: false,
  error: null
};

// Enhanced reducer with more state management
const userReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTION_TYPES.SET_ERROR:
      return { 
        ...state, 
        error: action.payload,
        isLoading: false 
      };
    
    case ACTION_TYPES.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ACTION_TYPES.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        isLoading: false,
        error: null
      };
    
    case ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        isLoading: false,
        error: null
      };
    
    case ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        isLoading: false,
        error: null
      };
    
    case ACTION_TYPES.SET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: null
      };
    
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  // Initialize state from localStorage with useReducer
  const [state, dispatch] = useReducer(userReducer, initialState, () => {
    const storedUsers = loadFromStorage();
    return {
      ...initialState,
      users: storedUsers
    };
  });

  // Enhanced user management functions with validation and error handling
  const addUser = (userData) => {
    try {
      // Start loading
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      
      // Validate user data
      const validatedUser = validateUserData(userData);
      
      // Prepare user object with additional metadata
      const newUser = {
        ...validatedUser,
        id: uuidv4(),
        createdAt: new Date().toISOString()
      };
      
      // Dispatch add action
      dispatch({ type: ACTION_TYPES.ADD_USER, payload: newUser });
      
      // Save to storage
      saveToStorage([...state.users, newUser]);
      
      return newUser;
    } catch (error) {
      // Handle validation or other errors
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: error instanceof ValidationError ? error.errors : error.message 
      });
      
      throw error;
    }
  };

  const updateUser = (userData) => {
    try {
      // Start loading
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      
      // Validate user data (pass true for update)
      const validatedUser = validateUserData(userData, true);
      
      // Prepare updated user object
      const updatedUser = {
        ...validatedUser,
        updatedAt: new Date().toISOString()
      };
      
      // Dispatch update action
      dispatch({ type: ACTION_TYPES.UPDATE_USER, payload: updatedUser });
      
      // Update storage
      const updatedUsers = state.users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      );
      saveToStorage(updatedUsers);
      
      return updatedUser;
    } catch (error) {
      // Handle validation or other errors
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: error instanceof ValidationError ? error.errors : error.message 
      });
      
      throw error;
    }
  };

  const deleteUser = (userId) => {
    try {
      // Start loading
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      
      // Dispatch delete action
      dispatch({ type: ACTION_TYPES.DELETE_USER, payload: userId });
      
      // Update storage
      const updatedUsers = state.users.filter(user => user.id !== userId);
      saveToStorage(updatedUsers);
    } catch (error) {
      // Handle any potential errors
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: error.message 
      });
      
      throw error;
    }
  };

  // Error management
  const clearError = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  };

  // Prepare context value with enhanced state and methods
  const contextValue = {
    ...state,
    addUser,
    updateUser,
    deleteUser,
    clearError
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook with enhanced error checking
export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;