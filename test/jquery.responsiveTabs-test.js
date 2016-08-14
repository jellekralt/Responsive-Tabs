/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($, QUnit) {

    QUnit.module('responsive-tabs');

    QUnit.test('creatable', function(assert) {
        var $tabs = $('#horizontalTab');

        assert.ok($tabs.responsiveTabs(), 'can be added');
        assert.equal($tabs.hasClass('r-tabs'), true, 'container class was added correctly');
        assert.equal($tabs.find('> ul').hasClass('r-tabs-nav'), true, 'nav class was added correctly');
        assert.equal($tabs.find('> ul > li').hasClass('r-tabs-tab'), true, 'nav class was added correctly');
        assert.equal($tabs.find('#tab-1').hasClass('r-tabs-panel'), true, 'panel class was added correctly');
    });

}(jQuery, QUnit));
