// cronJob.js

import CubejsServer from '@cubejs-backend/server'

const cubejsCronJob = async () => {
  const server = new CubejsServer({
    http: {
      cors: {
        // TODO: Set this to the appropriate value in production
        origin: [process.env.CORS_ALLOWED_ORIGIN],
        credentials: true,
      },
    },
  })

  try {
    const { version, port } = await server.listen()
    console.log(`🚀 Cube.js server (${version}) is listening on ${port}`)
  } catch (e) {
    console.error('Fatal error during server start: ')
    console.error(e.stack || e)
  }
}

export default cubejsCronJob
