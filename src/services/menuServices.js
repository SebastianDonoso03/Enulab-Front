import axios from 'axios';

const BASE_URL = "http://localhost:4200/api/restaurante"; // Base URL para mantener consistencia

// Crear un nuevo menú
export const createMenu = async (restaurantId, menusData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${restaurantId}/menus`,
      menusData
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear el menú:", error);
    throw error;
  }
};

// Obtener todos los menús de un restaurante
export const getMenusByRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${restaurantId}/menus`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los menús:", error);
    throw error;
  }
};

// Obtener un menú por su ID dentro de un restaurante
export const getMenuById = async (restaurantId, menuId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${restaurantId}/menus/${menuId}`);
    return response.data; 
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    throw error;
  }
};
