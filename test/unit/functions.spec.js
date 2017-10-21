'use strict';

import { normalizeKey } from '../../src/circle/functions.js';

describe('functions', function() {
	beforeEach(function() {

	});

	describe('normalizeKey', function() {

		beforeEach(function() {});

		afterEach(function() {

		});


		it("should return ['name']", function() {
			expect(normalizeKey('name')).toEqual("['name']");
		});

		it("should return ['name'] (2)", function() {
			expect(normalizeKey("['name']")).toEqual("['name']");
		});

		it("should return ['foo']['bar']", function() {
			expect(normalizeKey('foo.bar')).toEqual("['foo']['bar']");
		});

		it("should return ['foo']['bar'] (2)", function() {
			expect(normalizeKey("foo['bar']")).toEqual("['foo']['bar']");
		});

		it("should return ['foo']['bar'] (3)", function() {
			expect(normalizeKey("['foo'].bar")).toEqual("['foo']['bar']");
		});

		it("should return ['foo.bar']", function() {
			expect(normalizeKey("['foo.bar']")).toEqual("['foo.bar']");
		});
	
	});
});


