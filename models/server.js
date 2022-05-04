const express = require('express');
const cors = require('cors');
require('colors');

const { dbConnection } = require('../database/config');
 
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 80
        this.usuariosPath = '/api/usuarios'

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('\n     ♦ '.magenta + `SERVIDOR CORRIENDO EN EL PUERTO ${this.port}`.white);
        });
    }
}

module.exports = Server;