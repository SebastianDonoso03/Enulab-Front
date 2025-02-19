import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Asegúrate de que el puerto coincide

function QrCodeViewer() {
  const [qr, setQr] = useState(""); // Estado para almacenar el QR como base64

  useEffect(() => {
    socket.on("qr", (data) => {
      console.log("QR recibido:", data); // Verifica que los datos del QR se están recibiendo
      setQr(data); // Establecer la URL base64 del QR en el estado
    });

    return () => {
      socket.off("qr"); // Limpiar el evento cuando el componente se desmonte
    };
  }, []);

  return (
    <div className="text-center">
      <h3>Escanea el QR para iniciar sesión en WhatsApp</h3>
      {qr ? (
        <img src={qr} alt="QR para WhatsApp" width={256} height={256} />
      ) : (
        <p>Esperando QR...</p>
      )}
    </div>
  );
}

export default QrCodeViewer;
