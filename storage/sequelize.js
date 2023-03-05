const Sequelize = require("sequelize");

// Connects to the PostgreSQL database hosted on Render
const sequelize = new Sequelize('postgres://wavescan_db_user:XEHIzh5sfiwV9tStKROnlKpFZ2VkSt3Q@dpg-cg2b9avdvk4ronoctqcg-a/wavescan_db');

console.log("Started")
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.log(":)")
    console.error('Unable to connect to the database:', error);
}
console.log(typeof(sequelize))

module.exports = sequelize;