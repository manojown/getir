const DbConnection = require("../config/db");
const { createAggPipeForRecord } = require("../helpers/utility");
const collectionName = 'records'


/**
 * @description Retrive all the payload with body criteria
 * @param  { object } data
 * @return { Array } result
 */
exports.getRecord = async function getRecord(data) {
	try {
		let db = await DbConnection.Get();
		let aggregationPipe = createAggPipeForRecord(data)
		let result = await db
			.collection(collectionName)
			.aggregate(aggregationPipe)
			.toArray();
		return result;
	} catch (e) {
		console.log("e:::",e)

		throw new Error(`Erorr occured due to : ${e.message}`);
	}
};


/**
 * @description Create aggregation pipeline to filterout data
 * @param  {  minCount: number, maxCount: number, startDate: Date, endDate: Date  }
 * @return { Array } aggregation pipe
 */
