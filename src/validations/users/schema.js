const Joi = require('joi');
const UserPostPayloadSchema = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(255).required(),
  fullname: Joi.string().max(100).required(),
  role: Joi.string().valid('employee', 'job_seeker').default('job_seeker'),
});

module.exports = {
  UserPostPayloadSchema,
};