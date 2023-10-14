const Joi = require('joi')

const AmenitiesPayloadSchema = Joi.object({
  amenities: Joi.string().required()
})

module.exports = { AmenitiesPayloadSchema }
