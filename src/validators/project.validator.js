const Joi = require("joi");

const projectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  link: Joi.string().uri().optional(),
  stack: Joi.string().optional(),
});

module.exports = projectSchema;
