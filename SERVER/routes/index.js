var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, '');
console.log(baseDir+'../database')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/supplierList", (req, res, next) => {
	fs.readFile(baseDir+"/../database/Suppliers.json", 'utf8', (err, data) => {
	 		const suppliers = JSON.parse(data);
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
 })
});

router.get("/supplier/:supplierName", (req, res) => {
	 const supplierName = req.params.supplierName;
	 fs.readFile(baseDir+"/../database/Suppliers.json", 'utf8', (err, data) => {
	 		const suppliers = JSON.parse(data);
	 		const selectedSupplier = suppliers.filter(s => s.supplier_name === supplierName)[0];
	 		console.log(selectedSupplier)
	 		res.json(selectedSupplier);
	 })
});


module.exports = router;
