require('dotenv').config();
const mongoose = require('mongoose');

var conn_string=`mongodb://${process.env.FNXT_MONGO_HOST}:${process.env.FNXT_MONGO_PORT}/${process.env.FNXT_MONGO_DBNAME}`;
const mongoconn = mongoose.createConnection(conn_string,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
	serverSelectionTimeoutMS: process.env.FNXT_MONGO_SERVERTIMEOUT || 300000,
});
mongoconn.on('error',function(err){
	process.emit('error',new Error('MongoDB: Error while creating connection'));
});
module.exports=exports=mongoconn;
