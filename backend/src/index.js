const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 
const index = require('./app/controllers/index');
const bodyParser = require('body-parser');
const cors = require ('cors');

const app = express();

//conectando ao banco e removendo mensagens de erro
mongoose.connect('mongodb+srv:@cluster0-zp7kr.mongodb.net/carb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});


app.use(express.json());
app.use(bodyParser.json());
app.use(routes); //importando as routas do arquivo routes.js e setando no express
app.use(cors());

index(app); // atribuindo o app para todos os controllers

//Tipos de parametros:
//Para POST, usa-se o Body: request.body (criação de novos registros)

//banco: mongoDB

app.listen(3333)

