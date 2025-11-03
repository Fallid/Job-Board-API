const InvariantError = require('../../exceptions/InvariantError');
const { UserPostPayloadSchema } = require('./schema');

const UserValidation = {
  userValidationPostPayload: (payload) => {
    const validationResult = UserPostPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError();
    }
  },
};

module.exports = UserValidation;