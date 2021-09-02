const payload = {
	startDate: "2016-01-26",
	endDate: "2018-02-02",
	minCount: 2700,
	maxCount: 3000,
};
exports.recordMocks = {
	getAllRecord: {
		input: payload,
		output: {
			statusCode: 200,
			contain: "records",
		},
	},
	withoutEndDate: {
		input: {
			startDate: "2016-01-26",
			minCount: 2700,
			maxCount: 3000,
		},
		output: {
			code: 1,
			contain: "endDate is required field.",
		},
	},
	routeNotFound: {
		input: payload,
		output: {
			code: 1,
			contain: "error",
		},
	},
};
