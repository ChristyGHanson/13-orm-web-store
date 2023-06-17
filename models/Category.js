const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
const { STRING } = require('sequelize');

class Category extends Model { }

Category.init(
  {
    // define columns
    id: {
      // booleans in sequelize! some have options.
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  },
  {
    // connect it to the db
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// export Category model, sequelize uses models.
module.exports = Category;
