// Importa modulo http para trabalhar com requisições websocket e http
const http = require("http");
// Importar o setupWebsocket do arquivo websocket.js
const { setupWebsocket } = require("./websocket");

// definir rotas utiliza o express
const express = require("express");

// importar o mongose para acessar o MomgoDB
const mongoose = require("mongoose");

//importar o modulo routes.js
const routes = require("./routes");

//importar o modulo cors para trabalhar com cross references
const cors = require("cors");

const app = express();
// criando um servidor http para trabalhar fora do express ((instanciando o server)
const server = http.Server(app);
// logo apos criar o server, chama a funcao para criar a conexão via websocket com o server
setupWebsocket(server);

// cria a conexão com o banco de dados.
mongoose.connect(
  "mongodb+srv://omnistack10:omnistack10@cluster0-58uhs.gcp.mongodb.net/omnistack10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// libera acesso esterno para qualquer applicacao.
app.use(cors({ "Access-Control-Allow-Origin": "*" }));

// faz com que o express reconheça as todas as requisições no formato json
// outro exemplo: app.get(express.json()) somente as requisições para rotas 'get' seriam tratadas como json
app.use(express.json());

// habilitar o uso do arquivo de rotas criado nesse app
app.use(routes);

// metodos HTTP
// GET - POST - PUT - DELETE
// get - recuperar dados
// post - incluir um novo recurso/registro
// put - atualizar uma informacao/registro
// delete - deletar um registro/informacao

// Query params: todos ficam visiveis na url da aplicacao, sao acessiveis atraves de request.query (filtros, ordenação, paginação, ...)
// Route params: request.parms é o metodo. usado geralmente para metodos PUT e DELETE quando vc vai trabalhar com um item especifico, como usuario, item, etc...
// Body: request.body é o metodo. Geralmente inclui os dados para criação ou alteração de um registro

// MomgoDB (nao relacional)

//usando express
//app.listen(3333);

//usando http server
server.listen(3333);
