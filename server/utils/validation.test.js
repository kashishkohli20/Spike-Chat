const mocha = require('mocha');
const expect = require('expect');

let {isRealString} = require('./validation');

describe('is real string', () => {
	it('should reject non-string values', () => {
		let value = isRealString(43);

		expect(value).toBe(false);
	});

	it('should reject string with only spaces', () => {
		let value = isRealString('   ');

		expect(value).toBe(false);
	});

	it('should allow string with non-space characters', () => {
		let value = isRealString('  obama  ');

		expect(value).toBe(true);
	});
});
