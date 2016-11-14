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
     * Launched after view is initialized (after view's initComponent())
     */
    init: function () {

    },

    /**
     * Launched after view model and all it's bindings are ready.
     */
    initViewModel: function () {

    }

});

