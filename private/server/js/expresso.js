/*************************************************************************************************************************************
														Initialization / requirements
*************************************************************************************************************************************/


var express = require('express'),
	session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    https = require('https'),
	fs = require('fs');


/*************************************************************************************************************************************
														Global Variables
*************************************************************************************************************************************/

var databaseString = mongodb://generic:1234@ds041238.mongolab.com:41238/seng299,
    app = express(),
	db = mongoose.connection,

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
	Power: { type: int},
	PowerBonus: {type: int},
	AttractionBonus: {type: int},
	Luck: {type int},
	CheeseEffect: {type: String},
	Description: {type: String},
	SpecialEffect: {type: boolean},
});

var skinSchema = new mongoose.Schema({
	Name:{type: String},
	SpecialEffect{type: boolean},	
});

var weaponSchema = new mongoose.Schema({
	Name: { type: String},
	Power: { type: int},
	PowerBonus: {type: int},
	AttractionBonus: {type: int},
	Luck: {type int},
	CheeseEffect: {type: String},
	Description: {type: String},
	SpecialEffect: {type: boolean},
	Skin: [skinSchema],
});

var chesseSchema = new mongoose.Schema({
	Name: { type: String},
	Description: {type: String},
	Purchasable: {type: boolean},
	Craftable: {type: boolean},
	Cost: {type: int},
	refundable: {type: boolean},
	refundValue: {type: int},
});

var charmSchema = new mongoose.Schema({
	Name: { type: String},
	Power: { type: int},
	PowerBonus: {type: int},
	AttractionBonus: {type: int},
	Luck: {type int},
	CheeseEffect: {type: String},
	Description: {type: String},
	SpecialEffect: {type: boolean},
	ConsumedUpon: {type: String},
});
var ingredientSchema = new mongoose.Schema({
	Name: {type: String},
	Quantity:{type: int},
	Description:{type: String},
});
var recipeSchema = new mongoose.Schema({
	Ingredients: [IngredientSchema],
	Description: {type: String},
	QuantityRecieved: {type: int},
});
var potionSchema = new mongoose.Schema({
	Name: {type: String},
	InCheese: {type: String},
	InCheeseQuantity: {type: int},
	OutCheese: {type: String},
	OutCheeseQuantity: {type: int},
	Cost: {type: int},
});

/*************************************************************************************************************************************
														Global DataBase Variables
*************************************************************************************************************************************/

var base = mongoose.model('Base', baseSchema);
var weapon = mongoose.model('Weapon', weaponSchema);


mongoose.connect(databaseString, function(error){
	if(err){
		console.log("database connection not found");
	}
	else{
		console.log('MongoDB connection ready');
	}
});


app.use(bodyParser.json());
app.use(express.static(__dirname));

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