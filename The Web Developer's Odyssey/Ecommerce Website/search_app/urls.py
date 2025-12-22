#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

# Maintainer: Ashraf Morningstar
# GitHub: https://github.com/AshrafMorningstar

from django.urls import path
from . import views

app_name='search_app'
urlpatterns=[
    path('',views.SearchResult,name='SearchResult'),
    ]