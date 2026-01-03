/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

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

$(".contact-btn").click(function () {
  $(this).addClass("clicked");
});

$(".close").click(function (e) {
  $(".clicked").removeClass("clicked");
  e.stopPropagation();
  $(".send-clicked").removeClass("send-clicked");
  e.stopPropagation();
});

$(".send-btn").click(function () {
  $(this).addClass("send-clicked");
  setTimeout(function () {
    $(".clicked").removeClass("clicked");

    $(".send-clicked").removeClass("send-clicked");
  }, 5000);
});

$(".msg-close").click(function (e) {
  $(".send-clicked").removeClass("send-clicked");
  e.stopPropagation();
});

