/**
 * Items container for the view <%= namespace %>.view.<%= viewName %>.
 */
Ext.define('<%= namespace %>.store.<%= storeName %>', {
    extend: 'Ext.data.Store',
    alias: 'store.<%= storeName.decapitalize() %>',

    <% if (generatedItems.indexOf('Model') >= 0) { %>model: '<%= namespace %>.model.<%=modelName%>', <% } else { %>fields: [ ],<% } %>

    autoLoad: false,

    proxy: {
        type: 'memory'
    }

});

