// 引入数据库
const mysql = require("mysql");

const mysqldb = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"root",
	database:"nodemysql"
}) 
// 链接
mysqldb.connect();

mysqldb.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
module.exports = mysqldb;