//! Instalación de librería - npm install formik yup - para la gestión de formularios o validación

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./components/RegisterCss.css";

//! PENDIENTE: Mostrar contraseña y verificar contraseña (escribirla 2 veces)

function Register() {
  const formik = useFormik({
    initialValues: {
      rol: "", // Añadido el campo rol
      username: "",
      name: "",
      firstName: "",
      lastName: "",
      dni: "",
      email: "",
      telephone: "",
      address: "",
      cp: "",
      password: "",
    },

    validationSchema: Yup.object({
      rol: Yup.string()
        .oneOf(['Limpieza', 'Admin', 'Entrega', 'Mantenimiento'], 'Rol inválido')
        .required("Requerido"), // Validación para el rol
        
      username: Yup.string()
        .min(5, "El nombre de usuario debe tener mínimo 5 caracteres")
        .max(20, "El nombre de usuario debe tener máximo 20 caracteres ")
        .matches(
          /^(?![-_])[A-Za-z0-9_-]*(?<![-_])$/,
          "El nombre de usuario puede contener números, mayúsculas, minúsculas y - y/o _ . No puede empezar ni terminar con _ ni con - "
        )
        .required("Requerido"),
        
      name: Yup.string()
        .matches(
          /^[A-Za-zÀ-ÿ\s]+$/,
          "El nombre solo puede contener letras y espacios"
        )
        .required("Requerido"),

      firstName: Yup.string()
        .matches(
          /^[A-Za-zÀ-ÿ\s]+$/,
          "El primer nombre solo puede contener letras y espacios"
        )
        .required("Requerido"),

      lastName: Yup.string()
        .matches(
          /^[A-Za-zÀ-ÿ\s]+$/,
          "El apellido solo puede contener letras y espacios"
        )
        .required("Requerido"),

      dni: Yup.string()
        .matches(
          /^[A-Za-z0-9]+$/,
          "El DNI o NIE sólo puede contener números y letras"
        )
        .required("Requerido"),

      email: Yup.string()
        .email("Formato de email inválido")
        .required("Requerido"),

      telephone: Yup.string()
        .matches(/^\d+$/, "El teléfono solo puede contener números")
        .required("Requerido"),

      address: Yup.string()
        .matches(
          /^[A-Za-zÀ-ÿ\d\s/.]+$/,
          "Dirección sólo admite mayúsculas, minúsculas, números, ' / ' y ' . ' "
        )
        .required("Requerido"),

      cp: Yup.string()
        .matches(/^\d+$/, "El código postal solo puede contener números")
        .required("Requerido"),

      password: Yup.string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres")
        .max(30, "La contraseña debe tener máximo 30 caracteres")
        .matches(
          /[A-Z]/,
          "La contraseña debe contener al menos una letra mayúscula"
        )
        .matches(
          /[a-z]/,
          "La contraseña debe contener al menos una letra minúscula"
        )
        .matches(/\d/, "La contraseña debe contener al menos un número")
        .matches(/[\W_]/, "La contraseña debe contener al menos un símbolo")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!¡?¿.\-_&%$#@+])[A-Za-z\d!¡?¿.\-_&%$#@+]{6,}$/,
          "La contraseña admite los siguientes símbolos: !¡?¿.-_&%$#@+ "
        )
        .required("Requerido"),
    }),

    onSubmit: (values) => {
        //!  número de espacios para la indentación (2 en este caso), lo que hace que el JSON resultante sea más fácil de leer
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="formRegister">
        <div className="firstDiv">
          <label htmlFor="rol" className="required">Rol </label>
          <select
            id="rol"
            name="rol"
            onChange={formik.handleChange}
             //! formik.handleBlur : Cuando un campo pierde el foco, Formik marca ese campo como "touched" (tocado). Esto es útil para manejar la lógica de validación y errores. Por ejemplo, puedes decidir mostrar errores de validación solo después de que un campo haya sido tocado.
            onBlur={formik.handleBlur}
            value={formik.values.rol}
          >
            <option value="" label="Seleccione un rol" />
            <option value="Limpieza" label="Limpieza" className="limpieza"/>
            <option value="Admin" label="Admin" className="admin"/>
            <option value="Entrega" label="Entrega" className="entrega"/>
            <option value="Mantenimiento" label="Mantenimiento" className="mantenimiento"/>
          </select>
          {formik.touched.rol && formik.errors.rol ? (
            <div>{formik.errors.rol}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="username" className="required">Nombre de usuario </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="name" className="required">Nombre </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="firstName" className="required">Primer apellido </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="lastName" className="required">Segundo apellido </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="dni" className="required">DNI / NIE / PASAPORTE </label>
          <input
            id="dni"
            name="dni"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dni}
          />
          {formik.touched.dni && formik.errors.dni ? (
            <div>{formik.errors.dni}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="required">Email </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="telephone" className="required">Teléfono </label>
          <input
            id="telephone"
            name="telephone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone}
          />
          {formik.touched.telephone && formik.errors.telephone ? (
            <div>{formik.errors.telephone}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="address" className="required">Dirección </label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div>{formik.errors.address}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="cp" className="required">Código Postal </label>
          <input
            id="cp"
            name="cp"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cp}
          />
          {formik.touched.cp && formik.errors.cp ? (
            <div>{formik.errors.cp}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password" className="required">Contraseña </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="lastButton">Enviar</button>
      </form>
    </>
  );
}

export default Register;