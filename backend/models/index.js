const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.parcels = require("./parcel.model.js")(sequelize, Sequelize);
db.couriers = require("./courier.model.js")(sequelize, Sequelize);
db.cars = require("./car.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

db.couriers.hasMany(db.parcels, { as: "parcel" });
db.parcels.belongsTo(db.couriers, {
    foreignKey: "courierId",
    as: "courier",
});

db.cars.hasOne(db.couriers, { as: "car" });
db.couriers.belongsTo(db.cars, {
    foreignKey: {
        name: "carId",
        unique: true
    },
    as: "car",
});

db.users.hasOne(db.couriers, { as: "user" });
db.couriers.belongsTo(db.users, {
    foreignKey: {
        name: "userId",
        unique: true
    },
    as: "user",
});

module.exports = db;