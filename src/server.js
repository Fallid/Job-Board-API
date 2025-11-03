const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
require('dotenv').config();

// Import exceptions
const ClientError = require('./exceptions/ClientError');

// Import rate limiter
const rateLimiterMiddleware = require('./utlis/RateLimimter');

// plugin authentication
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/AuthenticationsService');
const AuthenticationValidation = require('./validations/authentications');
const tokenManager = require('./tokenizer/tokenManagement'); 

// plugin users 
const users = require('./api/users');
const UsersService = require('./services/UsersService');
const UsersValidation = require('./validations/users');  

// plugin jobs
const jobs = require('./api/jobs');
const JobsService = require('./services/JobsService');
const ApplyJobService = require('./services/ApplyJobService');
const JobsValidation = require('./validations/jobs');

const init = async () => {
  // init service
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const jobsService = new JobsService();
  const applyJobService = new ApplyJobService(); 

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: [ '*' ],
      },
    },
  });

  // server.route([
  //   {
  //     handler: (request, h) => request.query
  //   }
  // ])

  // Register plugin external
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // JWT authentication strategy
  server.auth.strategy('jobsapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        username: artifacts.decoded.payload.username,
        role: artifacts.decoded.payload.role,
      },
    }),
  });

  // Register plugin local
  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidation,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager,
        validator: AuthenticationValidation, 
      },
    },
    {
      plugin: jobs,
      options: {
        service: jobsService,
        applyJobService,
        validator: JobsValidation,
      },
    },
  ]);

  // Apply rate limiter to all routes
  server.ext('onRequest', rateLimiterMiddleware);

  // onPreResponse extension
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // Handle client error
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    // Handle server error (Boom errors)
    if (response.isServer) {
      console.error(response);

      const newResponse = h.response({
        status: 'error',
        message: response.message,
      });
      newResponse.code(500);
      return newResponse;
    }

    // Jika bukan error, lanjutkan dengan response sebelumnya
    return h.continue;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init().catch((err) => {
  console.error(err);
  process.exit(1);
});

