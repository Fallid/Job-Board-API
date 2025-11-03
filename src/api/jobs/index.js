const JobsHandler = require('./handler');
const routes = require('./routes');

/* eslint-disable require-await */
module.exports = {
  name: 'jobs',
  register: async (server, { service, applyJobService, validator }) => {
    const jobsHandler = new JobsHandler(service, applyJobService, validator);
    server.route(routes(jobsHandler));
  },
};
