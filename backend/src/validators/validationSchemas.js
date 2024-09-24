"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSchema = exports.userProfileSchema = exports.workScheduleIdSchema = exports.updateWorkScheduleSchema = exports.createWorkScheduleSchema = exports.updateTaskSchema = exports.createTaskSchema = exports.userIdParamSchema = exports.idParamSchema = exports.updateNoteSchema = exports.createNoteSchema = exports.userLoginSchema = exports.userRegistrationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Validaciones:
// Para el registro
exports.userRegistrationSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive(),
    role: joi_1.default.string()
        .valid("admin", "maintenance", "cleaning", "delivery")
        .required()
        .messages({
        "any.only": "Rol inválido",
        "any.required": "El rol es requerido",
    }),
    username: joi_1.default.string()
        .min(3)
        .max(20)
        .pattern(/^(?![-_])[A-Za-z0-9Ññ_-]{1,18}[A-Za-z0-9Ññ](?<![-_])$/)
        .required()
        .messages({
        "string.min": "El nombre de usuario debe tener mínimo 3 caracteres",
        "string.max": "El nombre de usuario debe tener máximo 20 caracteres",
        "string.pattern.base": 'El nombre de usuario puede contener números, mayúsculas, minúsculas, "-" y "_". No puede empezar ni terminar con "-" o "_"',
        "any.required": "El nombre de usuario es requerido",
    }),
    name: joi_1.default.string()
        .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        .max(100)
        .required()
        .messages({
        "string.pattern.base": "El nombre solo puede contener letras y espacios",
        "string.max": "El nombre debe tener máximo 100 caracteres",
        "any.required": "El nombre es requerido",
    }),
    firstname: joi_1.default.string()
        .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        .max(100)
        .required()
        .messages({
        "string.pattern.base": "El primer apellido solo puede contener letras y espacios",
        "string.max": "El primer apellido debe tener máximo 100 caracteres",
        "any.required": "El primer apellido es requerido",
    }),
    lastname: joi_1.default.string()
        .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        .max(100)
        .required()
        .messages({
        "string.pattern.base": "El segundo apellido solo puede contener letras y espacios",
        "string.max": "El segundo apellido debe tener máximo 100 caracteres",
        "any.required": "El segundo apellido es requerido",
    }),
    dni: joi_1.default.string()
        .regex(/^[A-Za-z0-9]+$/)
        .max(16)
        .required()
        .messages({
        "string.pattern.base": "El DNI o NIE solo puede contener números y letras",
        "string.max": "El DNI o NIE debe tener máximo 16 caracteres",
        "any.required": "El DNI o NIE es requerido",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Formato de email inválido",
        "any.required": "El email es requerido",
    }),
    telephone: joi_1.default.string()
        .pattern(/^\d{9,15}$/)
        .max(20)
        .required()
        .messages({
        "string.pattern.base": "El teléfono solo puede contener entre 9 y 15 números",
        "string.max": "El teléfono debe tener máximo 20 caracteres",
        "any.required": "El teléfono es requerido",
    }),
    address: joi_1.default.string()
        .pattern(/^[A-Za-zÀ-ÿ\d\s,]+$/)
        .required()
        .messages({
        "string.pattern.base": 'Dirección sólo admite letras, números, "," y espacios',
        "any.required": "La dirección es requerida",
    }),
    postal_code: joi_1.default.string()
        .pattern(/^\d{4,10}$/)
        .required()
        .messages({
        "string.pattern.base": "El código postal debe ser un número entre 4 y 10 dígitos.",
        "any.required": "El código postal es requerido",
    }),
    password: joi_1.default.string()
        .min(8)
        .max(30)
        .regex(/[A-Z]/, "uppercase")
        .regex(/[a-z]/, "lowercase")
        .regex(/\d/, "number")
        .regex(/[@$!%*?&.#]/, "special")
        .required()
        .messages({
        "string.min": "La contraseña debe tener mínimo 8 caracteres",
        "string.max": "La contraseña debe tener máximo 30 caracteres",
        "string.pattern.uppercase": "La contraseña debe contener al menos una letra mayúscula",
        "string.pattern.lowercase": "La contraseña debe contener al menos una letra minúscula",
        "string.pattern.number": "La contraseña debe contener al menos un número",
        "string.pattern.special": "La contraseña debe contener al menos un símbolo especial (@$!%*?&.#)",
        "any.required": "La contraseña es requerida",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
// Para el login
exports.userLoginSchema = joi_1.default.object({
    username: joi_1.default.string().required().messages({
        "any.required": "El nombre de usuario es requerido",
    }),
    password: joi_1.default.string().required().messages({
        "any.required": "La contraseña es requerida",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
// Para la creación de notas
exports.createNoteSchema = joi_1.default.object({
    user_id: joi_1.default.number().integer().required().positive().messages({
        "number.base": "El ID de usuario debe ser un número entero",
        "any.required": "El ID de usuario es requerido",
        "number.positive": "El ID de usuario debe ser un número positivo",
    }),
    title: joi_1.default.string().max(30).required().messages({
        "string.max": "El título no puede exceder los 255 caracteres",
        "any.required": "El título es requerido",
    }),
    description: joi_1.default.string().max(800).required().messages({
        "any.required": "La descripción es requerida",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
// Para la actualización de notas
exports.updateNoteSchema = joi_1.default.object({
    title: joi_1.default.string().max(30).required().messages({
        "string.max": "El título no puede exceder los 255 caracteres",
        "any.required": "El título es requerido",
    }),
    description: joi_1.default.string().max(800).required().messages({
        "any.required": "La descripción es requerida",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive(),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
exports.userIdParamSchema = joi_1.default.object({
    userId: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'El ID de usuario debe ser un número.',
        'number.integer': 'El ID de usuario debe ser un número entero.',
        'number.positive': 'El ID de usuario debe ser un número positivo.',
        'any.required': 'El ID de usuario es obligatorio.'
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
// Para la creación de tareas
exports.createTaskSchema = joi_1.default.object({
    title: joi_1.default.string().max(30).required().messages({
        "string.max": "El título no puede exceder los 255 caracteres",
        "any.required": "El título es requerido",
    }),
    description: joi_1.default.string().max(200).required().messages({
        "any.required": "La descripción es requerida",
    }),
    status: joi_1.default.string()
        .valid("pending", "in_progress", "completed")
        .required()
        .messages({
        "any.only": "El estado de la tarea debe ser uno de los siguientes: pending, in_progress, completed",
        "any.required": "El estado de la tarea es requerido",
    }),
    user_id: joi_1.default.number().integer().positive().required().messages({
        "number.base": "El ID de usuario debe ser un número entero",
        "any.required": "El ID de usuario es requerido",
        'number.positive': 'El ID de usuario debe ser un número positivo',
    }),
    completed_at: joi_1.default.date().optional().messages({
        "date.base": "La fecha de finalización debe ser válida",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
// Para la actualización de tareas
exports.updateTaskSchema = joi_1.default.object({
    title: joi_1.default.string().max(30).required().messages({
        "string.max": "El título no puede exceder los 255 caracteres",
        "any.required": "El título es requerido",
    }),
    description: joi_1.default.string().max(200).required().messages({
        "any.required": "La descripción es requerida",
    }),
    status: joi_1.default.string()
        .valid("pending", "in_progress", "completed")
        .required()
        .messages({
        "any.only": "El estado de la tarea debe ser uno de los siguientes: pending, in_progress, completed",
    }),
    completed_at: joi_1.default.date().optional().messages({
        "date.base": "La fecha de finalización debe ser válida",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
exports.createWorkScheduleSchema = joi_1.default.object({
    user_id: joi_1.default.number().integer(),
    start_time: joi_1.default.date().iso().required().messages({
        "date.base": "La fecha y hora de inicio debe ser válida",
        "any.required": "La fecha y hora de inicio es requerida",
        'date.format': 'La fecha de inicio debe estar en formato ISO 8601',
    }),
    end_time: joi_1.default.date().iso().required().greater(joi_1.default.ref('start_time')).messages({
        'date.format': 'La fecha de finalización debe estar en formato ISO 8601',
        'any.required': 'La hora de finalización es requerida',
        'date.greater': 'La hora de finalización debe ser posterior a la hora de inicio',
    }),
    description: joi_1.default.string().required().messages({
        "string.empty": "La descripción no puede estar vacía",
    }),
    day_of_week: joi_1.default.string()
        .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
        .required()
        .messages({
        "any.only": "El día de la semana debe ser uno de: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
        "any.required": "El día de la semana es requerido",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
// Esquema de validación para la actualización de horarios laborales
exports.updateWorkScheduleSchema = joi_1.default.object({
    start_time: joi_1.default.date().iso().required().messages({
        "date.base": "La fecha y hora de inicio debe ser válida",
        'date.format': 'La fecha de inicio debe estar en formato ISO 8601',
        "any.required": "La fecha y hora de inicio es requerida",
    }),
    end_time: joi_1.default.date().iso().required().messages({
        "date.base": "La fecha y hora de fin debe ser válida",
        'date.format': 'La fecha de inicio debe estar en formato ISO 8601',
        "any.required": "La fecha y hora de fin es requerida",
    }),
    description: joi_1.default.string().required().messages({
        "string.empty": "La descripción no puede estar vacía",
    }),
    day_of_week: joi_1.default.string()
        .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
        .required()
        .messages({
        "any.only": "El día de la semana debe ser uno de: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
        "any.required": "El día de la semana es requerido",
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
exports.workScheduleIdSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive(),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
exports.userProfileSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(20).required().messages({
        'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
        'string.max': 'El nombre de usuario no debe exceder los 20 caracteres',
        'any.required': 'El nombre de usuario es requerido',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Formato de email inválido',
        'any.required': 'El email es requerido',
    }),
    created_at: joi_1.default.string(),
    updated_at: joi_1.default.string()
});
exports.deleteUserSchema = exports.idParamSchema;