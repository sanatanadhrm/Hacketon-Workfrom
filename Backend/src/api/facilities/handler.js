const autoBind = require('auto-bind')

class FacilitiesHandler {
  constructor (service, validator) {
    this._sevice = service
    this._validator = validator

    autoBind(this)
  }

  async postFacilitiesHandler (request, h) {
    const { propertyId } = request.params
    this._validator.validateFacilitiesPayload(request.payload)
    const { facilities, distance } = request.payload
    const Facilities = await this._sevice.addFacilities(facilities, distance, propertyId)
    const response = h.response({
      status: 'success',
      message: 'Facilities berhasil ditambahkan',
      data: {
        Facilities
      }
    })
    response.code(201)
    return response
  }

  async getFacilitiesHandler (request, h) {
    const { propertyId } = request.params
    const facilities = await this._sevice.getFacilitiesByPropertyId(propertyId)
    return {
      status: 'success',
      data: {
        facilities
      }
    }
  }

  async getAllFacilitiesHandler (request, h) {
    const facilities = await this._sevice.getAllFacilities()
    return {
      status: 'success',
      data: {
        facilities
      }
    }
  }

  async deleteFacilitiesHandler (request, h) {
    const { facilitiesId } = request.params
    await this._sevice.deleteFacilities(facilitiesId)
    return {
      status: 'success',
      message: 'Facilities berhasil dihapus'
    }
  }

  async putFacilitiesHandler (request, h) {
    const { facilitiesId } = request.params
    this._validator.validateFacilitiesPayload(request.payload)
    const { facilities, distance } = request.payload
    await this._sevice.editFacilities(facilitiesId, facilities, distance)
    return {
      status: 'success',
      message: 'Facilities berhasil diperbarui'
    }
  }
}
module.exports = FacilitiesHandler
