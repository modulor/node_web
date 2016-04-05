// express js

var express = require("express");

var app = express();

// mongodb con mongoose (conexion base de datos)

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/webapp");

// jade (template html)

app.set("view engine","jade");

// static elements (img/, css/)

app.use(express.static("public"));

// body parser

var boddyParser = require("body-parser");

app.use(boddyParser.json());

app.use(boddyParser.urlencoded({extended: true}));

// multer (para imagenes)

var multer = require("multer");

app.use(multer({dest: './uploads'}).single('imagen'));

// cloudinary (cloud para almacenar imagenes)

var cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: 'modulor2k',
	api_key: '349587919447627',
	api_secret: 'IWDybPBsi8d0hEmxNz89VO4XjOw'
});



// definir un modelo (tabla)

var productoSchema = {
	title: String,
	descripcion: String,
	pricing: Number,
	imagen: String
};

var Product = mongoose.model("products", productoSchema);

// home

app.get("/",function(solicitud, respuesta){		
	respuesta.render("index");
});

// nuevo producto

app.get("/productos/nuevo/", function(solicitud, respuesta){

	respuesta.render("productos/nuevo");

});

// producto (post)

app.post("/producto", function(solicitud, respuesta){

	// console.log(solicitud.file.originalname);

	cloudinary.uploader.upload(solicitud.file.path, 
		function(result){ 

			console.log("url:");
			console.log(result.url);

			// guardar producto

			var data = {
				title: solicitud.body.title,
				descripcion: solicitud.body.descripcion,
				pricing: solicitud.body.pricing,
				imagen: result.url
			};

			// creacion de un producto

			var producto = new Product(data);

			producto.save(function(err){

				respuesta.render("index");

			});

		}
	);

	

});

// puerto 

app.listen(8080);