const databaseSettings = require("../config/database-settings");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  databaseSettings.DATABASE,
  databaseSettings.USER,
  databaseSettings.PASSWORD,
  {
    host: databaseSettings.HOST,
    dialect: databaseSettings.dialect,
    //operatorsAliases: false,

    pool: {
      max: databaseSettings.pool.max,
      min: databaseSettings.pool.min,
      acquire: databaseSettings.pool.acquire,
      idle: databaseSettings.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// user connexion and relationship through the database
db.user = require("../models/User.js")(sequelize, Sequelize);
db.song = require("../models/Song.js")(sequelize, Sequelize);
db.role = require("../models/Role.js")(sequelize, Sequelize);

db.user.hasMany(db.song, { as: "songs" });
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
// song connexion and its relationship through the database
db.song.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.role = require("../models/Role.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

/*const Role = db.role;

roleFunction();
//////////////////////
function roleFunction() {
  Role.create({
    id: 1,
    name: "user",
  }).then(() => {});

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}*/

/////////////////////
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
