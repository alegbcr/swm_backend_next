// lib/config/config.js

// 🚨 La línea require('dotenv').config(); HA SIDO ELIMINADA.

const config = {
  // Entorno
  env: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,

  // Credenciales de la Base de Datos
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,

  // URL de Conexión (Sequelize prefiere una sola URL si está disponible)
  dbUrl: process.env.DATABASE_URL,
};

module.exports = { config };
