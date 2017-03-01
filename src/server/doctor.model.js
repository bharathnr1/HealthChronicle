var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');

var doctorSchema = mongoose.Schema({

        // _id :Number,
         firstname:String,
         lastname:String,
         email:{type: String, unique: true},
         age:String,
         medicalid:String,
         registrationboard:String,
         qualification:String,
         pass:String,
         passcon:String,
         sex:String,
         phone:Number

});

var Doctor = mongoose.model('Doctor', doctorSchema);
//doctorSchema.plugin(uniqueValidator);

module.exports = Doctor;
