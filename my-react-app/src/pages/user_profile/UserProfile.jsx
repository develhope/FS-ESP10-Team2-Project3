import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify"; // Importa react-toastify para notificaciones
import UserDetails from "./components/profile/UserDetails";
import Aside from "./components/Aside";
import Tasks from "./components/task/Tasks";
import Notes from "./components/notes/Notes";
import Calendar from "./components/calendar/Calendar";
import Apartments from "./components/apartments/Apartments";
import UserManagement from "./components/user_management/UserManagement";
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    // Verifica si el token existe, de lo contrario redirige a /login
    if (!token) {
      handleInvalidToken("Token no encontrado. Por favor, inicia sesión.");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const result = await response.json();
          const userData = result.data.user;

          setUserData(result.data.user);
          console.log("Todos los datos del usuario autenticado:", userData);
        } else {
          const result = await response.json();
          handleInvalidToken(result.message);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        handleInvalidToken(
          "Error al verificar el token. Por favor, intenta nuevamente."
        );
      }
    };

    verifyToken();
  }, [navigate]);

  /**
   ** Maneja el token inválido eliminándolo del almacenamiento de sesión y redirigiendo a la página de inicio de sesión.
   * @param {string} message - El mensaje a mostrar al usuario.
   */
  const handleInvalidToken = (message) => {
    console.warn(message);
    toast.error(message);
    sessionStorage.removeItem("authToken"); // Elimina el token del almacenamiento de sesión
    navigate("/login");
  };

  if (!userData) return null;

  return (
    <div className="user-profile-container">
      <Aside userData={userData} />
      <div className="user-profile-content">
        {location.pathname === "/user-profile" && (
          <UserDetails userData={userData} />
        )}

        {/* Verifica si el usuario es admin y renderiza UserManagement */}
        {userData.role === "admin" && (
          <Routes>
            <Route
              path="user-management"
              element={<UserManagement userData={userData} />}
            />
          </Routes>
        )}

        <Routes>
          <Route path="tasks" element={<Tasks userData={userData} />} />
          <Route path="notes" element={<Notes userData={userData} />} />
          <Route path="calendar" element={<Calendar userData={userData} />} />
          <Route
            path="apartments"
            element={<Apartments userData={userData} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
