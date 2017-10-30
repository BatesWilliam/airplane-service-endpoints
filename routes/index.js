var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var connectionstring = "mongodb://cidm4382:cidm4382@ds157624.mlab.com:57624/cidm4382";
mongoose.connect(connectionstring, { useMongoClient: true });

mongoose.Promise = global.Promise;

/*
{
    "weight": "18000",
    "vfriFlap5": "116",
    "vfriFlap10": "110",
    "vfriFlap15": "107",
    "vClimb": "130"
}
*/

var climbDataSchema = new mongoose.Schema({
    weight: Number,
    vfriFlap5: Number,
    vfriFlap10: Number,
    vfriFlap15: Number,
    vClimb: Number
});

var ClimbData = mongoose.model('ClimbData', climbDataSchema, 'ClimbData');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
 //res.send('You have clicked to view the ClimbData.');
  
  ClimbData.find({}, function(err, climbdatas){
        if(err){
            res.send(err);
            return console.error(err);
        }
      
      var output = "";
      
      for(var climbdata in climbdatas){
          output += climbdata;
        }
      
      res.send(climbdata);
      
  });
});

module.exports = router;