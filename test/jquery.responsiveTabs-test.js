/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($, QUnit) {

    QUnit.module('responsive-tabs');

    QUnit.test('creatable', function(assert) {
        var $element = $('#horizontalTab');
        var $tabNav = $element.find('ul, ol');
        var $tabs = $tabNav.find('li');
        var $panels = $element.find('.r-tabs-panel');

        assert.ok($element.responsiveTabs(), 'can be added');
        assert.equal($element.hasClass('r-tabs'), true, 'r-tabs class');
        assert.equal($tabNav.hasClass('r-tabs-nav'), true, 'r-tabs-nav class');
        assert.equal($tabs.hasClass('r-tabs-tab'), true, 'r-tabs-tab class');
    });



}(jQuery, QUnit));
