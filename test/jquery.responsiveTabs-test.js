/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

	test('creatable', function() {
		var $tabs = $('#horizontalTab');

		ok($tabs.responsiveTabs(), 'can be added');
		equal($tabs.hasClass('r-tabs'), true, 'class was added correctly');
	});

}(jQuery));