// lib/validation.js (Nuevo Archivo)

// Importa Joi y un Error personalizado (si ya creaste el tuyo, úsalo)
import Joi from "joi";

// Creamos un error estándar para la validación que podremos atrapar fácilmente
// Nota: Puedes reutilizar cualquier clase Error base que ya tengas.
export class ValidationError extends Error {
  constructor(joiError) {
    // El mensaje de error será el primer mensaje de Joi
    super(`Validation Error: ${joiError.details[0].message}`);
    this.name = "ValidationError";
    this.status = 400; // Útil para el manejo del estado HTTP
    this.details = joiError.details;
  }
}

/**
 * Función de validación universal para Joi.
 * @param {Joi.Schema} schema - El esquema de Joi a validar.
 * @param {object} data - El objeto de datos a validar (e.g., body, params).
 * @throws {ValidationError} Si la validación falla.
 */
export const validate = (schema, data) => {
  // Configuración para permitir datos desconocidos pero no fallar prematuramente
  const { error } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    // Si hay un error, lanzamos nuestra clase de error personalizada.
    throw new ValidationError(error);
  }

  // Si no hay error, la función termina implícitamente sin devolver nada.
};
