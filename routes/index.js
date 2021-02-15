
var express = require('express');
var router = express.Router();
const assert = require('assert');
const bodyParser=require('body-parser');
const { salesinvoice, }=require('./../models/salesinvoice');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.post('/salesinvoice',bodyParser.raw({
	limit:'512mb'
}),async(req,res,nxt)=>{
	const app=req.app
	const mongoconn=app.get('mongoconn');
	await salesinvoice.create(req.body).then(data=>{
		res.json({
			status:'1',
			salesinvoiceid:data.salesinvoiceid,
			msg:'salesinovice data uploaded.',

		});
	}).catch(e=>{
		res.json({
			status:'0',
			msg:'Error while creating the salesinvoice.',

		});
	})

});

router.get('/salesinvoice',async(req,res,next)=>{
	const app=req.app
	var query = {};
	if(req.query.hasOwnProperty('distributorcode') && typeof(req.query.distributorcode)!=='undefined'){
		query["distributorInfo.distributorCode"]=req.query.distributorcode
	}
	if(req.query.hasOwnProperty('salesinvoiceid') && typeof(req.query.salesinvoiceid)!=='undefined'){
		query["salesinvoiceid"]=req.query.salesinvoiceid
	}

	await salesinvoice.find(query).select('salesinvoiceid salesmanInfo.salesmanName salesmanInfo.salesmanCode beatInfo.beatname beatInfo.beatcode buyerInfo.customername buyerInfo.uniqueRetailerCode buyerInfo.customercode godownInfo.godownName distributorInfo.distributorCode distributorInfo.distributorName buyerStateInfo.buyerStatecode buyerStateInfo.buyerStatename sellerStateInfo.sellerStatecode sellerStateInfo.sellerStatename transactionNumber invoiceDate invoiceType reference1Manual invoiceAmount invoiceOutstanding forumSalesInvoicecf.secondaryTransactionNumber forumSalesInvoicecf.secondaryTransactionNumber status nextStageName modifiedby createdon modifiedon recordReference versionNumber').sort({'invoiceDate': -1}).limit(Number(req.query.limit)).then(data=>{
			res.json({
				status:1,
				count:data.length,
				data:data,
			});
		}).catch(e=>{
			res.json({
				status:0,
			count:0,
			data:'No data found',
		});
		});
	

});

router.post('/salesinvoice/:id',async(req,res,next)=>{
	var query={}
	var params=req.body
	for (const[field,val] of Object.entries(params)){
		query[field]=val
	}
	await salesinvoice.findOneAndUpdate({salesinvoiceid:req.params.id},query).then(result=>{
		res.json({
				status:1,
				msg:"Details updated",
			});

	}).catch(e=>{
		res.json({
				status:0,
				msg:"Error while updating the details",
		});

	});
});
router.get('/count/salesinvoice',async(req,res,next)=>{
	
	await salesinvoice.count({}).then(count=>{
		res.json({
				status:1,
				count:count,
			});
	}).catch(e=>{
		res.json({
				status:0,
				count:0
			});
	})

})

router.get('/delete/salesinvoice',async(req,res,next)=>{

	await salesinvoice.deleteMany({}).then(del=>{
		res.json({
				status:1,
				response:del,
			});
	}).catch(e=>{
		res.json({
				status:0,
				response:e
			});
	})
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
