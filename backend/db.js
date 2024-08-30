const {Pool} = require('pg');
const pool = new Pool({
    host: 'db',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'todo-game-db'
});

module.exports = pool;