const routes = (handler) => [
  {
    method: 'POST',
    path: '/property/{propertyId}/facilities',
    handler: handler.postFacilitiesHandler
  },
  {
    method: 'GET',
    path: '/property/{propertyId}/facilities',
    handler: handler.getFacilitiesHandler
  },
  {
    method: 'GET',
    path: '/facilities',
    handler: handler.getAllFacilitiesHandler
  },
  {
    method: 'DELETE',
    path: '/property/facilities/{facilitiesId}',
    handler: handler.deleteFacilitiesHandler
  },
  {
    method: 'PUT',
    path: '/property/facilities/{facilitiesId}',
    handler: handler.putFacilitiesHandler
  }
]
module.exports = routes
