
var itemScheam = {
	name_item: String,
	date: Date,
	group_size: {
		max_size: {
			adult:Number,
			child:Number
		},
		min_size: {
			adult: Number,
			child:Number
		}
	},
	validity:{
		start: Date,
		end: Date
	},
	description: String,
	refund_policy: {
		status: [true, false],
		
		limit_date: Date,
		percentage_refund: Number
	},
	allotment: [{
		date: Date,
		contract_role: {
			timeslot:[{
				start_hour: String,
				end_hour:String,
				allotment_allocate: Number,
				allotment_used: Number,
				price_adult: Number,
				price_children: Number,
			}],
			sales: [{ //sales is not confirmed yet
				timestamp: Number
			}],
			active_allotment_per_week: String
		},
		publish_role: {
			timeslot: [{
				start_hour: String,
				end_hour: String,
				allotment_allocate: Number,
				allotment_used: Number,
				price_adult: Number,
				price_children: Number
			}],
			sales: [{
				timestamp: Number
			}],
			active_allotment_per_week: String
		}
	}],
	discount: {
		discount_percentage: Number,
		description: String,
	},

}