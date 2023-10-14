const { Pool } = require('pg')
const AuthenticationError = require('../../exceptions/AuthenticationError')

class UsersService {
  constructor () {
    this._pool = new Pool()
  }

  async verifyUserCredential (username, password) {
    const query = {
      text: 'SELECT id, password FROM admin WHERE username = $1',
      values: [username]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new AuthenticationError('username yang Anda berikan salah')
    }

    const { id, password: hashedPassword } = result.rows[0]
    if (hashedPassword !== password) {
      throw new AuthenticationError('password yang Anda berikan salah')
    }
    return id
  }
}
module.exports = UsersService
