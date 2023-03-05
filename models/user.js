const { Model, DataTypes } = require("sequelize");
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
    }
});

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
  });

module.exports = User;