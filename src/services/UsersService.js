const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname, role = 'job_seeker' }) {
    // Verifikasi username, pastikan belum terdaftar
    await this.verifyNewUsername(username);

    // Generate ID user
    const id = `user-${nanoid(16)}`;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query untuk insert user baru
    const query = {
      text: 'INSERT INTO users(id, username, password, fullname, user_role) VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [ id, username, hashedPassword, fullname, role ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[ 0 ].id;
  }

  async verifyUserCredential({ username, password }) {
    const query = {
      text: 'SELECT id, password, user_role FROM users WHERE username = $1',
      values: [ username ],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword, user_role: role  } = result.rows[ 0 ];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return { id, role };
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }
}

module.exports = UsersService;
