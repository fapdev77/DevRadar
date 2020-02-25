const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request,response) {
        //Buscar todos os devs em um raio de 10Km
        //Filtrar por tecnologias 
        console.log(request.query);

        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);
        console.log(techsArray);

        //fazer a pesquisa usando filtros
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude]
                    },
                    $maxDistance:10000
                }
            }
        });
        return response.json({ devs });
        //return response.json(devs);

    }
};