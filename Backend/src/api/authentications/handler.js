const autoBind = require('auto-bind')

class LoginHandler {
  constructor (service) {
    this._sevice = service

    autoBind(this)
  }

  async postAuthenticationHandler (request, h) {
    const { username, password } = request.payload
    const id = await this._sevice.verifyUserCredential(username, password)
    const response = h.response({
      status: 'success',
      massage: 'catatan berhasil',
      data: {
        id
      }
    })
    response.code(201)
    return response
  }
}
module.exports = LoginHandler
