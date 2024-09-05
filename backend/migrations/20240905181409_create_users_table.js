/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('_id').primary(); // Primary key
        table.string('username').unique().notNullable(); // Unique username for the user
        table.string('email').unique().notNullable(); // Unique email address
        table.string('password').notNullable(); // Hashed password for the user
        table.integer('level').defaultTo(0); // The user level
        table.integer('total_xp').defaultTo(0); // The user xp
        table.date('created_at'); // Timestamp when user is created
        table.date('updated_at'); // Timestamp when user is last updated
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
