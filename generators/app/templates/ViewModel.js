'use strict';

/**
 * View Model for the bindings with <% if (generatedItems.indexOf('View') >= 0) { %><%= namespace %>.view.<%= viewName %>.<% } %>
 */
Ext.define('<%= namespace %>.viewmodel.<%= viewModelName %>', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.<%= viewModelName.decapitalize() %>'<% if (generatedItems.indexOf('Store') >= 0) { %>,

    requires: [
        '<%=namespace%>.store.<%=storeName%>'
    ]

    stores: {
        <%=storeName.decapitalize()%>: {
            type: '<%=storeName.decapitalize()%>'
        }
    } <% } %>

});

