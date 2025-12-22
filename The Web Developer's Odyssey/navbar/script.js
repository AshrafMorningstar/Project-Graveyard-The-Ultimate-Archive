/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

window.onload = function () {
  var toggleButton = document.getElementById("navbar-toggle");
  var navbarLinks = document.getElementById("navbar-links");
  var navbar = document.getElementById("navbar");

  toggleButton.onclick = function () {
      navbarLinks.classList.toggle("show");
  };

  // Close navbar when a link is clicked
  navbarLinks.querySelectorAll("a").forEach(function(link) {
      link.addEventListener("click", function() {
          navbarLinks.classList.remove("show");
      });
  });

  window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
      } else {
          navbar.classList.remove("scrolled");
      }
  });
};
