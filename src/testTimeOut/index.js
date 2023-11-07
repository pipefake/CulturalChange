import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TestTimeOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/qrMuseo");
    }, 60000); // 600,000 ms = 10 minutos

    return () => clearTimeout(timeout); // Limpia el temporizador al desmontar el componente
  }, [navigate]);

  return <h1>Test de TimeOut</h1>;
}

export { TestTimeOut };
