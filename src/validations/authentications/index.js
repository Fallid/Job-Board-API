const InvariantError = require('../../exceptions/InvariantError');
const { AuthenticationPostPayloadSchema } =  require('./schema');

const AuthenticationValidation = {
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = AuthenticationPostPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports  = AuthenticationValidation;