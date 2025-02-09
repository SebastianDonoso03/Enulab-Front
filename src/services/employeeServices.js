import axios from 'axios';

export const createEmployee = async (restaurantId, employeeData) => {
  try {
    const response = await axios.post(
      `http://localhost:4200/api/restaurante/${restaurantId}/employee`,
      employeeData
    );
    return response.data; // Deberías recibir el nuevo empleado como respuesta
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    throw error;
  }
};
