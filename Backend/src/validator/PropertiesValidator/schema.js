const Joi = require('joi')

const PropertiesPayloadSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  city: Joi.string().required(),
  location: Joi.string().required(),
  contact: Joi.string().max(13).required(),
  description: Joi.string().required()

})

module.exports = { PropertiesPayloadSchema }
