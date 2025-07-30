import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';  // Ensure this matches your Spring Boot server URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response.data);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response.data);
    throw error;
  }
};