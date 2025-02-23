import axios from 'axios';

const API_URL = 'http://localhost:4200'; // Cambia esto según tu configuración

// Crear una instancia de axios con la configuración necesaria
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createRestaurant = async (formData) => {
    const user_id = localStorage.getItem('user_id'); // Obtener el user_id del localStorage
        if (!user_id) {
            throw new Error('No se ha encontrado el user_id. El usuario debe estar autenticado.');
        }
    const data = new FormData();
    data.append('name', formData.name);
    data.append('ubicacion', formData.ubicacion);
    data.append('objetivos', formData.objetivos);
    data.append('descripcion', formData.descripcion);
    data.append('logo', formData.logo);
    data.append('user_id', user_id); // Enviar el user_id al servidor
    try {
        const response = await api.post("/api/restaurante", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
            return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            throw new Error(error.response.data.error || "Error en el servidor");
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
            throw new Error("Error en la solicitud. Por favor, inténtalo más tarde.");
        } else {
            console.error("Error desconocido:", error.message);
            throw new Error("Ha ocurrido un error desconocido");
        }
    }
};

export const getRestaurantsByUser = async () => {
    const user_id = localStorage.getItem('user_id');
    console.log('User ID:', user_id);
    if (!user_id) {
        throw new Error('No se ha encontrado el user_id. El usuario debe estar autenticado.');
    }
    try {
        const response = await api.get(`api/restaurante/${user_id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting restaurant:", error);
    }
}

//Actualizar

export const updateRestaurant = async (id, formData) => {
    try {
        const response = await api.put(`/api/restaurante/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }); // Usamos la instancia de axios
        return response.data; // Retornamos los datos de la respuesta
    } catch (error) {
        console.error("Error updating restaurant:", error.response?.data || error.message);
        throw error;
    }
};

//eliminar

export const deleteRestaurant = async (restaurantId) => {
    const user_id = localStorage.getItem('user_id'); // Obtener el user_id del localStorage
    if (!user_id) {
        throw new Error('No se ha encontrado el user_id. El usuario debe estar autenticado.');
    }

    try {
        const response = await api.delete(`/api/restaurante/${restaurantId}`, {
            data: { user_id }, // Pasar el user_id en la solicitud para validación en el servidor
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            throw new Error(error.response.data.error || "Error en el servidor");
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
            throw new Error("Error en la solicitud. Por favor, inténtalo más tarde.");
        } else {
            console.error("Error desconocido:", error.message);
            throw new Error("Ha ocurrido un error desconocido");
        }
    }
};

