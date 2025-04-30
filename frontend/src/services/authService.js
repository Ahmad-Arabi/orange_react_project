import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/register', {
      name: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.confirmPassword
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout failed:', error);
    localStorage.removeItem('token');
  }
};