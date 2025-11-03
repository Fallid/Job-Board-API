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
    // Create ENUM type for user_role
    pgm.createType('user_role_enum', [ 'employee', 'job_seeker' ]);

    pgm.createTable('users', {
        id: {
            type: "VARCHAR(100)",
            primaryKey: true,
            notNull: true
        },
        username: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        password: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        fullname: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        user_role: {
            type: 'user_role_enum',
            notNull: true,
            default: 'job_seeker'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users');
    pgm.dropType('user_role_enum');
};
