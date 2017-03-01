var mongoose = require('mongoose');

var patientSchema = mongoose.Schema({

        // _id :Number,
         aadharNo:Number,
         firstname:String,
         lastname:String,
         email:{type: String, unique: true},
         pass:String,
         passcon:String,
         sex:String,
         phone:Number

});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
