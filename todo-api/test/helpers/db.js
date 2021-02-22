const db = require('../../src/db');

const createTables = () => {
  return db.migrate.latest();
};

const dropTables = () => {
  return db.migrate.rollback();
};

module.exports = { createTables, dropTables };
