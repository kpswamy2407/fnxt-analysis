const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const dbconn=require("./../components/mongo-conn");

var schema=new Schema({
    salesinvoiceid: {
        type: String,
        required: true,
        unique: true,
    },
},{
    strict: false,
});
var salesinvoice=dbconn.model('salesinvoice', schema, 'salesinvoice');
module.exports={
    salesinvoice,
};
