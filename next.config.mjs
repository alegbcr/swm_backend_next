// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. ESTO ES CORRECTO Y NECESARIO:
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "mysql2"],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // 2. CORRECCIÓN CLAVE: Debes agregar 'mysql2' y otros drivers
      // a la lista de 'externals' de Webpack también.
      config.externals.push(
        "pg",
        "pg-hstore",
        "sequelize", // Sequelize también debe ser externo para Webpack
        "mysql2", // 💡 ¡Agregamos mysql2 aquí!
        "sqlite3", // Por si acaso, para evitar errores de fallback
        "tedious" // Driver para MSSQL
      );
    }
    return config;
  },
};

export default nextConfig;
