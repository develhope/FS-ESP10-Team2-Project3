import React, { useState } from "react";

/**
 * Formulario para añadir una nueva nota
 * @param {Object} props - Recibe la función para añadir una nota y el ID del usuario
 * @returns {JSX.Element} Componente AddNoteForm
 */
const AddNoteForm = ({ onAddNote, userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Maneja el envío del formulario
   * @param {Object} e - Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Asegurarse de que el título no sea vacío
    if (!title.trim()) {
      console.error("Error: El título no puede estar vacío.");
      return;
    }

    const newNote = {
      title: title.trim(),
      description: description.trim(),
      user_id: userId,
    };

    console.log("Enviando nueva nota:", newNote); // Log para depurar

    onAddNote(newNote);

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-note-form">
      {/* Campo de entrada para el título */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la nota"
        required
      />
      {/* Campo de área de texto para la descripción */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción de la nota"
        required
      />
      {/* Botón de envío */}
      <button type="submit">Añadir Nota</button>
    </form>
  );
};

export default AddNoteForm;