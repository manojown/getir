const { createAggPipeForRecord } = require("../helpers/utility");
const { withAll,withoutMaxCount  } = require("../__mocks__/utility.mocks");



describe("Utility helper testing", () => {
	it("should get withAll", async () => {
        let { input, output } = withAll;
        const res = createAggPipeForRecord(input)
		expect(JSON.stringify(res)).toEqual(JSON.stringify(output));
    });
    it("should get withoutMaxCount", async () => {
        let { input, output } = withoutMaxCount;
        const res = createAggPipeForRecord(input)
		expect(JSON.stringify(res)).toEqual(JSON.stringify(output));
	});
});