/*************************************************************************************************************************************
														Initialization / requirements
*************************************************************************************************************************************/


var express = require('express'),
	session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    https = require('https'),
    path = require('path'),
	fs = require('fs');


/*************************************************************************************************************************************
														Global Variables
*************************************************************************************************************************************/

var databaseString = "mongodb://generic:1234@ds041238.mongolab.com:41238/seng299",
    app = express(),
	db = mongoose.connection

/*************************************************************************************************************************************
														Database Connection
*************************************************************************************************************************************/	

	
db.on('error', console.error);
db.once('open', function(){});

/*************************************************************************************************************************************
														SCHEMAS
*************************************************************************************************************************************/

var baseSchema = new mongoose.Schema({
	Name: { type: String},
	Power: {type: Number},
	PowerBonus: {type: Number},
	AttractionBonus: {type: Number},
	Luck: {type: Number},
	CheeseEffect: {type: String},
	Description: {type: String},
	SpecialEffect: {type: Boolean},
});

var skinSchema = new mongoose.Schema({
	Name: {type: String},
	SpecialEffect: {type: Boolean},	
});

var weaponSchema = new mongoose.Schema({
	Name: { type: String},
	Power: { type: Number},
	PowerBonus: {type: Number},
	AttractionBonus: {type: Number},
	Luck: {type: Number},
	CheeseEffect: {type: String},
	Description: {type: String},
	SpecialEffect: {type: Boolean},
	Skin: [skinSchema],
});

var chesseSchema = new mongoose.Schema({
	Name: { type: String},
	Description: {type: String},
	Purchasable: {type: Boolean},
	Craftable: {type: Boolean},
	Cost: {type: Number},
	refundable: {type: Boolean},
	refundValue: {type: Number},
});

var charmSchema = new mongoose.Schema({
	Name: { type: String},
	Power: { type: Number},
	PowerBonus: {type: Number},
	AttractionBonus: {type: Number},
	Luck: {type: Number},
	CheeseEffect: {type: String},
	Description: {type: String},
	SpecialEffect: {type: Boolean},
	ConsumedUpon: {type: String},
});
var ingredientSchema = new mongoose.Schema({
	Name: {type: String},
	Quantity:{type: Number},
	Description:{type: String},
});
var recipeSchema = new mongoose.Schema({
	Ingredients: [ingredientSchema],
	Description: {type: String},
	QuantityRecieved: {type: Number},
});
var potionSchema = new mongoose.Schema({
	Name: {type: String},
	InCheese: {type: String},
	InCheeseQuantity: {type: Number},
	OutCheese: {type: String},
	OutCheeseQuantity: {type: Number},
	Cost: {type: Number},
});

/*************************************************************************************************************************************
														Global DataBase Variables
*************************************************************************************************************************************/

var base = mongoose.model('Base', baseSchema);
var weapon = mongoose.model('Weapon', weaponSchema);


mongoose.connect(databaseString, function(error){
	if(error){
		console.log("database connection not found");
	}
	else{
		console.log('MongoDB connection ready');
	}
});


app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/',function(req,res){
	var cwd = process.cwd();
	var file = path.resolve("../../../public/client/index.html")
	res.sendfile(file);
	
})
app.get('/addBase', function(req, res){
	var test = new base({
		
	}); 
	test.save(function(err){
		if(err) return console.error(err);
		res.json(200, {message: 'true'});
	});
});

//Create the server on port 3000
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});


/*************************************************************************************************************************************
														serverPost Methods
*************************************************************************************************************************************/

//Note: If a function does not encounter any errors, it must call res.send(200);
//To send data back from the server, use res.json(200, < JSON string >);
//If there is an error, call res.send(500, < Error message >);

app.post('/', function(req, res, next){
    res.json(200, {message: 'You\'re a wizard, Harry'});
});