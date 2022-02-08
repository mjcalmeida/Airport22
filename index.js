const express = require("express");
const app     = express();
const conn    = require("./models/database/database");
const fs      = require('fs'); // Sistema de arquivos

// View Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

app.get("/", function(req, res){
    res.render("\Principal")
});


app.listen(8080,function(erro){
    if(erro){
        console.log("Ocorreu um erro");
    }else{
        console.log("Console iniciado com Sucesso!!!!");
    }
})