const { Pool } = require('pg')
const { nanoid } = require('nanoid')

const InvariantError = require('../../exceptions/InvariantError')
// const { mapDBToModel } = require('../../utils');
// const NotFoundError = require('../../exceptions/NotFoundError')

/* eslint-disable no-underscore-dangle */
class PropertiesService {
  constructor () {
    this._pool = new Pool()
  }

  async addProperties ({ name, owner, city, location, contact, description }) {
    const id = `property-${nanoid(16)}`
    const query = {
      text: 'INSERT INTO property VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, owner, city, location, contact, description]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0].id) {
      throw new InvariantError('property gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async getPropertyByCity ({ city }) {
    const query = {
      text: 'SELECT * FROM property WHERE city = $1',
      values: [city]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async getPropertyById ({ propertyId }) {
    const query = {
      text: 'SELECT * FROM property WHERE id = $1',
      values: [propertyId]
    }
    const result = await this._pool.query(query)
    return result.rows[0]
  }

  async getAllProperty () {
    const query = {
      text: 'SELECT id, name, owner, city, location, contact, description FROM property WHERE is_ready = 0'
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async deletePropertyById (propertyId) {
    const query = {
      text: 'DELETE FROM property WHERE id = $1 RETURNING id',
      values: [propertyId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('property gagal dihapus')
    }
  }

  async editPropertyById (propertyId, { name, owner, city, location, contact, description }) {
    const query = {
      text: 'UPDATE property SET name = $1, owner = $2, city = $3, location = $4, contact = $5, description = $6 WHERE id = $7 RETURNING id',
      values: [name, owner, city, location, contact, description, propertyId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('property gagal diubah')
    }
  }
}
module.exports = PropertiesService
