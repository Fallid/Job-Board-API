const autoBind = require('auto-bind');

class JobsHandler {
  constructor(jobService, applyJobService, validator) {
    this._jobService = jobService;
    this._applyJobService = applyJobService;
    this._validator = validator;

    autoBind(this);
  }

  async postJobHandler(request, h) {
    this._validator.validatePostJobPayload(request.payload);

    const { title, descriptions, companyName, salary, location } = request.payload;

    const job = await this._jobService.addJobs({
      title,
      descriptions,
      companyName,
      salary,
      location,
    });

    const response = h.response({
      status: 'success',
      message: 'Job berhasil ditambahkan',
      data: {
        jobId: job.id,
        title: job.title,
      },
    });
    response.code(201);
    return response;
  }

  async getJobHandler(request, h) {
    this._validator.validateQueryJobPayload(request.query);

    const { location, salary } = request.query;

    const jobs = await this._jobService.getJobs({ location, salary });

    return h.response({
      status: 'success',
      data: {
        jobs,
      },
    });
  }

  async applyJobHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: jobId } = request.params;

    await this._applyJobService.applyJob({ jobId, userId });

    const response = h.response({
      status: 'success',
      message: 'Berhasil mendaftar pekerjaan',
    });
    response.code(201);
    return response;
  }
}

module.exports = JobsHandler;