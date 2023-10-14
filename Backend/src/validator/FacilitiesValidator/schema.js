const Joi = require('joi')

const FacilitiesPayloadSchema = Joi.object({
  facilities: Joi.string().required(),
  distance: Joi.string().required()
})

module.exports = { FacilitiesPayloadSchema }
