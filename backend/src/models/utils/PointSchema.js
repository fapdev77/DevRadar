const mongoose = require('mongoose');

// vamos criar um schema proprio para armazenar as coordenadas dentro do mongodb
// dica: mongodb utiliza modelo longitude e latitude para armazenar coordenadas

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
})

//exportar o modulo modelo
module.exports = PointSchema;
