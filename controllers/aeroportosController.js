const express = require("express");
const res = require("express/lib/response");
const aeroportos = require("../models/aeroportos");
const router = express.Router();
const dbKnex = require("../models/database/db_Knex");

router.get("/aeroportos", (req, res) => {
    return new Promise( resolve => {
        dbKnex
        .column('id', 'Nome')
        .select()
        .table("aeroportos")
        .then( aeroportos => {
            res.render("aeroportos/index", { aeroportos });
        })
        .catch( err => {
            console.log(err);
        })
    });
})

router.get("/aeroportos/new", (req, res) => {
    res.render("./aeroportos/new");
});

router.post("/aeroportos/save", (req, res) => {
    var Nome  = req.body.Nome; 
    var Sigla = req.body.Sigla;
    var Som   = req.body.Som;
    var portoesEmbarque = req.body.portoesEmbarque;
    var portoesDesembarque = req.body.portoesDesembarque;
    var Ativo = req.body.Ativo;

    if(Sigla != undefined){
        aeroportos
        .create({
            Nome  : Nome,
            Sigla : Sigla,
            Som   : Som,
            portoesEmbarque : portoesEmbarque,
            portoesDesembarque : portoesDesembarque,
            Ativo : Ativo
        })
        .then(() => {
            res.redirect("/aeroportos");
        });
    } else {
        res.redirect("/aeroportos/new");
    }
});

router.post("/aeroportos/edit/update", (req, res) => {
    var id    = req.body.id;
    var Nome  = req.body.Nome; 
    var Sigla = req.body.Sigla;
    var Som   = req.body.Som;
    var portoesEmbarque = req.body.portoesEmbarque;
    var portoesDesembarque = req.body.portoesDesembarque;
    var Ativo = req.body.Ativo;

    if( Ativo == '') 
    { Ativo = 0; }
else 
    { Ativo = 1; }

    aeroportos
    .update(
        {
            Nome    : Nome,
            Sigla   : Sigla,
            Som     : Som,
            portoesEmbarque : portoesEmbarque,
            portoesDesembarque : portoesDesembarque,
            Ativo   : Ativo
        }, {
            where: {id : id},
            returning: true,
            plain: true
        }
    )
    .then(() => {
        res.redirect("/aeroportos");
    })
    .catch( err => {
        console.log(err);
    });
});

router.get("/aeroportos/edit/:id", (req, res) => {
    var ID = req.params.id;

    if (isNaN(ID)){
        res.redirect("/aeroportos");
    }
    return new Promise( resolve => {
        dbKnex
        .select()
        .from('aeroportos')
        .where({ id : ID })
        .then(
            aeroportos => {
                if( aeroportos[0].Ativo == 0 ) { aeroportos[0].Ativo = "checked"; }
                res.render("aeroportos/edit", { aeroportos });
            })
        .catch ( erro => {
            res.redirect("/aeroportos");
        })
    });    
});

router.post("/aeroportos/delete", (req, res) => {
    var id = req.body.id;

    console.log("Apagando");
    console.log(req);

    if(id != undefined){
        if(!isNaN(id)){
            aeroportos
            .destroy({
                where: {id: id}
            })
            .then(() => {
                res.redirect("/aeroportos");
            })
        } else {
            // Não é número
            res.redirect("/aeroportos");
        }
    } else {
        // É nulo
        res.redirect("/aeroportos")
    }
});

module.exports = router;