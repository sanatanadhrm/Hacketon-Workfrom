const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')

class AmenititesService {
  constructor () {
    this._pool = new Pool()
  }

  async addAmenities (amenities, propertyId) {
    const id = `amenities-${nanoid(16)}`
    const query = {
      text: 'INSERT INTO amenities VALUES($1, $2, $3) RETURNING id, property_id',
      values: [id, amenities, propertyId]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0].id) {
      throw new InvariantError('amenities gagal ditambahkan')
    }
    return result.rows[0].property_id
  }

  async getAmenitiesByPropertyId (propertyId) {
    const query = {
      text: 'SELECT amenities_name FROM amenities WHERE property_id = $1',
      values: [propertyId]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async getAllAmenities () {
    try {
      const query = {
        text: 'SELECT a.*, b.name FROM amenities AS a JOIN property AS b ON a.property_id = b.id ORDER BY b.name ASC '
      }
      const result = await this._pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('Error in getAllAmenities: ' + error.message)
    }
  }

  async deleteAmenities (amenitiesId) {
    const query = {
      text: 'DELETE FROM amenities WHERE id = $1 RETURNING id',
      values: [amenitiesId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('amenities gagal dihapus')
    }
  }

  async editAmenities (amenitiesId, amenities) {
    const query = {
      text: 'UPDATE amenities SET amenities_name = $1 WHERE id = $2 RETURNING id',
      values: [amenities, amenitiesId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('amenities gagal diupdate')
    }
  }
}
module.exports = AmenititesService
