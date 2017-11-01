var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var connectionstring = "mongodb://REDACTED:REDACTED@ds157624.mlab.com:57624/cidm4382";
mongoose.connect(connectionstring, { useMongoClient: true });

mongoose.Promise = global.Promise;

var climbDataSchema = new mongoose.Schema({
    "weight": Number,
    "vfriFlap5": Number,
    "vfriFlap10": Number,
    "vfriFlap15": Number,
    "vClimb": Number
});

var landingDataSchema = new mongoose.Schema({
	"flapsDegree": Number,
	"weight": Number,
	"V_app": String,
	"V_ref": String,
	"V_ga": String
});

var takeoffDataSchema = new mongoose.Schema({
	"flap": Number,
	"weight": Number,
	"above20C": String,
	"altitude0Vr": String,
	"altitude0V2": String,
	"altitude2000Vr": String,
	"altitude2000V2": String,
	"altitude4000Vr": String,
	"altitude4000V2": String,
	"altitude6000Vr": String,
	"altitude6000V2": String,
	"altitude8000Vr": String,
	"altitude8000V2": String,
	"altitude10000Vr": String,
	"altitude10000V2": String
});

var airportDataSchema = new mongoose.Schema({
	"IATA": String,
    "ICAO": String,
    "airportName": String,
    "airportCity": String,
    "airportLatitude": Number,
    "airportLongitude": Number,
    "airportElevation": Number,
    "runways": Array
});

var ClimbData = mongoose.model('ClimbData', climbDataSchema, 'ClimbData');
var LandingData = mongoose.model('LandingData', landingDataSchema, 'LandingData');
var TakeoffData = mongoose.model('TakeoffData', takeoffDataSchema, 'TakeoffData');
var AirportData = mongoose.model('AirportData', airportDataSchema, 'AirportData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
// res.send('You have clicked to view the ClimbData.');
});

/* GET Database page  */
router.get('/data', function(req, res, next) {
	res.render('data', { title: 'Database Data' });
});

/* GET landing page for ClimbData.  */
router.get('/data/climb', function(req, res, next) {
	ClimbData.find({}, function(err,climbdatas) {
	if(err){
		res.send(err);
		return console.error(err);
	}
	
	var output = "";
	
	climbdatas.forEach(function(climbdata){
		console.log(climbdata._id);
    output += climbdata + "<br/>";
	});
	  res.render('dataResult',{ title: "Climb Data Overview", answer: output });
  });
});

/* GET Weight page for ClimbData. */
router.get('/data/climb/weight/', function(req, res, next) {
  ClimbData.find({}, function(err, climbdatas){
    if(err){
        res.send(err);
        return console.error(err);
    }
      
    var output = "";
    
    climbdatas.forEach(function(climbdata){
        console.log(climbdata._id);
        output += "Weight: " + climbdata.weight + "<br/>";
    });
    res.render('dataClimbResult',{ title: "Climb Data Weight", answer: output });
  });
});

/* GET landing page for LandingData.  */
router.get('/data/landing', function(req, res, next) {
	LandingData.find({}, function(err,landingdatas) {
	if(err){
		res.send(err);
		return console.error(err);
	}
	
	var output = "";
	
	landingdatas.forEach(function(landingdata){
		console.log(landingdata._id);
    output += landingdata + "<br/>";
	});
	  res.render('dataResult',{ title: "Landing Data Overview", answer: output });
  });
});

/* GET Weight page for LandingData. */
router.get('/data/landing/weight', function(req, res, next) {
	LandingData.find({}, function(err, landingdatas) {
	if (err) {
		res.send(err);
		return console.error(err);
	}
	
	var output = "";
	
	landingdatas.forEach(function(landingdata){
		console.log(landingdata._id);
		output += "Weight: " + landingdata.weight + "<br/>";
	});
	res.render('dataLandingResult',{ title: "Landing Data Weight", answer: output });
	});
});

/* GET landing page for TakeoffData. */
router.get('/data/takeoff', function(req, res, next) {
	TakeoffData.find({}, function(err,takeoffdatas) {
	if(err){
		res.send(err);
		return console.error(err);
	}
	
	var output = "";
	
	takeoffdatas.forEach(function(takeoffdata){
		console.log(takeoffdata._id);
	output += takeoffdata + "<br/>";
	});
		res.render('dataResult',{ title: "Takeoff Data Overview", answer: output });
	});
});

/* GET landing page for AirportData. */
router.get('/data/airport', function(req, res, next) {
	AirportData.find({}, function(err,airportdatas) {
	if(err){
		res.send(err);
		return console.error(err);
	}
	
	var output = "";
	
	airportdatas.forEach(function(airportdata){
		console.log(airportdata._id);
	output += airportdata + "<br/>";
	});
		res.render('dataResult',{ title: "Airport Data Overview", answer: output });
	});
});

module.exports = router;