import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const API_URL = `${API_BASE_URL}/plants`;

export const getPlants = async (userId = null) => {
  const url = userId ? `${API_URL}?userId=${userId}` : API_URL;
  return axios.get(url);
};

export const addPlant = async (plant) => {
  return axios.post(API_URL, plant);
};

export const updatePlant = async (id, plant) => {
  return axios.put(`${API_URL}/${id}`, plant);
};

export const deletePlant = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getCarePlan = async (method) => {
  return axios.get(`${API_URL}/plan?method=${method}`);
};

// Guest plants endpoint
export const getGuestPlants = async () => {
  return axios.get(`${API_URL}/guest`);
};

// Admin endpoints
export const getAdminStats = async () => {
  return axios.get(`${API_BASE_URL}/admin/stats`);
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users`);
    // Merge with localStorage users
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const combined = [...response.data, ...localUsers.filter(lu => 
      !response.data.some(bu => bu.username === lu.username)
    )];
    return {data: combined};
  } catch (error) {
    // Fallback to localStorage
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return {data: localUsers};
  }
};

// ✅ New function: Get only the names of all plants
export const getPlantNames = async () => {
  try {
    const response = await axios.get(API_URL);
    // Assuming each plant has a "plantName" field
    return response.data.map((plant) => plant.plantName);
  } catch (error) {
    console.error("Error fetching plant names:", error);
    throw error;
  }
};

// Auth endpoints
export const checkUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/checkUser`, userData);
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    // Also save to localStorage for frontend compatibility
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    localUsers.push({...userData, id: response.data.id || Date.now()});
    localStorage.setItem('registeredUsers', JSON.stringify(localUsers));
    return response;
  } catch (error) {
    // Fallback to localStorage if backend fails
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const newUser = {...userData, id: Date.now()};
    localUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(localUsers));
    return {data: newUser};
  }
};

// User management endpoints
export const createUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/users/register`, userData);
};

export const fetchAllUsers = async () => {
  return axios.get(`${API_BASE_URL}/admin/users`);
};