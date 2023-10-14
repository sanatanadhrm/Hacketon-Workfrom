const config = require('./utils/config')
// properties
const PropertiesService = require('./service/properties/PropertiesService')
const PropertiesValidator = require('./validator/PropertiesValidator')
const property = require('./api/property')

// client error
const ClientError = require('./exceptions/ClientError')

// Pricing
const PricingService = require('./service/pricing/PricingService')
const PricingValidator = require('./validator/PricingValidator')
const pricing = require('./api/pricing')

// Amenities
const AmenitiesService = require('./service/amenities/AmenitiesService')
const AmenitiesValidator = require('./validator/AmenitiesValidator')
const amenities = require('./api/amenities')

// Facilities
const FacilitiesService = require('./service/facilities/FacilitiesService')
const FacilitiesValidator = require('./validator/FacilitiesValidator')
const facilities = require('./api/facilities')

// Login
const authentications = require('./api/authentications')
const UsersService = require('./service/users/UsersService')

// Upload
const uploads = require('./api/uploads')
const UploadsValidator = require('./validator/UploadsValidator')
const StorageService = require('./service/storage/StorageService')

const Hapi = require('@hapi/hapi')
const path = require('path')
const Inert = require('@hapi/inert')

const init = async () => {
  const propertiesService = new PropertiesService()
  const pricingService = new PricingService()
  const amenitiesService = new AmenitiesService()
  const facilitiesService = new FacilitiesService()
  const usersService = new UsersService()
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/images'))
  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })
  await server.register([
    {
      plugin: Inert
    }
  ])
  await server.register([
    {
      plugin: uploads,
      options: {
        service: storageService,
        validator: UploadsValidator
      }
    },
    {
      plugin: facilities,
      options: {
        service: facilitiesService,
        validator: FacilitiesValidator
      }
    },
    {
      plugin: authentications,
      options: {
        service: usersService
      }
    },
    {
      plugin: amenities,
      options: {
        service: amenitiesService,
        validator: AmenitiesValidator
      }
    },
    {
      plugin: property,
      options: {
        propertiesService,
        amenitiesService,
        facilitiesService,
        pricingService,
        validator: PropertiesValidator
      }
    },
    {
      plugin: pricing,
      options: {
        service: pricingService,
        validator: PricingValidator
      }
    }
  ])
  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request
    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami'
      })
      newResponse.code(500)
      return newResponse
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue
  })
  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
