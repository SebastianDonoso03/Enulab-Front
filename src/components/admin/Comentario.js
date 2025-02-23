import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 3, p: 3 }}>
            {comment.length === 0 ? (
                <Typography variant="body1" sx={{ fontSize: "1.5rem", textAlign: "center" }}>
                    No hay reservas disponibles
                </Typography>
            ) : (
                comment.map((comment) => (
                    <Card key={comment.id} sx={{ width: "100%", maxWidth: 300, borderRadius: "20px", boxShadow: 3, padding: 2 }}>
                        <CardContent>
                            <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>Puntuación: {comment.rating} 🌟</Typography>
                            <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>Nota: {comment.content}</Typography>
                            <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>Fecha: {new Date(comment.date).toISOString().split('T')[0]}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
}

export default Reserva;
