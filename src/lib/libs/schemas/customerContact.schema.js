const Joi = require("joi");

const id = Joi.number().integer();
const fname = Joi.string().max(255);
const lname = Joi.string().max(255);
const phone = Joi.string().max(50);
const email = Joi.string().email().max(255);
const address = Joi.string().max(500);
const birth = Joi.date();

const nationality = Joi.string().max(100).allow(null);
const occupation = Joi.string().max(100).allow(null);
const advisor = Joi.string().max(100).allow(null);
const income = Joi.number().integer().allow(null);
const networth = Joi.number().allow(null);
const openingAccount = Joi.number().integer().allow(null);
const accountType = Joi.string().max(50).allow(null);
const risk = Joi.number().integer().allow(null);
const experience = Joi.string().max(100).allow(null);
const purpose = Joi.string().max(255).allow(null);
const accountBefore = Joi.string().max(100).allow(null);
const beneficiary = Joi.string().max(255).allow(null);
const bank = Joi.string().max(255).allow(null);
const signature = Joi.string().allow(null);
const sigdate = Joi.date().allow(null);

export const createCustomerContactSchema = Joi.object({
  fname: fname.required(),
  lname: lname.required(),
  phone: phone.required(),
  email: email.required(),
  address: address.required(),
  birth: birth.required(),
  nationality,
  occupation,
  advisor,
  income,
  networth,
  openingAccount,
  accountType,
  risk,
  experience,
  purpose,
  accountBefore,
  beneficiary,
  bank,
  signature,
  sigdate,
});

export const updateCustomerContactSchema = Joi.object({
  fname,
  lname,
  phone,
  email,
  address,
  birth,
  nationality,
  occupation,
  advisor,
  income,
  networth,
  openingAccount,
  accountType,
  risk,
  experience,
  purpose,
  accountBefore,
  beneficiary,
  bank,
  signature,
  sigdate,
});

export const getCustomerContactSchema = Joi.object({
  id: id.required(),
});
