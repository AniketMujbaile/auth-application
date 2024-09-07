import axios from 'axios';

//const API_URL = 'http://localhost:5000/api/auth';

const API_URL = 'https://auth-application-henna.vercel.app/api/auth';

export const register = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export const login = async (data) => {
  return await axios.post(`${API_URL}/login`, data);
};
