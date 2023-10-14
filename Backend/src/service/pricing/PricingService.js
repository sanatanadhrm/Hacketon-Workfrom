const { Pool } = require('pg')
const { nanoid } = require('nanoid')

const InvariantError = require('../../exceptions/InvariantError')
// const { mapDBToModel } = require('../../utils');
// const NotFoundError = require('../../exceptions/NotFoundError')

/* eslint-disable no-underscore-dangle */
class PricingService {
  constructor () {
    this._pool = new Pool()
  }

  async addPricing (plans, price, duration, propertyId) {
    const id = `pricing-${nanoid(16)}`
    const query = {
      text: 'INSERT INTO pricing VALUES($1, $2, $3, $4, $5) RETURNING id, property_id',
      values: [id, plans, price, duration, propertyId]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0].id) {
      throw new InvariantError('pricing gagal ditambahkan')
    }

    return result.rows[0].property_id
  }

  async getPricingByPropertyId (propertyId) {
    const query = {
      text: 'SELECT plans, price, duration FROM pricing WHERE property_id = $1',
      values: [propertyId]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async getAllPricing () {
    try {
      const query = {
        text: 'SELECT a.*, b.name FROM pricing AS a JOIN property AS b ON a.property_id = b.id ORDER BY b.name ASC '
      }
      const result = await this._pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('Error in getAllPricing: ' + error.message)
    }
  }

  async deletePricing (pricingId) {
    const query = {
      text: 'DELETE FROM pricing WHERE id = $1 RETURNING id',
      values: [pricingId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('pricing gagal dihapus')
    }
  }

  async editPricing (pricingId, { plans, price, duration }) {
    const query = {
      text: 'UPDATE pricing SET plans = $1, price = $2, duration = $3 WHERE id = $4 RETURNING id',
      values: [plans, price, duration, pricingId]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new InvariantError('pricing gagal diupdate')
    }
  }
}
module.exports = PricingService
