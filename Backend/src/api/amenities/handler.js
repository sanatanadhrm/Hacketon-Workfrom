const autoBind = require('auto-bind')

class AmenitiesHandler {
  constructor (service, validator) {
    this._sevice = service
    this._validator = validator

    autoBind(this)
  }

  async postAmenitiesHandler (request, h) {
    const { propertyId } = request.params
    this._validator.validateAmenitiesPayload(request.payload)
    const { amenities } = request.payload
    const Amenities = await this._sevice.addAmenities(amenities, propertyId)
    const response = h.response({
      status: 'success',
      message: 'Amenities berhasil ditambahkan',
      data: {
        Amenities
      }
    })
    response.code(201)
    return response
  }

  async getAmenitiesHandler (request, h) {
    const { propertyId } = request.params
    const amenities = await this._sevice.getAmenitiesByPropertyId(propertyId)
    return {
      status: 'success',
      data: {
        amenities
      }
    }
  }

  async getAmenitiesAllHandler (request, h) {
    const amenities = await this._sevice.getAllAmenities()
    return {
      status: 'success',
      data: {
        amenities
      }
    }
  }

  async deleteAmenitiesHandler (request, h) {
    const { amenitiesId } = request.params
    await this._sevice.deleteAmenities(amenitiesId)
    return {
      status: 'success',
      message: 'Amenities berhasil dihapus'
    }
  }

  async putAmenitiesHandler (request, h) {
    const { amenitiesId } = request.params
    this._validator.validateAmenitiesPayload(request.payload)
    const { amenities } = request.payload
    await this._sevice.editAmenities(amenitiesId, amenities)
    return {
      status: 'success',
      message: 'Amenities berhasil diperbarui'
    }
  }
}
module.exports = AmenitiesHandler
