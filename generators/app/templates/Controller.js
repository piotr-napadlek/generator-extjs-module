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
    * Called when an underlying view.initComponent() is done
    * @param {Ext.Component} view view which has been created
    */
    init: function (view) {
        console.log(view);
    },

   /**
    * Called when view's view model instance has been attached.
    */
    initViewModel: function (viewModel) {
        console.log(viewModel);
    }
});

