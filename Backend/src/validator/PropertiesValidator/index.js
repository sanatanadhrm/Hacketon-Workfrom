const InvariantError = require('../../exceptions/InvariantError')
const { PropertiesPayloadSchema } = require('./schema')

const PropertiesValidator = {
  validatePropertiesPayload: (payload) => {
    const validationResult = PropertiesPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = PropertiesValidator
