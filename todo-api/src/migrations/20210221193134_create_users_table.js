exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username', 32).notNullable();
    table.string('password', 128).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.unique('username');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
