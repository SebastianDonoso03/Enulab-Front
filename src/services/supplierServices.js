// services/supplierService.js
import axios from "axios";

const API_URL = "http://localhost:3000/restaurante"; // Ajusta la URL según tu configuración

// Obtener todos los proveedores de un restaurante
const getAllSuppliers = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/${restaurantId}/suppliers`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

// Obtener un proveedor por ID
const getSupplierById = async (restaurantId, supplierId) => {
  try {
    const response = await axios.get(`${API_URL}/${restaurantId}/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedor por ID:", error);
    throw error;
  }
};

// Crear un nuevo proveedor
const createSupplier = async (restaurantId, supplierData) => {
  try {
    const response = await axios.post(`${API_URL}/${restaurantId}/suppliers`, supplierData);
    return response.data;
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    throw error;
  }
};

// Actualizar un proveedor existente
const updateSupplier = async (restaurantId, supplierId, supplierData) => {
  try {
    const response = await axios.put(`${API_URL}/${restaurantId}/suppliers/${supplierId}`, supplierData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    throw error;
  }
};

// Eliminar un proveedor
const deleteSupplier = async (restaurantId, supplierId) => {
  try {
    const response = await axios.delete(`${API_URL}/${restaurantId}/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    throw error;
  }
};

export const supplierService = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
