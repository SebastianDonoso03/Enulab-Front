import axios from 'axios';

export const createInventory = async (restaurantId, inventoryData) => {
  try {
    const response = await axios.post(
      `http://localhost:4200/api/restaurante/${restaurantId}/inventory`,
      inventoryData
    );
    return response.data; 
  } catch (error) {
    console.error("Error al crear el inventario:", error);
    throw error;
  }
};

//visualizar
export const getInventoryByRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(
        `http://localhost:4200/api/restaurante/${restaurantId}/inventory`
      );
      return response.data; 
    } catch (error) {
      console.error("Error al obtener inventario:", error);
      throw error;
    }
  };

  export const getInventoryById = async (restaurantId,inventoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:4200/api/restaurante/${restaurantId}/inventory/${inventoryId}`
      );
      return response.data; // Devuelve los detalles del empleado específico
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
      throw error;
    }
  };
  
  //actualizar

export const updateInventory = async (restaurantId, inventoryId, inventaryData) => {
    try {
      const response = await axios.put(
        `http://localhost:4200/api/restaurante/${restaurantId}/inventory/${inventoryId}`,
        inventaryData
      );
      return response.data; // Devuelve el empleado actualizado
    } catch (error) {
      console.error("Error al actualizar el inventario:", error);
      throw error;
    }
  };
  

  //eliminar
  
  export const deleteInventory = async (restaurantId, inventoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4200/api/restaurante/${restaurantId}/inventory/${inventoryId}`
      );
      return response.data; // Devuelve una confirmación de eliminación
    } catch (error) {
      console.error("Error al eliminar el inventario:", error);
      throw error;
    }
  };
  
  
