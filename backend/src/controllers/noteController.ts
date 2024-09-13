import { Request, Response } from 'express';
import { db } from '../config/db';

// Clase de error personalizada para el manejo de notas
class NoteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoteError';
  }
}

// Obtener todas las notas
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await db.any('SELECT * FROM notes');
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener una nota por ID
export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const note = await db.oneOrNone('SELECT * FROM notes WHERE id = $1', [id]);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error fetching note by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Crear una nueva nota
export const createNote = async (req: Request, res: Response) => {
  const { content, userId } = req.body;

  try {
    // Verificar que el contenido y el userId estén presentes
    if (!content || !userId) {
      throw new NoteError('Content and userId are required');
    }

    const result = await db.one(
      'INSERT INTO notes (content, user_id) VALUES ($1, $2) RETURNING id',
      [content, userId]
    );
    res.status(201).json({ id: result.id, content, userId });
  } catch (error) {
    if (error instanceof NoteError) {
      console.error('Note creation error:', error.message);
      res.status(400).json({ message: error.message }); // Errores de validación específicos
    } else {
      console.error('Error creating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Actualizar una nota existente
export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      throw new NoteError('Content is required');
    }

    const result = await db.result(
      'UPDATE notes SET content = $1 WHERE id = $2',
      [content, id]
    );
    if (result.rowCount) {
      res.json({ message: 'Note updated' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    if (error instanceof NoteError) {
      console.error('Note update error:', error.message);
      res.status(400).json({ message: error.message }); // Errores de validación específicos
    } else {
      console.error('Error updating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Eliminar una nota
export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await db.result('DELETE FROM notes WHERE id = $1', [id]);
    if (result.rowCount) {
      res.json({ message: 'Note deleted' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
