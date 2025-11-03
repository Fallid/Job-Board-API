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
    pgm.createTable('jobs', {
        id: {
            type: 'VARCHAR(100)',
            notNull: true,
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        description: {
            type: 'TEXT',
            notNull: true,
        },
        company_name: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        salary: {
            type: 'BIGINT',
            notNull: true
        },
        location: {
            type: 'VARCHAR(255)',
            notNull: true,
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('jobs');
 };
