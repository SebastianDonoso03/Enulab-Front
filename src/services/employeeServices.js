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

//visualizar
export const getEmployeesByRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(
        `http://localhost:4200/api/restaurante/${restaurantId}/employee`
      );
      return response.data; // Devuelve los empleados del restaurante
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      throw error;
    }
  };

  export const getEmployeeById = async (restaurantId, employeeId) => {
    try {
      const response = await axios.get(
        `http://localhost:4200/api/restaurante/${restaurantId}/employee/${employeeId}`
      );
      return response.data; // Devuelve los detalles del empleado específico
    } catch (error) {
      console.error("Error al obtener el empleado:", error);
      throw error;
    }
  };
  
//actualizar

export const updateEmployee = async (restaurantId, employeeId, employeeData) => {
  try {
    const response = await axios.put(
      `http://localhost:4200/api/restaurante/${restaurantId}/employee/${employeeId}`,
      employeeData
    );
    return response.data; // Devuelve el empleado actualizado
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    throw error;
  }
};


//eliminar

export const deleteEmployee = async (restaurantId, employeeId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4200/api/restaurante/${restaurantId}/employee/${employeeId}`
    );
    return response.data; // Devuelve una confirmación de eliminación
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    throw error;
  }
};

