const AmenitiesHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'amenities',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const amenitiesHandler = new AmenitiesHandler(service, validator)
    server.route(routes(amenitiesHandler))
  }
}
