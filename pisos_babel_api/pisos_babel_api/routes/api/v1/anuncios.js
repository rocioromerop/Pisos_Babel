'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
require('../../../models/annModel');
var Anuncio = mongoose.model('Anuncio'); // pido el modelo

//var auth = require("../../../lib/auth");

//router.use(auth());  // esta ruta necesita autorización

router.get('/', function(req, res) { 
	let sort = req.query.sort || 'name';
	let filters = {};
	let precio = {};
	let start = 0;
	let limit = 0;

	// PARA LA PAGINACIÓN
	if(req.query.start != undefined){
		start = parseInt(req.query.start);
	}

	if(req.query.limit != undefined){
		limit = parseInt(req.query.limit);
	}

	// PARA LOS FILTROS
	if(req.query.venta != undefined && (req.query.venta === 'false' || req.query.venta === 'true')){
		filters.venta = req.query.venta;
	}

	if(req.query.tags != undefined){
		filters.tags = req.query.tags;
	}

	if(req.query.nombre != undefined){
		filters.nombre = new RegExp('^' + req.query.nombre, "i");
	}

	if(req.query.precio != undefined){

		var pre = req.query.precio.split("-");

		if(pre[1]==""){ //x-
			precio.$gte=pre[0];
		}

		if(pre[0]==""){//-x
			precio.$lte=pre[1];
		}

		if(pre[1] != "" && pre[0] != ""){ //x-y
			precio.$gte=pre[0];
			precio.$lte=pre[1];
		}

		if(pre[1] == undefined){
			precio=pre[0];
		}

		filters.precio=precio;

		}
	Anuncio.list(start, limit, filters, sort, function(err, rows){
		if(err){
			return res.json({result: false, err: 'Hay un error con la base de datos'});
		}
		res.json({result: true, rows: rows});
		return;
	});
});
router.get('/tags', function(req, res) { 
	Anuncio.list('0', '0', {}, 'name', function(err, rows){
		if(err){
			return res.json({result: false, err: err});
		}
		let resultado = null;

		let comprobar = false;
		
		// Coger los tags de todos los anuncios y guardarlos en una variable para luego devolverla en resultado

		for(let i=0; i<rows.length ; i++){
			if(rows[i].tags.length != 0){
				if(comprobar==false){ //es la primera vez que hago el bucle, no quiero agregar el null de resultado
					resultado = rows[i].tags;
					comprobar=true;
				}
				else{
					resultado = rows[i].tags.concat(resultado);
				}
			}
		}

		let resultadoSinRepetir = resultado.filter(function (item, pos) {return resultado.indexOf(item) == pos});

		res.json({result: true, rows: resultadoSinRepetir});
		return;
	});
});



router.post('/', function(req, res) { 

	//Todos los elementos son obligatorios para añadir un anuncio

	if(req.body.nombre == undefined || req.body.venta == undefined || req.body.precio == undefined || req.body.foto == undefined || req.body.tags == undefined){
		return res.json({result: false, err: "Es necesario introducir todos los elementos al anuncio (nombre, venta, precio, foto, tags)"});
	}

	let anuncioAgregar = {};

	//Coger los elementos a añadir del anuncio

	anuncioAgregar.nombre = req.body.nombre;
	anuncioAgregar.venta = req.body.venta;
	anuncioAgregar.precio = req.body.precio;
	anuncioAgregar.foto = req.body.foto;

	//los tags llegan con comas, por tanto tenemos que separarlos para meterlos en la base de datos como elementos diferentes

	let separados = req.body.tags.split(",");

	anuncioAgregar.tags = separados;

	let anuncio = new Anuncio(anuncioAgregar); 

	anuncio.save(function(err, newRow) { // lo guardamos en la base de datos
                //newRow contiene lo que se ha guardado, la confirmación
                if (err) {
                    res.json({ result: false, err: 'Ha ocurrido un error con la base de datos' });
                    return;
                }
                res.json({ result: true, row: newRow });
                return;
            });
});


router.delete('/:id', function(req, res){
	let nombre = req.params.nombre;
	Anuncio.remove({_id: req.params.id}, function(err){
		if(err) return res.json({result: false, err: 'No se ha podido eliminar el anuncio (ha ocurrido un problema en la base de datos, o el anuncio no existe'});
		res.json({result: true, resp: "Anuncio eliminado correctamente"});
		return;
	});

});


router.put('/:id', function(req, res){
	  Anuncio.update({ _id: req.params.id }, { $set: req.body }, {}, function(err, data) {
        if (err) {
            return res.json({ result: false, err: 'No se ha podido modificar el anuncio (ha ocurrido un problema en la base de datos, o el anuncio no existe' });
        }
        res.json({ result: true, row: 'Anuncio modificado correctamente' });
    });
});


module.exports = router;






