const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const path = require("path"); // getting access to the server's path
const helmet = require("helmet"); // for security
const userRoute = require("./routes/user.route");
const songRoute = require("./routes/song.route");

const app = express();

let corsOptions = {
  origin: "http://localhost:8080",
};

app.use(helmet());
app.use(bodyParser.json()); // bodyParser is used by all endpoints
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors(corsOptions));
app.use(morgan("combined"));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoute);
app.use("/api", songRoute);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
const db = require("./models");
const Role = db.role;

db.sequelize.sync().then(() => {});
//console.log("Drop and Resync Db");
/*Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
  //initial();
});*/

module.exports = app;
