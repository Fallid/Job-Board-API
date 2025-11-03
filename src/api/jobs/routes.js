const routes = (handler) => [
  {
    method: 'POST',
    path: '/jobs',
    handler: handler.postJobHandler,
    options: {
      auth: 'jobsapp_jwt',
      pre: [
        {
          method: (request, h) => {
            const { role } = request.auth.credentials;
            if (role !== 'employee') {
              const response = h.response({
                status: 'fail',
                message: 'Anda tidak memiliki akses untuk menambahkan job',
              });
              response.code(403);
              return response.takeover();
            }
            return h.continue;
          },
        },
      ],
    },
  },
  {
    method: 'GET',
    path: '/jobs',
    handler: handler.getJobHandler,
  },
  {
    method: 'POST',
    path: '/jobs/{id}/apply',
    handler: handler.applyJobHandler,
    options: {
      auth: 'jobsapp_jwt',
      pre: [
        {
          method: (request, h) => {
            const { role } = request.auth.credentials;
            if (role !== 'job_seeker') {
              const response = h.response({
                status: 'fail',
                message: 'Hanya job seeker yang dapat mendaftar pekerjaan',
              });
              response.code(403);
              return response.takeover();
            }
            return h.continue;
          },
        },
      ],
    },
  },
];

module.exports = routes;