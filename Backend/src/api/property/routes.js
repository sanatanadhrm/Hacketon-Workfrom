const routes = (handler) => [
  {
    method: 'POST',
    path: '/property',
    handler: handler.postPropertyHandler
  },
  {
    method: 'GET',
    path: '/property',
    handler: handler.getAllPropertHandler
  },
  {
    method: 'GET',
    path: '/property/{city}',
    handler: handler.getPropertyHandler
  },
  {
    method: 'GET',
    path: '/detailproperty/{propertyId}',
    handler: handler.getDetailPropertyHandler
  },
  {
    method: 'DELETE',
    path: '/property/{propertyId}',
    handler: handler.deletePropertyByIdHandler
  },
  {
    method: 'PUT',
    path: '/property/{propertyId}',
    handler: handler.putPropertyByIdHandler
  }
]
module.exports = routes
