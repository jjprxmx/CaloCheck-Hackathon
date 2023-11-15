const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USERNAME, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Connect to your local database otherwise use 61.7.143.204
    dialect: "mysql", // Tell sequelize to use Postgres
    timezone: "Asia/Bangkok",
  },
 
);


async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function sync() {
  try {
    await sequelize.sync();
    console.log("Connection synced successfully");
  } catch (error) {
    console.error("Unable to sync to the database:", error);
  }
}

module.exports = {
  sequelize,
  connect,
  sync,

};
