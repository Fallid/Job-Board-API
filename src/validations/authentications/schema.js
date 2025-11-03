const Joi = require('joi');
const AuthenticationPostPayloadSchema = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(255).required(),
});

module.exports = {
  AuthenticationPostPayloadSchema,
};