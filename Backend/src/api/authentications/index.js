const LoginHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { service }) => {
    const loginHandler = new LoginHandler(service)
    server.route(routes(loginHandler))
  }
}
