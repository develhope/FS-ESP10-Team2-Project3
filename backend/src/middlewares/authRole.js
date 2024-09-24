"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utils/logger"));
const rolePermissions = {
    admin: {
        tasks: ['create', 'read', 'update', 'delete'],
        users: ['create', 'read', 'update', 'delete'],
        notes: ['create', 'read', 'update', 'delete'],
        work_schedules: ['create', 'read', 'update', 'delete'],
    },
    maintenance: {
        tasks: ['read', 'update'],
        users: [],
        notes: ['create', 'read', 'update', 'delete'],
        work_schedules: ['create', 'read'],
    },
    cleaning: {
        tasks: ['read', 'update'],
        users: [],
        notes: ['create', 'read', 'update', 'delete'],
        work_schedules: ['create', 'read'],
    },
    delivery: {
        tasks: ['read', 'update'],
        users: [],
        notes: ['create', 'read', 'update', 'delete'],
        work_schedules: ['create', 'read'],
    },
};
const authorizeRole = (entity, action) => {
    return (req, res, next) => {
        var _a;
        const user = req.user;
        if (!user || !user.role) {
            logger_1.default.warning("User not authenticated");
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
        }
        const { role, id } = user;
        if (!isValidRole(role)) {
            logger_1.default.error(`Invalid role: ${role}`);
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: 'Invalid role' });
        }
        // Verificar si el rol tiene permiso para la acción solicitada en la entidad
        if (rolePermissions[role] && ((_a = rolePermissions[role][entity]) === null || _a === void 0 ? void 0 : _a.includes(action))) {
            // Restricción para creación de horarios
            if (entity === 'work_schedules') {
                const scheduleUserId = req.params.workerId || req.body.workerId;
                // Validación para creación de horarios
                if (action === 'create' && role !== 'admin' && scheduleUserId && scheduleUserId !== id) {
                    logger_1.default.warning("User attempting to create schedule for another user");
                    return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: 'Cannot create schedule for another user' });
                }
                // Validación para lectura de horarios
                if (action === 'read' && role !== 'admin' && scheduleUserId && scheduleUserId !== id) {
                    // No pueden leer horarios de otros usuarios, excepto el admin
                    return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: 'Access denied to this schedule' });
                }
            }
            logger_1.default.success(`User ${role} authorized for action: ${action} on entity: ${entity}`);
            next();
        }
        else {
            logger_1.default.error(`Access denied: Role ${role} does not have permission for ${action} on ${entity}`);
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: 'Access denied' });
        }
    };
};
exports.authorizeRole = authorizeRole;
// Función para verificar si el rol es válido
function isValidRole(role) {
    const validRoles = ['admin', 'maintenance', 'cleaning', 'delivery'];
    return validRoles.includes(role);
}
