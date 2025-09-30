const { Sequelize, DataTypes, Model } = require("sequelize");

const CUSTOMER_CONTACT_TABLE = "customerContact";

const CustomerContactSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  advisor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  income: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  networth: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  openingAccount: {
    field: "opening_account",
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accountType: {
    field: "account_type",
    type: DataTypes.STRING,
    allowNull: true,
  },
  risk: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountBefore: {
    field: "account_before",
    type: DataTypes.STRING,
    allowNull: true,
  },
  beneficiary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sigdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
};

class CustomerContact extends Model {
  static associate() {
    // Aquí van las relaciones (por ejemplo, Customer.hasMany(...))
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_CONTACT_TABLE,
      modelName: "CustomerContact",
      timestamps: false,
    };
  }
}

module.exports = {
  CUSTOMER_CONTACT_TABLE,
  CustomerContactSchema,
  CustomerContact,
};
