require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'DB_DOCUEMNT_V2_DEV'
    },
    migrations: {
      directory: "./infrastructure/database/migrations",
    },
    seeds: { directory: "./infrastructure/database/seeds" },
  },

  testing: {
    client: "mysql",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./infrastructure/database/migrations",
    },
    seeds: { directory: "./infrastructure/database/seeds" },
  },

  production: {
    client: "mysql",
    connection: {
      host : '10.1.201.95',
      database: "postgres",
      user: "cms",
      password: "Cm5kc1#2021",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./infrastructure/database/migrations",
    },
  },
};
