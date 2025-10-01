// lib/db/models/index.js (Actualizado)

import {
  CustomerContact,
  CustomerContactSchema,
} from "./customerContact.model";

/**
 * Función que inicializa todos los modelos de Sequelize.
 * @param {Sequelize} sequelize La instancia de Sequelize.
 */
export function setupModels(sequelize) {
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
