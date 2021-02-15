const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const dbconn=require('./../components/mongo-conn');

var schema=new Schema({
    salesinvoiceid: {
        type: String,
        required: true,
        unique: true,
    },
    distributorInfo:{
        distributorCode :{
        	type:String,
        	index:true,
        },
        distributorName :String,
        phone : String,
        cinNumber : String,
        tinNumber : String,
        stateRegNumber : String,
        centralRegNumber : String,
        licenseNumber : String
    },
    status:String,
    nextStageName:String,
    isStockUpdated:String,
    modifiedon:Date

},{
    strict: false,
});
schema.plugin(uniqueValidator); 
var salesinvoice=dbconn.model('salesinvoice', schema, 'salesinvoice');
module.exports={
    salesinvoice,
};
