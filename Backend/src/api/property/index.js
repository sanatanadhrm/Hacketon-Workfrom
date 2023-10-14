const PropertyHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'property',
  version: '1.0.0',
  register: async (server, {
    propertiesService,
    amenitiesService,
    facilitiesService,
    pricingService,
    validator
  }) => {
    const propertiesHandler = new PropertyHandler(
      propertiesService,
      amenitiesService,
      facilitiesService,
      pricingService,
      validator
    )
    server.route(routes(propertiesHandler))
  }
}
