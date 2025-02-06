import axios from "axios";

const API_URL = "http://localhost:4200/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (correoElectronico, password) => {
    try {
        const response = await api.post("/login", { correoElectronico, password });
        if (response.status === 200) {
            const { token, user_id } = response.data; // Obtener el token y el user_id
                localStorage.setItem('token', token); // Guardar el token
                localStorage.setItem('user_id', user_id); // Guardar el user_id
            return response.data;
        } else {
            throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            throw new Error(error.response.data.message || "Error en el servidor");
        } else if (error.request) {
            console.error("Error en la solicitud:", error.request);
            throw new Error("Error en la solicitud. Por favor, inténtalo más tarde.");
        } else {
            console.error("Error desconocido:", error.message);
            throw new Error("Ha ocurrido un error desconocido");
        }
    }
};
// Asignar el objeto a una variable con nombre
const loginServices = {
    login,
};

// Exportar la variable
export default loginServices;