// lib/db/config.js

// 🚨 CAMBIO DE RUTA: Apuntamos al nuevo archivo de configuración.
const { config } = require("@/lib/config/config");

export default {
  // Configuración para el entorno de desarrollo (usado por la CLI)
  development: {
    url: config.dbUrl || "sqlite::memory:", // Usa la URL de la DB o una base de datos en memoria para desarrollo
    dialect: "mysql",
    // 💡 Opcional: Para usar la configuración detallada de tu .env en desarrollo
    // host: config.dbHost,
    // username: config.dbUser,
    // password: config.dbPassword,
    // database: config.dbName,
    // port: config.dbPort
  },

  // Configuración para el entorno de producción (usado por la CLI)
  production: {
    url: config.dbUrl, // Utiliza la variable DATABASE_URL de Vercel/Producción
    dialect: "mysql",
    // 💡 IMPORTANTE: Si usas SSL en producción, la CLI DEBE saberlo.
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
  },
};
