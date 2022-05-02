const mongoose = require('mongoose');
require('colors');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('\n     ♦ '.magenta + 'BASE DE DATOS ONLINE'.white)
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora inicializar la base de datos');
    }
}

module.exports = {
    dbConnection
}