const express = require('express');
const cors = require('cors');
const { mysqlDbConnection } = require('../database/config-mysql');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.customersMysqlRoute = '/api/mysql/customers';

        // CONEXION A LA BASE DE DATOS
        this.conectarDB();

        // MIDDLEWARES
        this.middlewares();

        // ROUTES
        this.routes();
    }

    async conectarDB() {
        await mysqlDbConnection;
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // LECTURA Y PARSEO DEL BODY
        // intenta que los datos que se reciban se serialicen a json
        this.app.use(express.json());

        // DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.customersMysqlRoute, require('../routes/customersMysqlRoute'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', process.env.PORT);
        });
    }
}

module.exports = Server;
