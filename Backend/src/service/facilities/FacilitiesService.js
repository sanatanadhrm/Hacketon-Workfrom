const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')

class FacilitiesService {
  constructor () {
    this._pool = new Pool()
  }

  async addFacilities (facilities, distance, propertyId) {
    const id = `facilities-${nanoid(16)}`
    const query = {
      text: 'INSERT INTO nearby_facilities VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, facilities, distance, propertyId]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0].id) {
      throw new InvariantError('facilities gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async getFacilitiesByPropertyId (propertyId) {
    const query = {
      text: 'SELECT facility_name, distance FROM nearby_facilities WHERE property_id = $1',
      values: [propertyId]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async getAllFacilities () {
    try {
      const query = {
        text: 'SELECT a.*, b.name FROM nearby_facilities AS a JOIN property AS b ON a.property_id = b.id ORDER BY b.name ASC '
      }
      const result = await this._pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('Error in getAllFacilities: ' + error.message)
    }
  }

  async deleteFacilities (facilitiesId) {
    const query = {
      text: 'DELETE FROM nearby_facilities WHERE id = $1 RETURNING id',
      values: [facilitiesId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('facilities gagal dihapus')
    }
  }

  async editFacilities (facilitiesId, facilities, distance) {
    const query = {
      text: 'UPDATE nearby_facilities SET facility_name = $1, distance = $2 WHERE id = $3 RETURNING id',
      values: [facilities, distance, facilitiesId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('facilities gagal diubah')
    }
  }
}
module.exports = FacilitiesService
