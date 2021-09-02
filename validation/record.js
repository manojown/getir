/**
 * @description To validate the body and verify that required field exist or not if not then throw error, and remove unwanted fields if found in payload
 * @param  { object } body
 * @param  { object } res
 * @return  { object } parse || schema
 */
exports.validate = (body) => {
    const schema = getSchema();
    let parse = {}
    Object.keys(schema).forEach(key => {
        let { type, required } = schema[key];
        let checkAgains = body[key]
        if(required && !checkAgains){
            throw new Error(`${key} is required field.`)
        } else if(body[key]){
            let typeIs = typeof checkAgains
            if(typeIs !== type) {
                throw new Error(`type missmatch needed ${type}, and got ${typeIs}.`)
            }
        }  
        parse[key] = body[key]
    })
    return parse
};


const getSchema = () => {
    return {
		minCount: {
            type: "number",
            required: true
		},
		maxCount: {
            type: "number",
            required: true
		},
		startDate: {
            type: "string",
            required: true
		},
		endDate: {
            type: "string",
            required: true
		},
	};
}
