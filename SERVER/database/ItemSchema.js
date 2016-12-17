
var itemScheam = {
	date: Date,
	description: String,
	refundable: {
		status: [true, false],
		limitDate: Date,
		percentageRefund: Number
	},
	allotment: [{
		date: Date,
		ContractRole: {
			timeslot:[{
				startHour: String,
				endHour:String,
				allotment_allocate: Number,
				allotment_used: Number,
				priceAdult: Number,
				priceChildren: Number,
			}]
		},
		PublishRole: {
			timeslot: [{
				startHour: String,
				endHour: String,
				allotment_allocate: Number,
				allotment_used: Number,
				priceAdult: Number,
				priceChildren: Number
			}]
		}
	}],
	discount: {
		discount_percentage: Number,
		description: String,
	}
}