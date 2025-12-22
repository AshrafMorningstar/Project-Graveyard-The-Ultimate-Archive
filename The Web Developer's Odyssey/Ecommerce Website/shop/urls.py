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
from.import views
app_name='shop'
urlpatterns=[
    path('', views.allProdCat, name='allProdCat'),
    path('slug<slug:c_slug>/', views.allProdCat, name='product_by_category'),
    path('<slug:c_slug>/<slug:product_slug>/', views.proDetail, name='prodCatdetail')
]