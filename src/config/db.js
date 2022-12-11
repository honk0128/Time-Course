const mysql = require("mysql");

const db = mysql.createConnection({
  host: "time-course.ceefgvcanxko.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  password: "qwer1234",
  database: "login",
});

db.connect();

module.exports = db;
