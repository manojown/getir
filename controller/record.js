const { getRecord } = require("../service/record");
const { validate } = require("../validation/record");
const { response } = require("../helpers/response");


/**
 * @description Get all the records
 * @param  { object } req
 * @param  { object } res
 * @param  { function } next
 * @return { response } object
 */
exports.getRecord = async (req, res, next) => {
	try {
		let verifyResult = validate(req.body);
        let data = await getRecord(verifyResult);
        let responseToSend = response({code:0,records:data});
		return res.status(200).json(responseToSend);
	} catch (e) {
		next(e);
	}
};
