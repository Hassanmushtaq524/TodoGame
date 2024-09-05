/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments('_id').primary(); // Primary key
        table.string('description').notNullable(); // Description of the task
        table.integer('xp_value').notNullable(); // XP value associated with the task
        table.date('created_at'); // Timestamp when task is created
        table.integer('created_by').unsigned().notNullable(); // User who created the task
        table.date('updated_at'); // Timestamp when task is last updated
        table.boolean('completed').defaultTo(false); // Boolean to mark task completion
        // Define foreign key constraint
        table.foreign('created_by').references('_id').inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
