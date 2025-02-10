import axios from 'axios';

export const createInventory = async (restaurantId, inventoryData) => {
  try {
    const response = await axios.post(
      `http://localhost:4200/api/restaurante/${restaurantId}/inventory`,
      inventoryData
    );
    return response.data; // Deberías recibir el nuevo empleado como respuesta
  } catch (error) {
    console.error("Error al crear el inventario:", error);
    throw error;
  }
};
