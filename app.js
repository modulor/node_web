// express js

var express = require("express");

var app = express();

// mongodb con mongoose (conexion base de datos)

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/webapp");

// definir un modelo (tabla)

/*

var productoSchema = {
	title: String,
	descripcion: String,
	imageUrl: String,
	pricing: Number
};

var Product = mongoose.model("Product", productoSchema);

*/

// jade (template html)

app.set("view engine","jade");

// static elements (img/, css/)

app.use(express.static("public"));

// home

app.get("/",function(solicitud, respuesta){
	
	/*

	// insertar un registro

	var data ={
		title: "Mi primer producto",
		descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis debitis laborum temporibus fugiat harum quis minima, aut quam. Asperiores iure optio adipisci quae amet, deserunt corporis ex quasi! Odio, vero.",
		imageUrl: "data.png",
		pricing: 9.99
	};

	var producto = new Product(data);

	console.log("producto");

	producto.save(function(err){
		console.log(producto);
	});
	*/	
	respuesta.render("index");
});

// nuevo producto

app.get("/productos/nuevo/", function(solicitud, respuesta){

	respuesta.render("productos/nuevo");

});

// puerto 

app.listen(8080);