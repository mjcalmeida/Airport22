const express = require("express");
const res = require("express/lib/response");
const ciasAereas = require("../models/CiasAereas");
const router = express.Router();
const dbKnex = require("../models/database/db_Knex");

router.get("/ciasAereas", (req, res) => {
    return new Promise( resolve => {
        dbKnex
        .column('id', 'Nome')
        .select()
        .table("ciasAereas")
        .then( cias => {
            res.render("ciasAereas/index", { cias });
        })
        .catch( err => {
            console.log(err);
        })
    });
})

router.get("/ciasAereas/new", (req, res) => {
    res.render("./ciasAereas/new");
});

router.post("/ciasAereas/save", (req, res) => {
    var Nome  = req.body.Nome; 
    var Sigla = req.body.Sigla;
    var Som   = req.body.Som; 
    var Logo  = req.body.Logo;
    var Ativo = req.body.Ativo;

    if(Sigla != undefined){
        ciasAereas
        .create({
            Nome  : Nome,
            Sigla : Sigla,
            Som   : Som,
            Logo  : Logo,
            Ativo : Ativo
        })
        .then(() => {
            res.redirect("/ciasAereas");
        });
    } else {
        res.redirect("/ciasAereas/new");
    }
});

router.post("/ciasAereas/edit/update", (req, res) => {
    var id    = req.body.id;
    var Nome  = req.body.Nome; 
    var Sigla = req.body.Sigla;
    var Som   = req.body.Som; 
    var Logo  = req.body.Logo;
    var Ativo = req.body.Ativo;

    if( Ativo == '') 
        { Ativo = 0; }
    else 
        { Ativo = 1; }

    ciasAereas
    .update(
        {
            Nome  : Nome,
            Sigla : Sigla,
            Som   : Som,
            Logo  : Logo,
            Ativo : Ativo
        }, {
            where: {id : id},
            returning: true,
            plain: true
        }
    )
    .then(() => {
        res.redirect("/ciasAereas");
    })
    .catch( err => {
        console.log(err);
    });
});

router.get("/ciasAereas/edit/:id", (req, res) => {
    var ID = req.params.id;

    if (isNaN(ID)){
        res.redirect("/ciasAereas");
    }
    return new Promise( resolve => {
        dbKnex
        .select()
        .from('ciasAereas')
        .where({ id : ID })
        .then(
            cias => {
                if( cias[0].Ativo == 0 ) { cias[0].Ativo = "checked"; }
                res.render("ciasAereas/edit", { cias });
            })
        .catch ( erro => {
            res.redirect("/ciasAereas");
        })
    });    
});

router.post("/ciasAereas/delete", (req, res) => {
    var id = req.body.id;

    console.log("Apagando");
    console.log(id);

    if(id != undefined){
        if(!isNaN(id)){
            ciasAereas
            .destroy({
                where: {id: id}
            })
            .then(() => {
                res.redirect("/ciasAereas");
            })
        } else {
            // Não é número
            res.redirect("/ciasAereas");
        }
    } else {
        // É nulo
        res.redirect("/ciasAereas")
    }
});

module.exports = router;