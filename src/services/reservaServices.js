import axios from 'axios';

// Crear una reserva
export const createReservation = async (restaurantId, reservationData) => {
  try {
    const response = await axios.post(
      `http://localhost:4200/api/restaurante/${restaurantId}/reservations`,
      reservationData
    );
    return response.data; // Devuelve la reserva creada
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
};

// Obtener todas las reservas de un restaurante
export const getReservationsByRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(
      `http://localhost:4200/api/restaurante/${restaurantId}/reservations`
    );
    return response.data; // Devuelve todas las reservas del restaurante
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservationById = async (restaurantId, reservationId) => {
  try {
    const response = await axios.get(
      `http://localhost:4200/api/restaurante/${restaurantId}/reservations/${reservationId}`
    );
    return response.data; // Devuelve los detalles de la reserva específica
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    throw error;
  }
};

// Actualizar una reserva
export const updateReservation = async (restaurantId, reservationId, reservationData) => {
  try {
    const response = await axios.put(
      `http://localhost:4200/api/restaurante/${restaurantId}/reservations/${reservationId}`,
      reservationData
    );
    return response.data; // Devuelve la reserva actualizada
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    throw error;
  }
};

// Eliminar una reserva
export const deleteReservation = async (restaurantId, reservationId) => {
  try {
    const response = await axios.delete(
      `http://localhost:4200/api/restaurante/${restaurantId}/reservations/${reservationId}`
    );
    return response.data; // Devuelve una confirmación de eliminación
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    throw error;
  }
};
