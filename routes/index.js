var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/salesorder',(req,res,nxt)=>{
	const MongoClient = require('mongodb').MongoClient;
	const assert = require('assert');
	 
	// Connection URL
	const url = 'mongodb://13.234.66.77:27017';
	 
	// Database Name
	const dbName = 'myproject';
	 
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");
	 
	  const db = client.db(dbName);
	 
	  insertDocuments(db, function() {
	    client.close();
	  });
	});
});

const insertDocuments = function(db,data,callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertOne(data, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 documents into the collection");
    callback(result);
  });
}
router.get('/test',(req,res,next)=>{
	const MongoClient = require('mongodb').MongoClient;
	const assert = require('assert');
	 
	// Connection URL
	const url = 'mongodb://127.0.0.1:27017';
	 
	// Database Name
	const dbName = 'fnxt';
	 
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");
	  const db = client.db(dbName);
	 client.close()
	});
})
module.exports = router;
