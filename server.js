const fastify = require('fastify')
const jwt = require('fastify-jwt')
const auth = require('fastify-auth')

const app = fastify()
const currentUser = { id: 1 } // keep current user in memory

// Plugins
app.register(jwt, { secret: 'foo bar baz' })
app.register(auth)

// Mount the routes
app.register(routes, { prefix: '/api' })

// Before hook to handle permission and attach user
const verifyJwt = async function (request, reply, next) {
  const { jwt } = this
  if (!request.headers.authorization) {
    const err = new Error('No token')
    err.statusCode = 401
    next(err)
  }
  const [ bearer, token ] = request.headers.authorization.split(' ')

  try {
    await jwt.verify(token)
  } catch (err) {
    next(err)
  }

  request.user = currentUser
  next()
}

// Simplified authentication action
class Auth {
  constructor (jwt) {
    this.jwt = jwt
  }
  async signin () {
    const token = await this.jwt.sign({
      sub: currentUser.id
    })
    return { currentUser, token }
  }
}

// Api routes
function routes (app, opts, next) {
  const auth = new Auth(app.jwt)

  app.post('/signin', (request, reply) => {
    try {
      const response = await auth.signin()
      reply.json(response)
    } catch (err) {
      reply.status(err.statusCode).send(err)
    }
  })

  app.get('/me', {
    beforeHandler: app.auth([ verifyJwt ])
  }, (request, reply) => reply.json(request.user))

  next()
}

(async () => {
  try {
    await app.listen(3001)
  } catch (err) {
    throw err
  }
})()
