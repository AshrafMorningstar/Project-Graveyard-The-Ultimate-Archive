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

from django.shortcuts import render
from shop.models import Product
from django.db.models import Q


def SearchResult(request):
    products = None
    query = None
    if 'q' in request.GET:
        query=request.GET.get('q')
        products=Product.objects.all().filter(Q(name__contains=query) | Q(description__contains=query))
        return render(request,'search.html',{'query':query,'products':products})



