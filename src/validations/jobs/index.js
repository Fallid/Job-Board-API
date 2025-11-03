const InvariantError = require('../../exceptions/InvariantError');
const { JobPostPayloadSchema, JobQueryPayloadSchema } = require('./schema');

const JobsValidation = {
  validatePostJobPayload: (payload) => {
    const validationResult = JobPostPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateQueryJobPayload: (payload) => {
    const validationResult = JobQueryPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = JobsValidation;