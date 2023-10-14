const routes = (handler) => [
  {
    method: 'POST',
    path: '/property/{propertyId}/amenities',
    handler: handler.postAmenitiesHandler
  },
  {
    method: 'GET',
    path: '/property/{propertyId}/amenities',
    handler: handler.getAmenitiesHandler
  },
  {
    method: 'GET',
    path: '/amenities',
    handler: handler.getAmenitiesAllHandler
  },
  {
    method: 'DELETE',
    path: '/property/amenities/{amenitiesId}',
    handler: handler.deleteAmenitiesHandler
  },
  {
    method: 'PUT',
    path: '/property/amenities/{amenitiesId}',
    handler: handler.putAmenitiesHandler
  }
]
module.exports = routes
