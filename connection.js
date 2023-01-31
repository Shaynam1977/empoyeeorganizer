const mysql=require("mysql2")


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password123!",
    database: "employeeDb"
  });

  connection.connect(function(err){
    if(err) throw err
  })
  module.exports=connection