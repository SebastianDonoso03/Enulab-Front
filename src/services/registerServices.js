import axios from "axios";

// URL base, como lo solicitaste
const API_URL = "http://localhost:4200/api";

// Crear una instancia de axios configurada con la URL base
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Función para registrar un usuario
export const register = async (userData) => {
    try {
        const response = await api.post("/register", userData);        
        // Aceptar tanto 200 como 201 como respuesta exitosa
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            console.error(`Respuesta no exitosa del servidor: ${response.statusText}`);
            throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
    } catch (error) {
        if (error.response) {
            // Errores con respuesta del servidor
            console.error("Error en la respuesta del servidor:", error.response.data);
            console.error("Detalles del error:", error.response); // Mostrar más detalles sobre el error recibido
            throw new Error(error.response.data.message || "Error en el servidor");
        } else if (error.request) {
            // Error en la solicitud (sin respuesta del servidor)
            console.error("Error en la solicitud:", error.request);
            throw new Error("Error en la solicitud. Por favor, inténtalo más tarde.");
        } else {
            // Otro tipo de error
            console.error("Error desconocido:", error.message);
            throw new Error("Ha ocurrido un error desconocido");
        }
    }
};
// Asignar el objeto a una variable con nombre
const registerServices = {
    register,
};

// Exportar la variable
export default registerServices;