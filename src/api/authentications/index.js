const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

/* eslint-disable require-await */
module.exports = {
  name: 'authentications',
  register: async (server, { authenticationsService, usersService, validator, tokenManager }) => {
    const authHandler = new AuthenticationsHandler(authenticationsService, usersService, validator, tokenManager);
    server.route(routes(authHandler));
  },
};