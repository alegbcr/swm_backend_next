// lib/db/sequelize.js

import { Sequelize } from "sequelize";
// 🚨 CAMBIO 1: El path de configuración debe ser actualizado.
import { config } from "../config/config";
import { setupModels } from "./models/index";

// 🚨 CAMBIO 2: Usamos una variable global para almacenar la conexión
// y reusarla si ya existe. Esto es CLAVE en Serverless.
let sequelizeInstance;

export const initializeSequelize = () => {
  // Si la instancia ya existe, la devolvemos inmediatamente.
  if (sequelizeInstance) {
    return sequelizeInstance;
  }

  // Si no existe, la creamos.
  sequelizeInstance = new Sequelize(config.dbUrl, {
    // Configuraciones específicas de Serverless:
    logging: false, // Desactivar logs de SQL en producción
    dialectOptions: {
      ssl: config.isProd
        ? {
            // Conexión SSL/TLS solo si es producción (por seguridad)
            require: true,
            rejectUnauthorized: false, // Puede ser necesario para algunos hosts
          }
        : false,
    },
    // 💡 CLAVE: Configuración del Pool de Conexiones para Serverless
    pool: {
      max: 5, // Número máximo de conexiones activas
      min: 0, // Mínimo de conexiones inactivas
      acquire: 30000,
      idle: 10000, // Tiempo en ms que una conexión puede estar inactiva antes de ser cerrada.
      // En Serverless, este valor DEBE ser bajo para liberar conexiones rápido.
    },
  });

  // Inicializamos los modelos una sola vez
  setupModels(sequelizeInstance);

  return sequelizeInstance;
};
