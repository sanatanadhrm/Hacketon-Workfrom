const autoBind = require('auto-bind')

class PricingHandler {
  constructor (service, validator) {
    this._sevice = service
    this._validator = validator

    autoBind(this)
  }

  async postPricingHandler (request, h) {
    const { propertyId } = request.params
    this._validator.validatePricingPayload(request.payload, propertyId)
    const { plans, price, duration } = request.payload
    const Pricing = await this._sevice.addPricing(plans, price, duration, propertyId)
    const response = h.response({
      status: 'success',
      message: 'Pricing berhasil ditambahkan',
      data: {
        Pricing
      }
    })
    response.code(201)
    return response
  }

  async getPricingHandler (request, h) {
    const { propertyId } = request.params
    const pricing = await this._sevice.getPricingByPropertyId(propertyId)
    return {
      status: 'success',
      data: {
        pricing
      }
    }
  }

  async getAllPricingHandler (request, h) {
    const pricing = await this._sevice.getAllPricing()
    return {
      status: 'success',
      data: {
        pricing
      }
    }
  }

  async deletePricingHandler (request, h) {
    const { pricingId } = request.params
    await this._sevice.deletePricing(pricingId)
    return {
      status: 'success',
      message: 'Pricing berhasil dihapus'
    }
  }

  async putPricingHandler (request, h) {
    const { pricingId } = request.params
    this._validator.validatePricingPayload(request.payload)
    const { plans, price, duration } = request.payload
    await this._sevice.editPricing(pricingId, { plans, price, duration })
    return {
      status: 'success',
      message: 'Pricing berhasil diperbarui'
    }
  }
}
module.exports = PricingHandler
