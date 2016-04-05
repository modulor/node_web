/***********************************************************************/

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

// method-override (para usar metodo PUT en formularios)

var method_override = require("method-override");

app.use(method_override("_method"));

/***********************************************************************/


/***********************************************************************/

// definir un modelo (tabla)

var productoSchema = {
	title: String,
	descripcion: String,
	pricing: Number,
	imagen: String
};

var Product = mongoose.model("products", productoSchema);

/***********************************************************************/


/***********************************************************************/

// home

app.get("/",function(solicitud, respuesta){		
	respuesta.render("index");
});

// nuevo producto

app.get("/productos/nuevo/", function(solicitud, respuesta){

	respuesta.render("productos/nuevo");

});

// producto (nuevo producto)

app.post("/producto", function(solicitud, respuesta){

	// console.log(solicitud.file.originalname);

	cloudinary.uploader.upload(solicitud.file.path, 
		function(result){ 

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

				respuesta.redirect("/productos/lista");

			});

		}
	);

	

});

// lista de productos

app.get("/productos/lista/", function(solicitud, respuesta){

	// buscar los productos en la base de datos (mongo)

	Product.find(function(error,doc){

		if(error)
			console.log(error);

		respuesta.render("productos/lista",{productos: doc});

	});


});

// editar producto (formulario)

app.get("/productos/editar/:id",function(solicitud, respuesta){

	Product.findOne({"_id": solicitud.params.id},function(error,documento){

		if(error){
			console.log(error);
			respuesta.end();
		}
			
		else{
			respuesta.render("productos/editar",{producto: documento});
		}			

	});

});

// editar producto (put)

app.put("/productos/editar/:id",function(solicitud,respuesta){

	var data = {
		title: solicitud.body.title,
		descripcion: solicitud.body.descripcion,
		pricing: solicitud.body.pricing
	};

	Product.update({"_id": solicitud.params.id},data,function(product){

		respuesta.redirect("/productos/lista");

	});

});

// puerto 

app.listen(8080);

/***********************************************************************/