const autoBind = require('auto-bind')

class PropertyHandler {
  constructor (
    propertiesService,
    amenitiesService,
    facilitiesService,
    pricingService,
    validator
  ) {
    this._sevice = propertiesService
    this._amenitiesService = amenitiesService
    this._facilitiesService = facilitiesService
    this._pricingService = pricingService
    this._validator = validator

    autoBind(this)
  }

  async postPropertyHandler (request, h) {
    this._validator.validatePropertiesPayload(request.payload)
    const { name, owner, city, location, contact, description } = request.payload
    const propertyId = await this._sevice.addProperties({ name, owner, city, location, contact, description })
    const response = h.response({
      status: 'success',
      message: 'properties berhasil ditambahkan',
      data: {
        propertyId
      }
    })
    response.code(201)
    return response
  }

  async getPropertyHandler (request) {
    const { city } = request.params
    const properties = await this._sevice.getPropertyByCity({ city })
    return {
      status: 'success',
      data: {
        properties
      }
    }
  }

  async getAllPropertHandler (request) {
    const properties = await this._sevice.getAllProperty()
    return {
      status: 'success',
      data: {
        properties
      }
    }
  }

  async getDetailPropertyHandler (request) {
    const { propertyId } = request.params
    const properties = await this._sevice.getPropertyById({ propertyId })
    const pricing = await this._pricingService.getPricingByPropertyId(propertyId)
    const facilities = await this._facilitiesService.getFacilitiesByPropertyId(propertyId)
    const amenities = await this._amenitiesService.getAmenitiesByPropertyId(propertyId)
    return {
      status: 'success',
      data: {
        Property: {
          ...properties,
          PlansAndPricing: pricing,
          Facilities: facilities,
          Amenities: amenities
        }
      }
    }
  }

  async deletePropertyByIdHandler (request) {
    const { propertyId } = request.params
    await this._sevice.deletePropertyById(propertyId)
    return {
      status: 'success',
      message: 'property berhasil dihapus'
    }
  }

  async putPropertyByIdHandler (request) {
    this._validator.validatePropertiesPayload(request.payload)
    const { propertyId } = request.params
    await this._sevice.editPropertyById(propertyId, request.payload)
    return {
      status: 'success',
      message: 'property berhasil diperbarui'
    }
  }
}
module.exports = PropertyHandler
