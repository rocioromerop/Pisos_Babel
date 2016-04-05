'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var crypto = require("crypto");
require('../../../models/userModel');
var User = mongoose.model('User'); // pido el modelo

//var auth = require("../../../lib/auth");

router.get('/', function(req, res) {
    var sort = req.query.sort || 'name';
    // como quiero obtener todos los usuarios, no introduzco filtro: {}
    User.list({}, sort, function(err, rows) {
        if (err) {
            return res.json({ result: false, err: err });
        }
        //Cuando estén disponibles, los mando en JSON
        res.json({ result: true, rows: rows });
        return;
    });
});

router.get('/:comprobar', function(req, res) {
    var usuarioAComprobar = req.body.name;
    var contraseñaUsuarioAComprobar = req.body.pass;
    var i=0;
    User.list({}, 'name', function(err, rows) {
        if (err) {
            return res.json({ result: false, err: err });
        }
        if (rows.length != 0) {
            var prueba = false;
            for (i in rows) {
                console.log("usuarioAComprobar: ", usuarioAComprobar);
                console.log("rows[i].name: ", rows[i].name);
                if (rows[i].name == usuarioAComprobar) {
                    console.log("ENTRO AQUI");
                    prueba = true;
                }
            }
            if (prueba == false) {
                return res.json({ result: false, row: "El usuario y contraseña no coinciden" })
            } else {
                let sha256 = crypto.createHash("sha256");
                sha256.update(contraseñaUsuarioAComprobar, "utf8"); //utf8 here
                let passConHash = sha256.digest("base64");
                if (rows[i].pass == passConHash) {
                    return res.json({ result: true, row: "usuario autenticado correctamente" })
                }
            }
        } 
        else {
            return res.json({ result: false, row: 'El usuario no existe en el sistema' })
        }
    })
});

//llamarlo con name y pass
router.post('/', function(req, res) {

    //quiero poner el hash a la pass primero, y luego ya guardar lo obtenido
    var usuario = {};
    var pass = req.body.pass;
    let filters = {};
    filters.name = req.body.name;
    //comprobar si existe ese nombre en la base de datos primero!
    User.list(filters, 'name', function(err, rows) {
        if (err) {
            res.json({ result: false, err: err });
            return;
        }
        if (rows.length !== 0) {
            res.json({ result: false, err: "El usuario ya está registrado" });
            return;
        } else {
            let sha256 = crypto.createHash("sha256");
            sha256.update(pass, "utf8"); //utf8 here
            let passConHash = sha256.digest("base64");
            usuario.pass = passConHash;
            usuario.name = req.body.name;
            usuario.myAnn = [];
            usuario.myFav = [];
            let user = new User(usuario); // creamos el objeto en memoria, aún no está en la base de datos

            user.save(function(err, newRow) { // lo guardamos en la base de datos
                //newRow contiene lo que se ha guardado, la confirmación
                if (err) {
                    res.json({ result: false, err: err });
                    return;
                }
                res.json({ result: true, row: newRow });
                return;
            });
        }
        return;
    });
});

// para modificar el usuario (en una primera versión, sólo podré modificar los valores de mis anuncios y mis favoritos): me tienen que pasar el usuario (id del usuario) y los nuevos valores a modificar

router.put('/:id', function(req, res) {
    var options = {};
    User.findOne({ _id: req.params.id }, function(err, rows) {
        if (err) {
            return res.json({ result: false, err: err }); // error en la base de datos
        }
        if (rows == null) { //no existe este usuario
            return res.json({ result: false, err: "El usuario no existe (el id pasado no corresponde con ningun usuario" })
        } else { // sí que existe este usuario
            User.update({ _id: req.params.id }, { $push: req.body }, options, function(err, data) {
                if (err) {
                    return res.json({ result: false, err: err });
                }
                return res.json({ result: true, row: data });
            });
        }
    });
});

router.delete('/:id', function(req, res) {
    let nombre = req.params.nombre;
    User.remove({ _id: req.params.id }, function(err) {
        if (err) return res.json({ result: false, err: 'No se ha podido eliminar el usuario (ha ocurrido un problema en la base de datos, o el usuario no existe' });
        res.json({ result: true, resp: "Usuario eliminado correctamente" });
        return;
    });
});

module.exports = router;
