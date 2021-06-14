// Obtenga el servicio mysql
var mysql = require('mysql');

let jConexion = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}

// conectarse a mysql
const mysqlDbConnection = mysql.createConnection(jConexion);

mysqlDbConnection.connect(function(err) {
    // en caso de error
    if (err) {
        console.log('ERR ' + err);
        console.log('CODE ' + err.code);
        console.log('FATAL ' + err.fatal);
        return;
    }

    console.log('CONEXIÓN A MYSQL CON Node.js EXITOSA');
    // return connection;
});
// mysqlDbConnection.end();
// console.log(mysqlDbConnection);
module.exports = {
    mysqlDbConnection,
}