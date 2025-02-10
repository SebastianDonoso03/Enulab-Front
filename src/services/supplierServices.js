import axios from 'axios';

const API_URL = 'http://localhost:4200/api/restaurante';

export const createSupplier = async (restaurantId, supplierData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${restaurantId}/suppliers`, // Cambiado a "suppliers"
      supplierData
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear el proveedor:', error.response?.data || error.message);
    throw error;
  }
};

// Obtener todos los proveedores de un restaurante
export const getSupplierByRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/${restaurantId}/suppliers`); // Cambiado a "suppliers"
    return response.data;
  } catch (error) {
    console.error('Error al obtener proveedores:', error.response?.data || error.message);
    throw error;
  }
};

// Obtener un proveedor específico por ID
export const getSupplierById = async (restaurantId, idSupplier) => {
  try {
    const response = await axios.get(`${API_URL}/${restaurantId}/suppliers/${idSupplier}`); // Cambiado a "suppliers"
    return response.data;
  } catch (error) {
    console.error('Error al obtener el proveedor:', error.response?.data || error.message);
    throw error;
  }
};

// Actualizar un proveedor
export const updateSupplier = async (restaurantId, idSupplier, supplierData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${restaurantId}/suppliers/${idSupplier}`, // Cambiado a "suppliers"
      supplierData
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el proveedor:', error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un proveedor
export const deleteSupplier = async (restaurantId, idSupplier) => {
  try {
    const response = await axios.delete(`${API_URL}/${restaurantId}/suppliers/${idSupplier}`); // Cambiado a "suppliers"
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el proveedor:', error.response?.data || error.message);
    throw error;
  }
};
