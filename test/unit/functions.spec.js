'use strict';

import { parseAbsoluteKey } from '../../src/circle/functions.js';

describe('functions', function() {
	beforeEach(function() {

	});

	describe('parseAbsoluteKey', function() {

		beforeEach(function() {});

		afterEach(function() {

		});


		it("should return ['name']", function() {
			expect(parseAbsoluteKey('name')).toEqual("['name']");
		});

		it("should return ['name'] (2)", function() {
			expect(parseAbsoluteKey("['name']")).toEqual("['name']");
		});

		it("should return ['foo']['bar']", function() {
			expect(parseAbsoluteKey('foo.bar')).toEqual("['foo']['bar']");
		});

		it("should return ['foo']['bar'] (2)", function() {
			expect(parseAbsoluteKey("foo['bar']")).toEqual("['foo']['bar']");
		});

		it("should return ['foo']['bar'] (3)", function() {
			expect(parseAbsoluteKey("['foo'].bar")).toEqual("['foo']['bar']");
		});

		it("should return ['foo.bar']", function() {
			expect(parseAbsoluteKey("['foo.bar']")).toEqual("['foo.bar']");
		});
	
	});
});


