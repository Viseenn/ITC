const Joi = require("joi");

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().required(),
  shortname: Joi.string().required(),
  biodata: Joi.string().required(),
  angkatan: Joi.number().integer().required(),
  jabatan: Joi.string().required(),
}).unknown();

const userUpdateSchema = Joi.object({
  fullname: Joi.string().required(),
  shortname: Joi.string().required(),
  biodata: Joi.string().required(),
  angkatan: Joi.number().integer().required(),
  jabatan: Joi.string().required(),
}).unknown();

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().required(),
  shortname: Joi.string().required(),
  biodata: Joi.string().required(),
  angkatan: Joi.number().integer().required(),
  jabatan: Joi.string().required(),
});

module.exports = {
  userCreateSchema,
  userUpdateSchema,
  userLoginSchema,
  userRegisterSchema,
};
