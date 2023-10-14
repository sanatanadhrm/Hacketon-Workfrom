const Joi = require('joi')

const PricingPayloadSchema = Joi.object({
  plans: Joi.string().required(),
  price: Joi.number().required(),
  duration: Joi.string().required()
})

module.exports = { PricingPayloadSchema }
