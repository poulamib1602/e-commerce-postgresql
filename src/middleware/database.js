require("dotenv").config();

CONNECTION_STRING = process.env.postgres_url;

const knex = require("knex")({
  client: "pg",
  connection: CONNECTION_STRING,
});

module.exports = knex;