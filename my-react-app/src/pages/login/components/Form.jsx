import React, { useState } from "react";
import "./Form.css";
import { Str } from "../../../utilities/js/utilities";

/**
 *1/ Componente de formulario controlado que utiliza las variables de CSS del root.
 * @returns {JSX.Element} El formulario renderizado.
 */
const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  /**
   ** Maneja el cambio en los campos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "username") {
      newValue = Str.replaceExceptChars(
        value,
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
        "",
        false
      );

      if (newValue.length > 30) {
        newValue = newValue.slice(0, 30);
      }
    }

    if (name === "password" && value.length > 30) {
      newValue = value.slice(0, 30);
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  /**
   ** Maneja el cambio en el checkbox para mostrar la contraseña.
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio.
   */
  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

  /**
   ** Maneja el envío del formulario.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  /**
   ** Verifica si el nombre de usuario y la contraseña son válidos.
   * @returns {boolean} - true si el nombre de usuario y la contraseña son válidos, false en caso contrario.
   */
  const isFormValid = () => {
    const { username, password } = formData;
    const isUsernameValid =
      username &&
      !username.startsWith("_") &&
      !username.startsWith("-") &&
      !username.endsWith("_") &&
      !username.endsWith("-");
    const isPasswordValid = password.length > 0;
    return isUsernameValid && isPasswordValid;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-title">Inicio de Sesión</div>
      <div className="form-description">
        Por favor, inicie sesión para usar la aplicación.
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Usuario
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-input"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </div>
      <div className="form-group form-checkbox-group">
        <input
          type="checkbox"
          id="show-password"
          checked={showPassword}
          onChange={handleCheckboxChange}
          className="form-checkbox"
        />
        <label htmlFor="show-password" className="form-checkbox-label">
          Mostrar Contraseña
        </label>
      </div>
      <button
        type="submit"
        className={`form-button ${
          !isFormValid() ? "form-button-disabled" : ""
        }`}
        disabled={!isFormValid()}
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default Form;
