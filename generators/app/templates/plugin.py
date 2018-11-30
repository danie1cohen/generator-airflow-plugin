"""
A demo plugin structure for use with quickly prototyping new
airflow plugins.
"""
import logging

<% if ( createBlueprint === true ) { %>from flask import Blueprint
<% } %><% if ( createView === true ) { %>from flask_admin import BaseView, expose
<% } %><% if ( createMenuLink === true ) { %>from flask_admin.base import MenuLink
<% } %><% if ( createExecutor === true ) { %>from airflow.executors.base_executor import BaseExecutor
<% } %><% if ( createHook === true ) { %>from airflow.hooks.base_hook import BaseHook
<% } %><% if ( createOperator === true ) { %>from airflow.models import  BaseOperator
<% } %>from airflow.plugins_manager import AirflowPlugin
<% if ( createOperator === true ) { %>from airflow.utils.decorators import apply_defaults
<% } %>

<% if ( createHook === true ) { %>
class <%= pluginObjectName %>Hook(BaseHook):
    pass


<% } %><% if ( createOperator === true ) { %>
class <%= pluginObjectName %>Operator(BaseOperator):
    @apply_defaults
    def __init__(self, *args, **kwargs):
        super(<%= pluginObjectName %>Operator, self).__init__(*args, **kwargs)


<% } %><% if ( createExecutor === true ) { %>
class <%= pluginObjectName %>Executor(BaseExecutor):
    pass


<% } %><% if ( createView === true ) { %>
class <%= pluginObjectName %>View(BaseView):
    @expose('/')
    def <%= pluginName %>_view(self):
        """
        In this example, put your test_plugin/test.html template at
        airflow/plugins/templates/test_plugin/test.html
        """
        return self.render("<%= pluginName %>/<%= pluginName %>_view.html", content="Hello galaxy!")

v = <%= pluginObjectName %>View(category="<%= pluginDisplayName %>", name="<%= pluginDisplayName %>")

<% } %><% if ( createBlueprint === true ) { %>
bp = <%= pluginObjectName %>Blueprint(
    "<%= pluginName %>",
    __name__,
    template_folder='templates', # registers airflow/plugins/templates as a Jinja template folder
    static_folder='static',
    static_url_path='/static/<%= pluginName %>'
)


<% } %><% if ( createMenuLink === true ) { %>
ml = <%= pluginObjectName %>MenuLink(
    category='<%= pluginDisplayName %>',
    name='<%= pluginDisplayName %> Menu Link',
    url='http://pythonhosted.org/airflow/'
)


<% } %>class <%= pluginObjectName %>Plugin(AirflowPlugin):
    """
    Functionality defined above is imported through this plugin object.
    """
    name = '<%= pluginName %>'
    <% if ( createHook === true ) { %>hooks = [
        <%= pluginObjectName %>Hook
    ]
    <% } else { %>hooks = []
    <% } %><% if ( createOperator === true ) { %>operators = [
        <%= pluginObjectName %>Operator
    ]
    <% } else { %>operators = []
    <% } %><% if ( createExecutor === true ) { %>executors = [
        <%= pluginObjectName %>Executor
    ]
    <% } else { %>executors = []
    <% } %>macros = []
    <% if ( createView === true ) { %>
    admin_views = [
        <%= pluginObjectName %>View
    ]
    <% } else { %>admin_views = []
    <% } %><% if ( createBlueprint === true ) { %>flask_blueprints = [
        <%= pluginObjectName %>Blueprint
    ]
    <% } else { %>flask_blueprints = []
    <% } %><% if ( createMenuLink === true ) { %>menu_links = [
        <%= pluginObjectName %>MenuLink
    ]
    <% } else { %>menu_links = []
    <% } %>
