const PricingHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'pricing',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const pricingHandler = new PricingHandler(service, validator)
    server.route(routes(pricingHandler))
  }
}
