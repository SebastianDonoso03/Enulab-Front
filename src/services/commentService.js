import axios from "axios";

export const getCommentByRestaurant = async(restaurantId, commentData) =>{
    try {
        const response = await axios.get(
            `http://localhost:4200/api/restaurante/${restaurantId}/comments`, commentData
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener el comentario', error)
        throw error
    }
}