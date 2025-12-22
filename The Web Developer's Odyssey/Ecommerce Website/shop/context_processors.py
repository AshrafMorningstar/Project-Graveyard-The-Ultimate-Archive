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

from . models import Category
def menu_links(request):
    links=Category.objects.all()
    return dict(links=links)