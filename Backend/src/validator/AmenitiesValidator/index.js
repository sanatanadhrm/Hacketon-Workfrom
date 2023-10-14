const InvariantError = require('../../exceptions/InvariantError')
const { AmenitiesPayloadSchema } = require('./schema')

const AmenitiesValidator = {
  validateAmenitiesPayload: (payload) => {
    const validationResult = AmenitiesPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = AmenitiesValidator
