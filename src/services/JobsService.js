const { nanoid } = require('nanoid');
const { Pool }  =  require('pg');
const InvariantError = require('../exceptions/InvariantError');

class JobsService {
  constructor() {
    this._pool = new Pool();
  }

  async addJobs({ title, descriptions, companyName, salary, location }) {
    const id = `job-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO jobs VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title',
      values: [ id, title, descriptions, companyName, salary, location ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Job gagal ditambahkan');
    }

    return result.rows[ 0 ];
  }

  async getJobs({ location, salary }) {
    const conditions = [];
    const values = [];

    if (location) {
      conditions.push(`location ILIKE $${values.length + 1}`);
      values.push(`%${location}%`);
    }

    if (salary) {
      conditions.push(`CAST(salary AS TEXT) ILIKE $${values.length + 1}`);
      values.push(`%${salary}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' OR ')}` : '';
    
    const query = {
      text: `SELECT * FROM jobs ${whereClause}`,
      values,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = JobsService;