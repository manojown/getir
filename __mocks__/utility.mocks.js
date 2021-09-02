exports.withAll = {
	input: {
		startDate: "2016-01-26",
		endDate: "2018-02-02",
		minCount: 2700,
		maxCount: 3000,
	},
	output: [
		{ $match: { createdAt: { $gt: "2016-01-26T00:00:00.000Z", $lt: "2018-02-02T00:00:00.000Z" } } },
		{ $unwind: "$counts" },
		{ $group: { _id: "$_id", counts: { $sum: "$counts" }, data: { $first: "$$ROOT" } } },
		{ $match: { counts: { $gte: 2700, $lte: 3000 } } },
		{ $project: { _id: "$_id", counts: "$counts", key: "$data.key", createdAt: "$data.createdAt", value: "$data.value" } },
	],
};

exports.withoutMaxCount = {
	input: {
		startDate: "2016-01-26",
		endDate: "2018-02-02",
		minCount: 2700,
	},
	output: [
		{ $match: { createdAt: { $gt: "2016-01-26T00:00:00.000Z", $lt: "2018-02-02T00:00:00.000Z" } } },
		{ $unwind: "$counts" },
		{ $group: { _id: "$_id", counts: { $sum: "$counts" }, data: { $first: "$$ROOT" } } },
		{ $match: { counts: { $gte: 2700 } } },
		{ $project: { _id: "$_id", counts: "$counts", key: "$data.key", createdAt: "$data.createdAt", value: "$data.value" } },
	],
};