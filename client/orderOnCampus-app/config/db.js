const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'orderOnCampus',
  password: '3223',
  port: 5432, // default PostgreSQL port
});