const InvariantError = require('../../exceptions/InvariantError')
const { PricingPayloadSchema } = require('./schema')

const PricingValidator = {
  validatePricingPayload: (payload) => {
    const validationResult = PricingPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = PricingValidator
