import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { getCommentByRestaurant } from "../../services/commentService";

const Reserva = () => {
    const restaurantId = localStorage.getItem("selectedRestaurantId");
    const [comment, setComment] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const data = await getCommentByRestaurant(restaurantId);
                setComment(data);
            } catch (error) {
                console.error("Error al obtener las Comentario:", error);
            }
        };
        fetchReservas();
    }, [restaurantId]);

    return (
        comment.length === 0 ? (
            <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>No hay reservas disponibles</Typography>
        ) : (
            comment.map((comment) => (
                <Card key={comment.id} sx={{ maxWidth: 300, borderRadius: "50px", boxShadow: 3, padding: 2, mb: 2 }}>
                    <CardContent>
                        <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>Puntuacion:{comment.rating} 🌟</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>Nota: {comment.content}</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>Fecha: {new Date(comment.date).toISOString().split('T')[0]}</Typography>
                    </CardContent>
                </Card>
            ))
        )
    );
}

export default Reserva;
