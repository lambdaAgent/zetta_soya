const fs = require('fs');

fs.readFile('./Products_raw.json', 'utf8', (product_raw_err, products_json) => {
fs.readFile('./Addresses.json', 'utf8', (address_err, addresses_json) => {
fs.readFile('./Images.json', 'utf8', (images_err, images_json) => {
fs.readFile('./Itenary_days.json', 'utf8', (itenary_err, itenary_json) => {
fs.readFile('./Persons.json', 'utf8', (person_err, person_json) => {
fs.readFile('./TnC.json', 'utf8', (tnc_err, tnc_json) => {
fs.readFile('./mongoID.json', 'utf8', (mID_err, mID_json) => {
fs.readFile('./Final_Items.json', 'utf8', (items_err, items_json) => {

	let errors = [];
	errors = errors.concat([product_raw_err]).concat([address_err])
	               .concat([images_err]).concat([itenary_err])
	               .concat([person_err]).concat([tnc_err])
	               .concat([mID_err]).concat([items_err]);

	errors = errors.filter(e => e !== null);

	if(errors.length > 0 ){
		return console.error(errors)
	}



	const [ products_raw,
	        addresses, 
	        images, 
	        itenary, 
	        person, 
	        tnc, 
	        mongoId,
	        items, 
	      ] = createJSON_returnTuple([products_json, addresses_json, images_json, itenary_json, person_json, tnc_json, mID_json, items_json])

  let newProducts = [];
	products_raw.map((p, index) => {
		if(index > 399){ //400 products
			return;
		}

		p._id = pickOneAndSplice(mongoId)['mongoId']['$oid'];
		p.contact_reservation = pickOneAndSplice(person);
		p.contact_notification = pickOneAndSplice(person);
		p.address = pickOneAndSplice(addresses);
		p.meeting_spot = pickOneAndSplice(addresses);
		p.photos = pickRandomAndSplice(images ,randNumber(5)); //array
		p.itenary = pickRandom(itenary, randNumber(30)) ; //array
		p.items = pickRandomMongoIDAndSplice(items ,randNumber(3)); //array of mongoID
		p.TnC = pickOneAndSplice(tnc);
		newProducts.push(p);
	});


	// write newProducts as Final_P577roducts.json
	fs.writeFile("./Final_Products.json", JSON.stringify(newProducts), (err) => {
		if(err) console.error(err)
	});

	let newItem = [];
	items.map((item, index, items_array )=> {
		console.log(index);
	  newProducts.map(p => {

				if(p.items.indexOf(item._id)){
					items_array[index].product = p._id;
				}


		});

		if(index === items.length-1){
			console.log(items_array);
			newItem = items_array;
		}

	});

	// write Final_Items.json
	// 
	fs.writeFile('./Final_Items.json', JSON.stringify(newItem), (err) => {
		if(err) console.error(err);
	});


});
});
});
});
});
});
});
});


function createJSON_returnTuple(arr){
	return arr.map(file => JSON.parse(file))
}


function randNumber(max){ // 0 to max
	return Math.floor(Math.random() * max);
}

function pickRandom(arr, freq){
	var results = [];
	for( var i=0; i < freq; i++){
		const randomIndex = Math.floor(Math.random() * arr.length-1);
		results.push(arr[randomIndex])
	} 
	return results;
}

function pickOneAndSplice(arr, freq){
	const randomIndex = Math.floor(Math.random() * arr.length-1);
	return (arr.splice(randomIndex,1))[0];
}


function pickOneMongoIDAndSplice(arr, freq){
	const randomIndex = Math.floor(Math.random() * arr.length-1);
	return (arr.splice(randomIndex,1))[0]._id;
}

function pickRandomAndSplice(arr, freq){
	var results = [];
	for( var i=0; i < freq; i++){
		const randomIndex = Math.floor(Math.random() * arr.length-1);
		results.push(arr.splice(randomIndex,1))
	} 
	return results;
}


function pickRandomMongoIDAndSplice(arr, freq){
	var results = [];
	for( var i=0; i < freq; i++){
		const randomIndex = Math.floor(Math.random() * arr.length-1);
		results.push(arr.splice(randomIndex,1)._id)
	} 
	return results;
}