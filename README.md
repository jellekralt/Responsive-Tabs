jQuery Responsive Tabs
==============

This jQuery plugin provides responsive tab functionality. The tabs transform to an accordion when it reaches a CSS breakpoint.


Features
=========

+ Tabs transform to accordion based on breakpoint
+ Uses javascript / jQuery for the technical tab switching (class based)
+ Uses CSS for the desktop/tablet/mobile view
+ Has callback events for the tab events
+ Tabs can be opened with URL hashes
+ Tabs can auto rotate
+ Tabs can be collapsed (optional)
+ Tabs can start collapsed based on the view (optional)
+ Cross browser compatibility (IE7+, Chrome, Firefox, Safari and Opera)
+ Multiple device support (Web, Tablet, Mobile, etc)


How to use
==========

=> Requires jQuery (minimaly jQuery 1.7.0)
=> Include jquery.responsiveTabs.js
=> Include responsive-tabs.css for the basic Tabs to Accordion switching
=> Include style.css for a basic tab/accordion theme

=> Use this HTML markup:

    <div id="responsiveTabsDemo">          
        <ul>
            <li><a href="#tab-1"> .... </a></li>
            <li><a href="#tab-2"> .... </a></li>
            <li><a href="#tab-3"> .... </a></li>
        </ul> 
                                                
        <div id="tab-1"> ....... </div>
        <div id="tab-2"> ....... </div>
        <div id="tab-3"> ....... </div>
    </div>    
    
=> Use this jQuery function to enable responsive tabs on the selected element:

    $('#responsiveTabsDemo').responsiveTabs();
    
API
===

The following options are available:

### Collapsible
If set to 'true' the panels are collapsible. If a tab is active and you select it again, the panel will collapse.

        collapsible: false, // The panels are not collapsible
        collapsible: true, // The panels are collapsible

### Start collapsed
This option defines if the first panel on load starts collapsed or not. With the values 'tabs' and 'accordion' you can specify in which view the tabs are supposed to start collapsed.

        startCollapsed: false // Do not collapse on start
        startCollapsed: true // Start with the panels collapsed
        startCollapsed: 'tabs' // Start with the panels collapsed if the view is currently tab based
        startCollapsed: 'accordion' // Start with the panels collapsed if the view is currently accordion based
        
### Rotate
This option can be used to auto rotate the tabs. The tabs will stop rotating when a tab is selected.

        rotate: false, // The tabs won't auto rotate
        rotate: true, // The tabs will auto rotate from the start

Callbacks
---------

### Activate
This callback is called after a tab is selected

        activate: function(){},
        
### Deactivate
This callback is called after a tab is deactivated

        deactivate: function(){},

### Load
This callback is called after the plugin has been loaded

        load: function(){},
        
### Activate State
This callback is called after the plugin switches from state (Tab view / Accordion view)

        activateState: function(){}


Credits
=========
The idea for this plugin is based on 'Easy Responsive Tabs to Accordion' by samsono (github.com/samsono)

https://github.com/samsono/Easy-Responsive-Tabs-to-Accordion 

Support
=======
If you have any questions, feel free to contact me.

Jelle Kralt

jelle@jellekralt.nl
