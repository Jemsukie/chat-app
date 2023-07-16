import CubejsServer from '@cubejs-backend/server'

const server = new CubejsServer({
  http: {
    cors: {
      // TODO: from .env to dapat i-set sa production
      origin: [process.env.CORS_ALLOWED_ORIGIN],
      credentials: true,
    },
  },
})

server
  .listen()
  .then(({ version, port }) => {
    console.log(`🚀 Cube.js server (${version}) is listening on ${port}`)
  })
  .catch((e) => {
    console.error('Fatal error during server start: ')
    console.error(e.stack || e)
  })
