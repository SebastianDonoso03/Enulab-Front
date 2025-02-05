import axios from 'axios';

const apiUrl = 'http://localhost:4200/api/restaurante'; // Asegúrate de que esta URL sea la correcta

// Obtener todos los restaurantes
export const getAllRestaurants = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
}

// Obtener un restaurante por ID
export const getRestaurantById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurant by id:", error);
    }
}

// Crear un nuevo restaurante
export const createRestaurant = async (restaurantData) => {
    try {
        const response = await axios.post(apiUrl, restaurantData);
        return response.data;
    } catch (error) {
        console.error("Error creating restaurant:", error);
    }
}

export const updateRestaurant = async (id, restaurantData) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, restaurantData, {
            headers: { "Content-Type": "multipart/form-data" } // OPCIONAL, axios lo maneja automáticamente
        });
        return response.data;
    } catch (error) {
        console.error("Error updating restaurant:", error.response?.data || error.message);
        throw error; // Importante lanzar el error para manejarlo en el frontend
    }
};


// Eliminar un restaurante
export const deleteRestaurant = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting restaurant:", error);
    }
}
