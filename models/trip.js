'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

<<<<<<< HEAD
      // Trip.belongsTo(models.Country, {
      //   as: "countryId",
      //   foreignKey: {
      //     name: "country_id"
      //   }
      // })

      // Trip.hasOne(models.Country)
=======
      // Trip.hasOne(models.Country)

      Trip.belongsTo(models.Country, {
        as: "Country",
        foreignKey: {
          name: "countryId"
        }
      })
>>>>>>> trip
    }
  };
  Trip.init({
    title: DataTypes.STRING,
<<<<<<< HEAD
    country_id: DataTypes.INTEGER,
=======
    countryId: DataTypes.INTEGER,
>>>>>>> trip
    accomodation: DataTypes.STRING,
    transportation: DataTypes.STRING,
    eat: DataTypes.STRING,
    day: DataTypes.INTEGER,
    night: DataTypes.INTEGER,
    dateTrip: DataTypes.DATE,
    price: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};