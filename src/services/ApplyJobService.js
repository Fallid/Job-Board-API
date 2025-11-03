
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class ApplyJobService {
  constructor() {
    this._pool = new Pool();
  }

  async applyJob({ jobId, userId }) {
    // Verify job exists
    await this.verifyJobExists(jobId);

    // Check if user already applied to this job
    await this.checkDuplicateApplication(jobId, userId);

    const id = `apply-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO apply_jobs(id, job_id, user_id) VALUES($1, $2, $3) RETURNING id',
      values: [ id, jobId, userId ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal mendaftar pekerjaan');
    }

    return result.rows[ 0 ].id;
  }

  async verifyJobExists(jobId) {
    const query = {
      text: 'SELECT id FROM jobs WHERE id = $1',
      values: [ jobId ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Job tidak ditemukan');
    }
  }

  async checkDuplicateApplication(jobId, userId) {
    const query = {
      text: 'SELECT id FROM apply_jobs WHERE job_id = $1 AND user_id = $2',
      values: [ jobId, userId ],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Anda sudah mendaftar pekerjaan ini');
    }
  }
}

module.exports = ApplyJobService;