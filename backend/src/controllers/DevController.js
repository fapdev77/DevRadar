// tambem vamos usar o axios para acessar api's externas, como do github.
const axios = require("axios");
// importando nosso modelo com o schema do banco de dados
const Dev = require("../models/dev");
//inportar funcoes de parse
const parseStringAsArray = require("../utils/parseStringAsArray");

// importa o findConnections que sera usado para fazer o filtro
// de localizaçao e tecnologias.
const {findConnections, sendMessage } = require("../websocket");

// via de regra, cada controler tem 5 funcoes no maximo
// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    //criando variavel que recebe a data/hora
    var myLogDateTime = Date(Date.now()).toString();
    //exibe mensagem quando recebe um request
    console.log("Recebi um request para criar um registro: " + myLogDateTime);
    //exibe o que foi requisitado pelo request.query params.
    console.log("Request body:" + request.body);

    //usando axios para obter dados via API do github
    //desestruturando o request.body recebido
    const { github_username, techs, latitude, longitude } = request.body;

    // evitar incluir um registro já cadastrado
    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      try {
        const apiResponse = await axios.get(
          `https://api.github.com/users/${github_username}`
        );
        console.log("Dados retornados " + apiResponse.data);

        // desestruturando os dados e pegando somente o que nos interessa
        let { name = login, avatar_url, bio } = apiResponse.data;
        //se o nome estiver em branco, seta o login como nome.
        if (!name) {
          name = apiResponse.data.login;
        }

        //tratando as informacoes de tecnologias (techs), vamos converter em um array que é como esta
        //configurado em nosso banco de dados.
        const techsArray = parseStringAsArray(techs);

        // armazenar a localizaçao recebida
        const location = {
          type: "Point",
          coordinates: [longitude, latitude] //mongo utiliza dessa forma os pontos
        };

        //Criar nosso registro do banco de dados, sempre usar o await quando fizer esse tipo de requisicao, pois
        //precisamos esperar a resposta do recurso antes de continuar.
        dev = await Dev.create({
          name: name,
          github_username: github_username,
          bio: bio,
          avatar_url: avatar_url,
          techs: techsArray,
          location
        });
        console.log(
          "Inserindo: " + name,
          avatar_url,
          bio,
          github_username,
          techsArray
        );

        // Filtrar as conexões que estão a no maximo 10 km distancia
        // e que novo dev tenha uma das techs filtradas
        const sendSocketMessageTo = findConnections(
          { latitude, longitude }, techsArray
        );
        console.log(sendSocketMessageTo);
        sendMessage(sendSocketMessageTo, 'new-dev', dev);

      } catch (apiError) {
        //Se algum erro, gera uma mensagem e exibe o error.
        const { response } = apiError;
        //console.log(response.headers);
        //console.log(response.request);
        console.log(response.data);
        console.log(
          "Ocorreu um erro na requisição: " +
            response.status +
            " - " +
            response.headers.status
        );
      }
    } else {
      console.log("Já existe esse Dev cadastrado.");
    }
    console.log("Detalhes...");
    console.log(dev);
    //retorna uma mensagem que aparece no browser.
    return response.json(dev);
  },

  async update(request, response) {
    //put code here to update
  },

  async destroy(request, response) {
    //put code here to delete record
  }
};
