const routes = (handler) => [
  {
    method: 'POST',
    path: '/property/{propertyId}/pricing',
    handler: handler.postPricingHandler
  },
  {
    method: 'GET',
    path: '/property/{propertyId}/pricing',
    handler: handler.getPricingHandler
  },
  {
    method: 'GET',
    path: '/pricing',
    handler: handler.getAllPricingHandler
  },
  {
    method: 'DELETE',
    path: '/property/pricing/{pricingId}',
    handler: handler.deletePricingHandler
  },
  {
    method: 'PUT',
    path: '/property/pricing/{pricingId}',
    handler: handler.putPricingHandler
  }
]
module.exports = routes
