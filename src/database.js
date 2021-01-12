const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"rest-api-users-nodejs-mysql"
})

dbConnection.connect(err => {
    if (err) {
        console.error(err);
        return;
    }else{
        console.log("Db is connected");
    }
})

module.exports = dbConnection;