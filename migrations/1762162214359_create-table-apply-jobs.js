/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('apply_jobs', {
    id: {
      type: 'VARCHAR(100)',
      primaryKey: true,
      notNull: true,
    },
    job_id: {
      type: 'VARCHAR(100)',
      notNull: true,
      references: 'jobs(id)',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'VARCHAR(100)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    applied_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });

  // Add unique constraint for job_id and user_id combination
  pgm.addConstraint('apply_jobs', 'unique_user_job_application', {
    unique: [ 'job_id', 'user_id' ],
  });

  // Add indexes for better query performance
  pgm.createIndex('apply_jobs', 'job_id');
  pgm.createIndex('apply_jobs', 'user_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('apply_jobs');
};
