exports.createAggPipeForRecord = function createAggregatePipeline({ minCount, maxCount, startDate, endDate }) {
	try {
		// match on date
		const dateFilter = {'$match':{}};
		// match the count
		const countFilter = {'$match':{}};

		// to unwind count from array to find sum
		const unwind = {
			$unwind: "$counts",
		};

		// group by id to find unwind result and get sum
		const groupBy =  {
			$group: {
				_id: "$_id",
				counts: {
					$sum: "$counts",
				},
				data: { $first: "$$ROOT" },
			},
		};

		// project the result which we really wanted to sent in response
		const projection = {
			$project: {
				_id: "$_id",
				counts: "$counts",
				key: "$data.key",
				createdAt: "$data.createdAt",
				value: "$data.value",
			},
		};

		// field validation : in initial call we already validate the result but its just shake of error handling
		if(startDate || endDate) {
			let createdAt = {};
			if(startDate) {
				createdAt['$gt'] = parseDate(startDate);
			}
			if(endDate) {
				createdAt['$lt'] = parseDate(endDate);
			}
			dateFilter['$match'].createdAt = createdAt;
		}
		if(minCount || maxCount){
			let counts = {};
			if(minCount) counts['$gte'] = minCount;
			if(maxCount) counts['$lte'] = maxCount;
			countFilter['$match'].counts = counts;
		}
		return [dateFilter,unwind,groupBy,countFilter,projection]
		
	} catch (e) {
		console.log("e:::",e)
		throw new Error(`Error occured due to : ${e.message}`);
	}
}

function parseDate(date){
	let parseDate = new Date(date)
	if(parseDate.getTime()) return parseDate
	else throw new Error("Date is not in valid formate.")
}