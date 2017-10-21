'use strict';

import { parseAbsoluteKey } from '../../src/circle/functions.js';

describe('functions', function() {
	beforeEach(function() {

	});

	describe('parseAbsoluteKey', function() {

		beforeEach(function() {});

		afterEach(function() {

		});


		it('should return [\'name\']', function() {
			const result = parseAbsoluteKey('name');
			expect(result).toEqual('[\'name\']');
		});

	
	});
});
