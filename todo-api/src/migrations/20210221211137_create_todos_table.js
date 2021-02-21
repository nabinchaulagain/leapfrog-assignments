exports.up = function (knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id');
    table.string('title', 128).notNullable();
    table.text('description').notNullable();
    table.boolean('is_done').defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('todos');
};
