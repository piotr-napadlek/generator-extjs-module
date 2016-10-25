'use strict';

/**
 * Controller <% if (generatedItems.indexOf('View') >= 0) { %> bound with the view <%= namespace %>.view.<%= viewName %>. <% } %>
 */
Ext.define('<%= namespace %>.controller.<%= controllerName %>', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.<%= controllerName.decapitalize() %>',

    listen: {
        controller: {
            '*': { }
        },
        store: {
            '*': { }
        }
    },

    /**
     * Defines the initial logic upon controller creation
     */
    constructor: function () {
        console.debug(this.alias + ' created.');
    }
});

