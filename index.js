const express = require("express");
const app     = express();
const conn    = require("./models/database/database");
const fs      = require('fs'); // Sistema de arquivos

// View Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static(__dirname + '/public'));

//Body-parser
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Database
conn
.authenticate()
.then(() => {
    console.log("Conexão efetuada com sucesso!");
})
.catch((error) => {
    console.log(error);
});

app.get("/", function(req, res){
    res.render("\principal")
});

// Importando os Controllers
const ciasAereasController  = require("./controllers/ciasAereasController");
const aeroportosController  = require("./controllers/aeroportosController");
const voosController  = require("./controllers/voosController");

app.use(ciasAereasController);
app.use(aeroportosController);
app.use(voosController);

app.listen(8080,function(erro){
    if(erro){
        console.log("Ocorreu um erro");
    }else{
        console.log("Console iniciado com Sucesso!!!!");
    }
})