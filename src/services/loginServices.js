import axios from "axios";

const apiBaseUrl = "http://localhost:4200/api"; // Base URL

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/register`, userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response ? error.response.data : new Error("Error en la solicitud al servidor");
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Error en la solicitud al servidor");
    }
};
