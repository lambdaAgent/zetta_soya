var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, '');

const suppliers = JSON.parse(fs.readFileSync(baseDir+'/../database/Suppliers.json', 'utf8'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get("/supplierList", (req, res, next) => {
	 		const supplierNames = suppliers.map(s => {
	 			return {
	 				label: s.supplier_name,
	 				value: s.supplier_name
	 			}
	 		});
	 		//must match the structure
	 		//supplierNames = [{
	 		//  label: String,
	 		//  value: String
	 		//}]
	 		
	 		res.json(supplierNames);
});

router.post('/supplier', (req, res) => {
	console.log(req.body);
	const newSupplier = {
		supplier_name: req.body.companyName || "",
		taxId: req.body.taxID || "",
		owner: req.body.ownerName || "",
		marketManager: {
			first_name: req.body.marketManager ? req.body.marketManager.split(" ")[0]  : "",
			last_name: req.body.marketManager ? req.body.marketManager.split(" ")[1] : ""
		},
		address: req.body.companyAddress || "",
		mobileNumber: req.body.ownerMobileNumber || "",
		email: req.body.ownerEmail || "",
		category: req.body.businessCategory || "",
		createdAt: '12/19/2016'  || ""
	}
	suppliers.push(newSupplier);
	console.log(newSupplier);
	console.log(suppliers[suppliers.length-1]);
	res.json(newSupplier);
});

router.delete("/supplier/:supplierName", (req, res) => {
	const supplierTobeDeleted = req.params.supplierName;
	suppliers.map((s, index) => {
		if(s.supplier_name === supplierTobeDeleted){
			suppliers.splice(index, 1);
		}
	});
	const supplierListWithManager = suppliers.map(s => {
	 			return {
	 				supplierName:s.supplier_name,
	 				marketManager: s.marketManager.first_name + ' ' + s.marketManager.last_name,
	 				_id: s.id
	 			};
	 		})
	 		
	 		res.json(supplierListWithManager);
});

router.get("/supplierListWithManager", (req, res) => {
	 		const supplierListWithManager = suppliers.map(s => {
	 			return {
	 				supplierName:s.supplier_name,
	 				marketManager: s.marketManager.first_name + ' ' + s.marketManager.last_name,
	 				_id: s.id
	 			};
	 		})
	 		
	 		res.json(supplierListWithManager);
});

router.get("/supplier/:supplierName", (req, res) => {
	const supplierName = req.params.supplierName;
	const selectedSupplier = suppliers.filter(s => s.supplier_name === supplierName)[0];
	console.log(selectedSupplier)
	res.json(selectedSupplier);
});

router.get("/products/:supplierName", (req, res) => {
	const supplierName = req.params.supplierName;
	const selectedSupplier = suppliers.filter(s => s.supplierName === supplierName)[0];

	res.json(selectedSupplier.products);
});

router.get("/products/:supplierName/:productName", (req, res) => {
	const supplierName = req.params.supplierName;
	const productName = req.params.productName;
	const selectedSupplier = suppliers.filter(s => s.supplierName === supplierName)[0];
	const selectedProduct = selectedSupplier.products.filter(p => p['product_name'] === productName)[0];
	res.json(selectedProduct);
});


module.exports = router;
