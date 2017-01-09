const fs = require('fs');

fs.readFile("./Items_raw.json", "utf8", (item_raw_err, items_json) => {
fs.readFile("./item_validity.json", "utf8", (validity_err, item_validity_json) => {
fs.readFile("./item_group_size.json", "utf8", (group_err, group_size_json) => {
fs.readFile('./item_refund_policy.json', 'utf8', (refund_err, refund_policy_json) => {
fs.readFile('./mongoID.json', 'utf8', (mId_err, mongodID_JSON) => {

		let errors = [];
		errors = errors.concat([item_raw_err]).concat([validity_err]).concat([group_err]).concat([refund_err]).concat([mId_err])
		errors = errors.filter(e => e !== null);

		if(errors.length > 0 ){
			return console.error(errors)
		}

		let items_raw = JSON.parse(items_json);
		const item_validity = JSON.parse(item_validity_json);
		const item_group_size = JSON.parse(group_size_json);
		const item_refund_policy = JSON.parse(refund_policy_json);
		const item_mongo_id = JSON.parse(mongodID_JSON);

		items_raw = items_raw.map(i => {
			// change validity_start and validity_end to validity:{ start, end}
			// delete active_allotment_per_week for item
			i._id = item_mongo_id[ randNumber(item_mongo_id.length-1) ]['mongoId']['$oid'];
			i.price = Math.floor(Math.random() * 1000) * 1000;
			i.refund_policy = pickRandom(item_refund_policy, randNumber(3));
			i.max_group = item_group_size[ randNumber(item_group_size.length-1) ];
			i.min_group = item_group_size[ randNumber(item_group_size.length-1) ];
			i.validity = item_validity[ randNumber(item_validity.length-1) ];
			return i;
	  });

			fs.writeFile('Final_Items.json', JSON.stringify(items_raw), (err) => {
				if(err) console.error(err);
			});

});
});
});
});
});


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