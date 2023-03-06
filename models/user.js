const { DataTypes } = require("sequelize");
const sequelize = require("../storage/sequelize");

const User = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'MEMBER', 'TECHNICIAN'),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING
    },
    designation: {
        type: DataTypes.STRING
    },
});

// CLEAN UP
// sequelize.sync({ force: true })  // If want to reset DB everytime webapp restarts
sequelize.sync({})
.then(() => {
  console.log(`Database & tables created!`);
});

module.exports = User;