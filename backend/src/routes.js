//Importo somente o modulo Router do express (poderia ter importado tudo também...)
const { Router } = require('express');

//importar o devcontroller
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();
//fazer a listagem do banco de dados
routes.get('/devs', DevController.index);
//inserir novo registro no banco de dados
routes.post('/devs', DevController.store );
//fazer pesquisa no banco de dados
routes.get('/search', SearchController.index);

// exportar o modulo 
module.exports = routes;