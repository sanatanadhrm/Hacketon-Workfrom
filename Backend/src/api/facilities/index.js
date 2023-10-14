const FacilitiesHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'facilities',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const facilitiesHandler = new FacilitiesHandler(service, validator)
    server.route(routes(facilitiesHandler))
  }
}
