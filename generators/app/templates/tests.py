"""
Tests for the <%= pluginDisplayName %> Plugin
"""
from datetime import datetime
import os
import sys
from unittest.mock import patch, MagicMock

from airflow import DAG
from airflow.exceptions import AirflowException
from nose.tools import *

sys.path.append('../plugins')
from plugins import <%= pluginName %> as plugin

<% if ( createHook === true ) { %>
def test_hook():
    raise NotImplementedError


<% } %><% if ( createOperator === true ) { %>
def test_operator():
    raise NotImplementedError


<% } %><% if ( createExecutor === true ) { %>
def test_executor():
    raise NotImplementedError


<% } %><% if ( createView === true ) { %>
def test_view():
    raise NotImplementedError


<% } %><% if ( createBlueprint === true ) { %>
def test_blueprint():
    raise NotImplementedError


<% } %><% if ( createMenuLink === true ) { %>
def test_menu_link():
    raise NotImplementedError


<% } %>
