const fs = require("fs");


//randomize product's sales
fs.readFile("./sales_list1.json", 'utf8', (err, sales_json1) => {
fs.readFile("./sales_list2.json", 'utf8', (err, sales_json2) => {
fs.readFile("./sales_list3.json", 'utf8', (err, sales_json3) => {

	fs.readFile('./marketManager.json', 'utf8', (err, marketManager_json) => {
	fs.readFile('./products.json', 'utf8', (err, products_json) => {
		fs.readFile('./supplier_raw.json', 'utf8', (err, supplier_json) => {

			const products = JSON.parse(products_json)
			let sales1 = JSON.parse(sales_json1);
			let sales2 = JSON.parse(sales_json2);
			let sales3 = JSON.parse(sales_json3);
			const suppliers = JSON.parse(supplier_json);
			const marketManagers = JSON.parse(marketManager_json);


			let newProduct = [];
			products.map((product, productIndex) => {
				//take 30 products??
				if(productIndex > 32){
					return;
				}
				
				//take 50 for each sales[1,2,3], and splice and put it to product.sales
				product.sales = take30PerSales(sales1.map(s => { 
					return convertSalesToTimestampSales(s, Number(product.product_price).toFixed(0));
				}));
				product.sales.concat(take30PerSales(sales2.map(s => { 
					return convertSalesToTimestampSales(s, Number(product.product_price).toFixed(0));
				})));
				product.sales.concat(take30PerSales(sales3.map(s => { 
					return convertSalesToTimestampSales(s, Number(product.product_price).toFixed(0));
				})));	
				newProduct.push(product);
			});

			//add status::boolean to each of newProduct
			const bool = [true, false];
			newProduct = newProduct.map(p => {
				p.status = bool[Math.floor(Math.random())];
				return p;
			}) 

			//make new Products.json file?

			suppliers.map(supplier => {
				supplier.products = take5FromProduct(newProduct);
				supplier.marketManager = marketManagers.splice( Math.floor(Math.random() * marketManagers.length-1), 1)[0];
			});

			fs.writeFile('Supplier.json', JSON.stringify(suppliers), (err) => {
				if(err) console.error(err);
			})

	  })//readFile(supplier)
  });//readFile(product)
  });
});
});
});


function take30PerSales(sales){
	const arrayOf30Sales = [];
	for(var i=0;i < 30;i++){
		const randomIndex = (Math.random() * 29) ; //randomize 0 to 30
		const spliced = sales.splice(randomIndex,1)[0];
		arrayOf30Sales.push(spliced);
	}
	return arrayOf30Sales;
}

function take5FromProduct(products){
	const arrayOfProducts = [];
	for(var i=0; i < 3; i++){
		const randomIndex = (Math.random() * 2) ; //randomize 0 to 2
		const spliced = products.splice(randomIndex, 1)[0];
		arrayOfProducts.push(spliced);
	}
	return arrayOfProducts;
}

function convertSalesToTimestampSales(s, product_price){
		// s::salesObject
		const timestamp = new Date(s.salesDate+' '+s.salesTime).getTime();
		return {[timestamp]: {
			amount: s.amount,
			total: s.amount * product_price
		}}
}