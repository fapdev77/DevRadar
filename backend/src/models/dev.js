const mongoose = require('mongoose');
//importar o schema de localização
const PointSchema = require('./utils/PointSchema')

//criar o Schema do banco de dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

//exportar o modulo modelo
module.exports = mongoose.model('Dev',DevSchema);
