const InvariantError = require('../../exceptions/InvariantError')
const { FacilitiesPayloadSchema } = require('./schema')

const FacilitiesValidator = {
  validateFacilitiesPayload: (payload) => {
    const validationResult = FacilitiesPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = FacilitiesValidator
