const Sequelize = require("sequelize");

// Connects to the PostgreSQL database hosted on Render
// const sequelize = new Sequelize('postgres://wavescan_db_user:XEHIzh5sfiwV9tStKROnlKpFZ2VkSt3Q@dpg-cg2b9avdvk4ronoctqcg-a/wavescan_db');

// Local development with Docker container running PostgreSQL
const sequelize = new Sequelize('postgres://wavescan:wavescan@localhost:5432/wavescan');

// Ensures that connection with postgresql database has been established.
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
// }).catch((err) => {
//     console.error('Unable to connect to the database:', err);
// });

module.exports = sequelize;