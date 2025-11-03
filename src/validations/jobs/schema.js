const Joi = require('joi');

const JobPostPayloadSchema = Joi.object({
  title: Joi.string().max(255).required(),
  descriptions: Joi.string().required(),
  companyName: Joi.string().max(255).required(),
  salary: Joi.number().required(),
  location: Joi.string().max(255).required(),
});

const JobQueryPayloadSchema = Joi.object({
  location: Joi.string().max(255),
  salary: Joi.number(),
});

module.exports = {
  JobPostPayloadSchema,
  JobQueryPayloadSchema,
};