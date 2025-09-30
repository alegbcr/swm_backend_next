const { models } = require("../db/sequelize");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404; // Etiqueta para que el controlador sepa qué status devolver
  }
}

class CustomerContactService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.CustomerContact.create(data);
    return newCustomer;
  }

  async find() {
    const allUsers = await models.CustomerContact.findAll();
    return allUsers;
  }

  async findOne(id) {
    const userById = await models.CustomerContact.findByPk(id);

    // 💡 CAMBIO DE LÓGICA: Lanzar el nuevo error NotFoundError
    if (!userById) {
      // throw boom.notFound('User not found'); <--- ANTES
      throw new NotFoundError("User not found"); // <--- AHORA
    }
    return userById;
  }

  async update(id, changes) {
    // Si findOne lanza un error 404, se propagará automáticamente.
    const customerContact = await this.findOne(id);
    const userUpdated = await customerContact.update(changes);
    return userUpdated;
  }

  async delete(id) {
    // Si findOne lanza un error 404, se propagará.
    const user = await this.findOne(id);
    await user.destroy();

    // Devolvemos true o el objeto eliminado para indicar que fue exitoso
    return true;
  }
}

// Exportamos la clase CustomerContactService y el nuevo error
module.exports = { CustomerContactService, NotFoundError };
