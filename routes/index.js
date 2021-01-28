const envs=require('dotenv').config();
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://'+process.env.FNXT_MONGO_HOST+':'+process.env.FNXT_MONGO_PORT;
console.log(url);
const dbName = process.env.FNXT_MONGO_DBNAME;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/salesorder',(req,res,nxt)=>{
	
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	 assert.equal(null, err);
	 const db = client.db(dbName);
	 
	  insertDocuments(db,req.body,'salesorders', function() {
	    client.close();
	    res.json({
            status:'1',
            msg:'salesorder data uploaded.',
           
        });
	  });
	});
});
router.post('/salesinvoice',(req,res,nxt)=>{
	
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	 assert.equal(null, err);
	 const db = client.db(dbName);
	 
	  insertDocuments(db,req.body,'salesinvoices', function() {
	    
	    client.close();
	    res.json({
            status:'1',
            msg:'salesinovice data uploaded.',
           
        });
	  });
	});
});
const insertDocuments = function(db,data,service,callback) {
  
  const collection = db.collection(service);
  // Insert some documents
  collection.insertOne(data, function(err, result) {
  	assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    callback(result);
  });
}

router.get('/count/:service',(req,res,next)=>{
	
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
	  db.collection(req.params.service).count((err,count)=>{
	  	res.json({
	  	status:'1',
         count:count,
         err:err,
	  	})
	  })
	   
	});
})

router.get('/delete/:service',(req,res,next)=>{

	
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
	  db.collection(req.params.service).deleteMany({},(err,result)=>{
	  	res.json({
	  	status:'1',
         data:result,
         err:err,
	  	})
	  })
	   
	});
})
router.get('/test',(req,res,next)=>{
	
	
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	  assert.equal(null, err);
	  
	  const db = client.db(dbName);
	  client.close()
	  res.json({
	  	status:'1',
         msg:'db connected.',
	  })
	});
})
module.exports = router;
