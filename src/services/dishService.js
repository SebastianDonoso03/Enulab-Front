// src/services/platoServices.js
import axios from "axios";

// Suponiendo que la API tiene una estructura similar para gestionar platos
const API_URL = "http://localhost:4200/api"; // Cambiar según la URL de tu API

// Obtener todos los platos de un menú
export const getPlatosByMenu = async (menuId) => {
  try {
    const response = await axios.get(`${API_URL}/menus/${menuId}/dishes`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los platos:", error);
    throw error;
  }
};

// Crear un plato para un menú
export const createPlato = async (menuId, platoData) => {
  try {
    const response = await axios.post(`${API_URL}/menus/${menuId}/dishes`, platoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el plato:", error);
    throw error;
  }
};

// Actualizar un plato de un menú
export const updatePlato = async (menuId, platoId, platoData) => {
  try {
    const response = await axios.put(`${API_URL}/menus/${menuId}/dishes/${platoId}`, platoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el plato:", error);
    throw error;
  }
};

// Eliminar un plato de un menú
export const deletePlato = async (menuId, platoId) => {
  try {
    await axios.delete(`${API_URL}/menus/${menuId}/dishes/${platoId}`);
  } catch (error) {
    console.error("Error al eliminar el plato:", error);
    throw error;
  }
};
