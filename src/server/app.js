var express =require('express');
var path=require('path');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');


var app=express();

app.set('port',(process.env.PORT || 3000));
//Set Static Folder
app.use('/',express.static(__dirname+'/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hcold');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

var Patient = require('./patient.model.js');
var Doctor = require('./doctor.model.js');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected to MongoDB');

app.post('/patient',function(req,res) {
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.pass, salt);

   var patient = new Patient({
aadharNo:    req.body.aadharNo,
firstname:   req.body.firstname,
lastname:    req.body.lastname,
email:       req.body.email,
pass:        hash,
phone:       req.body.phone,
   });

   patient.save(function(err,patient){
      if(err) console.log(err);
      // return console.error(err); }
     res.status(200).json(patient);
   });
});

app.post('/doctor',function(req,res) {
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.pass, salt);

  var doctor = new Doctor({
firstname:   req.body.firstname,
lastname:    req.body.lastname,
email:       req.body.email,
age:        req.body.age,
medicalid:  req.body.medicalid,
registrationboard: req.body.registrationboard,
pass:        hash,
sex:         req.body.sex,
phone:       req.body.phone,
   });

   doctor.save(function(err,doctor){
      if(err) console.log(err);
      // return console.error(err); }
     res.status(200).json(doctor);
   });
});

app.post('/login', function(req,res){
 // console.log(req.body.email);
  // console.log(obj.email);

Patient.findOne({email: req.body.email}, function(err, patient){
message=false;
if(!patient){
  //render login page again and print error message
  //console.log(Patient);
  Doctor.findOne({email: req.body.email}, function(err, doctor){
    message = false;
    if(!doctor)
    {
      console.log("Doesn't exist");
      res.status(200).json(null);
    }
    else {
      if(bcrypt.compareSync(req.body.password,doctor.pass)) {
          //redirect to HOME page!
          console.log("Ola!");
          res.status(200).json(doctor.firstname);
      } else {
        // print error "Incorrect userid/password"
        res.status(200).json(message);
        //console.log("Wrong credentials");
        console.log("Wrong Credentials");
        }
      }
    });
  }

else {
  if(bcrypt.compareSync(req.body.password,patient.pass)) {
      //redirect to HOME page!
      console.log("Ola!");
      res.status(200).json(patient.firstname);
  } else {
    // print error "Incorrect userid/password"
    res.status(200).json(message);
    //console.log("Wrong credentials");
    console.log("Wrong Credentials");     }
    }
  });
});


app.get('/logout', function(req, res){
  res.redirect('/');
});


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
});

  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+ app.get('port'));
  });

});

module.exports = app;
