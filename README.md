jQuery Responsive Tabs
==============

This jQuery plugin provides responsive tab functionality. The tabs transform to an accordion when it reaches a CSS breakpoint.


Features
=========

+ Tabs transform to accordion based on breakpoint
+ Depends on jQuery for the tab functionality
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
        

Credits
=========
The idea for this plugin is based on 'Easy Responsive Tabs to Accordion' by samsono (github.com/samsono)

https://github.com/samsono/Easy-Responsive-Tabs-to-Accordion 

Support
=======
If you have any questions, feel free to contact me.

Jelle Kralt
jelle@jellekralt.nl
