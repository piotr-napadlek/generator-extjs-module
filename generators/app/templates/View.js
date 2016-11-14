/**
 * Main view for the module <%= moduleName %>.
 */
Ext.define('<%= namespace %>.view.<%= viewName %>', {
    extend: '<%= viewExtend %>',
    xtype: '<%= viewXType %>',

    <%- viewRequires %>
    <%- viewBody %>

    items: []
});

