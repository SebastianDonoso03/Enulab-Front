import React,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import { getAllRestaurants } from "../../services/restaurantServices"; 
import "../../styles/Restaurantes.css";
import "../../images/logo.png";
const Restaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]); // Estado para los restaurantes
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllRestaurants(); // Llamada al servicio
        setRestaurantes(data); // Almacenar los restaurantes obtenidos
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchRestaurants(); // Llamar la función para obtener los restaurantes
  }, []); // Se ejecuta una sola vez al cargar el componente

  return (
    <div className="restaurantes-container min-vh-100 w-100">
      <h2 className="restaurantes-title">Mis restaurantes</h2>

      <div className="d-flex justify-content-end">
        <Link to="/crear-restaurantes" className="btn btn-primary">
          Agregar restaurante +
        </Link>
      </div>

      {loading ? ( // Mostrar un indicador de carga mientras los datos se están recuperando
        <div>Loading...</div>
      ) : (
        <div className="restaurantes-grid">
          {restaurantes.length > 0 ? (
            restaurantes.map((rest) => (
              <div key={rest.id} className="restaurante-card">
                <div className="restaurante-info">
                  <img
                    src={require("../../images/logo.png")}
                    alt="Logo"
                    className="restaurante-logo"
                  />
                  <h3>{rest.name}</h3> {/* Mostrar el nombre del restaurante */}
                  <p>{rest.ubicacion}</p> {/* Mostrar la ubicación o tipo de comida */}
                </div>
              </div>
            ))
          ) : (
            <p>No hay restaurantes disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurantes;