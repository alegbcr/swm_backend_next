// lib/db/models/index.js (Actualizado)

const {
  CustomerContact,
  CustomerContactSchema,
} = require("./customerContact.model");

/**
 * Función que inicializa todos los modelos de Sequelize.
 * @param {Sequelize} sequelize La instancia de Sequelize.
 */
function setupModels(sequelize) {
  // Inicializamos cada modelo
  CustomerContact.init(
    CustomerContactSchema,
    CustomerContact.config(sequelize)
  );

  // 💡 Opcional: Si tuvieras asociaciones, puedes llamarlas aquí
  // for (const modelName in sequelize.models) {
  //   if (sequelize.models[modelName].associate) {
  //     sequelize.models[modelName].associate(sequelize.models);
  //   }
  // }
}

// 💡 Nuevo: Exportamos un objeto con la función
module.exports = setupModels;
