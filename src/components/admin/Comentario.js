import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getCommentByRestaurant } from "../../services/commentService";

const Reserva = () => {
    const restaurantId = localStorage.getItem("selectedRestaurantId");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getCommentByRestaurant(restaurantId);
                setComments(data);
            } catch (error) {
                console.error("Error al obtener los comentarios:", error);
            }
        };
        fetchComments();
    }, [restaurantId]);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 3,
                p: 3,
            }}
        >
            {comments.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
                    No hay comentarios disponibles
                </Typography>
            ) : (
                comments.map((comment) => (
                    <Card
                        key={comment.id}
                        sx={{
                            maxWidth: 350,
                            borderRadius: "15px",
                            boxShadow: 3,
                            p: 2,
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": { transform: "scale(1.03)" },
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                                {comment.name}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                                <strong>Puntuación:</strong> {comment.rating} ⭐
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic" }}>
                                "{comment.content}"
                            </Typography>
                            <Typography variant="caption" sx={{ display: "block", color: "#888", mt: 1 }}>
                                Fecha: {new Date(comment.date).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default Reserva;
