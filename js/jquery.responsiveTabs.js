/*
 *  Project: responsiveTabs.js
 *  Description: A plugin that creates responsive tabs, optimized for all devices
 *  Author: Jelle Kralt (jelle@jellekralt.nl)
 *  License: MIT
 */

;(function ( $, window, undefined ) {
    
    // Defaults
    var defaults = {
        collapsible: false,
        startCollapsed: false,
        rotate: false,
        activate: function(){},
        deactivate: function(){},
        load: function(){},
        activateState: function(){},
        classes: {
            stateDefault: 'r-tabs-state-default',
            stateActive: 'r-tabs-state-active',
            tab: 'r-tabs-tab',
            anchor: 'r-tabs-anchor',
            panel: 'r-tabs-panel',
            accordionTitle: 'r-tabs-accordion-title'
        }
    };


    // The actual plugin constructor
    function ResponsiveTabs(element, options) {
        this.element = element;
        this.$element = $(element);

        this.tabs = [];
        this.state = '';
        this.rotateInterval = 0;

        // Extend the defaults with the passed options
        this.options = $.extend( {}, defaults, options);
        
        this.init();
    }

    ResponsiveTabs.prototype.init = function () {
        var o = this;
       
        // Load all the elements
        this.tabs = this.loadElements();
        this.loadClasses();
        this.loadEvents();

        // Window resize bind to check state
        $(window).on('resize', function(e) {
            o.setState(e);
        });

        // Hashchange event
        $(window).on('hashchange', function(e) {
            var tabRef = o.getTabRefBySelector(window.location.hash);

            if(tabRef >= 0) {
                o.openTab(e, o.getTab(tabRef), true);
            }

        });

        // Start rotate event
        if(this.options.rotate !== false) {
            this.startRotation();
        }

        // Events
        this.$element.bind('tabs-activate', function(e) {
            o.options.activate.call(this, e);
        });
        this.$element.bind('tabs-deactivate', function(e) {
            o.options.deactivate.call(this, e);
        });
        this.$element.bind('tabs-load', function(e) {
            var tabRef = o.getTabRefBySelector(window.location.hash);
            var firstTab;

            o.setState(e); // Set state 

            // Check if the panel should be collaped on load
            if(o.options.startCollapsed !== true && !(o.options.startCollapsed === 'accordion' && o.state === 'accordion')) {

                if(tabRef >= 0) {
                    firstTab = o.getTab(tabRef);
                } else {
                    firstTab = o.getTab(0);
                }
                
                o.openTab(e, firstTab); // Open first tab

                o.options.load.call(this, e, firstTab); // Call the load callback
            }
        });
        // Trigger loaded event
        this.$element.trigger('tabs-load');
    };

    ResponsiveTabs.prototype.loadElements = function() {
        var $ul = $('ul', this.$element);
        var tabs = [];

        // Add classes
        this.$element.addClass('r-tabs');
        $ul.addClass('r-tabs-nav');

        // Get tab buttons
        $('li', $ul).each(function() {
            var $tab = $(this);
            var $anchor = $('a', $tab);
            var panelSelector = $anchor[0].getAttribute('href');
            var $panel = $(panelSelector);
            var $accordionTab = $('<div></div>').insertBefore($panel);
            var $accordionAnchor = $('<a></a>').attr('href', panelSelector).html($anchor.html()).appendTo($accordionTab);
            var oTab = {
                tab: $(this),
                anchor: $('a', $tab),
                panel: $panel,
                selector: panelSelector,
                accordionTab: $accordionTab,
                accordionAnchor: $accordionAnchor,
                active: false
            };
            // Add to tab array
            tabs.push(oTab);
        });
        return tabs;
    };

    ResponsiveTabs.prototype.loadClasses = function() {
        for (var i=0; i<this.tabs.length; i++) {
            this.tabs[i].tab.addClass(this.options.classes.stateDefault).addClass(this.options.classes.tab);
            this.tabs[i].anchor.addClass(this.options.classes.anchor);
            this.tabs[i].panel.addClass(this.options.classes.stateDefault).addClass(this.options.classes.panel);
            this.tabs[i].accordionTab.addClass(this.options.classes.accordionTitle);
            this.tabs[i].accordionAnchor.addClass(this.options.classes.anchor);
        }
    };

    ResponsiveTabs.prototype.loadEvents = function() {
        var o = this;
        var fClick = function(e) {
            var current = o.getCurrentTab();

            e.preventDefault();

            o.closeTab(e, current);
            if(o.options.collapsible === false || (o.options.collapsible && current !== e.data.tab)) {
                o.openTab(e, e.data.tab, false, true);
            }
        };
        
        // Loop tabs
        for (var i=0; i<this.tabs.length; i++) {
            this.tabs[i].anchor.on('click', {tab: o.tabs[i]}, fClick);
            this.tabs[i].accordionAnchor.on('click', {tab: o.tabs[i]}, fClick);
        }
    };


    ResponsiveTabs.prototype.setState = function(e) {
        var $ul = $('ul', this.$element);
        var oldState = this.state;

        if($ul.is(':visible')){
            this.state = 'tabs';
        } else {
            this.state = 'accordion';
        }

        if(this.state !== oldState) {
            this.$element.trigger('tabs-activate-state', e, {oldState: oldState, newState: this.state});
        }
    };

    ResponsiveTabs.prototype.openTab = function(e, oTab, closeCurrent, stopRotation) {

        if(closeCurrent) {
            this.closeTab(e, this.getCurrentTab());
        }

        if(stopRotation && this.rotateInterval > 0) {
            this.stopRotation();
        }

        oTab.active = true;
        oTab.tab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateActive);
        oTab.panel.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateActive);
        oTab.accordionTab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateActive);

        this.$element.trigger('tabs-activate', e, oTab);
    };

    ResponsiveTabs.prototype.closeTab = function(e, oTab) {
        if(oTab !== undefined) {
            oTab.active = false;
            oTab.tab.removeClass(this.options.classes.stateActive).addClass(this.options.classes.stateDefault);
            oTab.panel.removeClass(this.options.classes.stateActive).addClass(this.options.classes.stateDefault);
            oTab.accordionTab.removeClass(this.options.classes.stateActive).addClass(this.options.classes.stateDefault);

            this.$element.trigger('tabs-deactivate', e, oTab);
        }
    };

    ResponsiveTabs.prototype.getTab = function(numRef) {
        return this.tabs[numRef];
    };

    ResponsiveTabs.prototype.getTabRefBySelector = function(selector) {
        for (var i=0; i<this.tabs.length; i++) {
            if(this.tabs[i].selector === selector) {
                return i;
            }
        }
        return -1;
    };

    ResponsiveTabs.prototype.getCurrentTab = function() {
        return this.getTab(this.getCurrentTabRef());
    };

    ResponsiveTabs.prototype.getNextTabRef = function() {
        var currentTabRef = this.getCurrentTabRef();
        if(currentTabRef === this.tabs.length - 1) {
            return 0;
        } else {
            return currentTabRef + 1;
        }
    };

    ResponsiveTabs.prototype.getPreviousTabRef = function() {
        var currentTabRef = this.getCurrentTabRef();
        if(currentTabRef === 0) {
            return this.tabs.length - 1;
        } else {
            return currentTabRef - 1;
        }
    };

    ResponsiveTabs.prototype.getCurrentTabRef = function() {
        for (var i=0; i<this.tabs.length; i++) {
            if(this.tabs[i].active) {
                return i;
            }
        }
        return -1;
    };

    ResponsiveTabs.prototype.startRotation = function() {
        var o = this;
        this.rotateInterval = setInterval(function(){
            var e = jQuery.Event('rotate');
            o.openTab(e, o.getTab(o.getNextTabRef()), true);
        }, ($.isNumeric(o.options.rotate)) ? o.options.rotate : 4000 );
    };

    ResponsiveTabs.prototype.stopRotation = function() {
        window.clearInterval(this.rotateInterval);
        this.rotateInterval = 0;
    };

    // Plugin wrapper
    $.fn.responsiveTabs = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'responsivetabs')) {
                    $.data(this, 'responsivetabs', new ResponsiveTabs( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'responsivetabs');

                if (instance instanceof ResponsiveTabs && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
                                
                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                    // TODO: destroy instance classes, etc
                    $.data(this, 'responsivetabs', null);
                }
            });
        }
    };

}(jQuery, window));