/* Brass & Blade – endterm: jQuery features */
$(function () {
  // Home: click a feature title to show/hide its text (class + traversal: next, closest)
  $(".feature h3").css("cursor", "pointer").attr("title", "Click to show or hide").on("click", function () {
    $(this).next("p").slideToggle(200);
    $(this).closest(".feature").toggleClass("feature-closed");
  });

  // Barbers: open one bio at a time (delegation for dynamic cards; find, siblings)
  $("#barber-grid").on("click", ".barber", function () {
    $(this).find(".bio").slideToggle(200);
    $(this).siblings().find(".bio").slideUp(200);
  });

  // Services table: highlight the chosen row (descendant selector; siblings, find)
  $("#price-table tbody tr").on("click", function () {
    $(this).addClass("row-picked").siblings().removeClass("row-picked");
    $(this).find("td").first().css("font-weight", "700");
    $(this).siblings().find("td").css("font-weight", "400");
  });

  // Attribute selector: helpful tooltips on contact links
  $('a[href^="tel:"]').attr("title", "Call us");
  $('a[href^="mailto:"]').attr("title", "Write us an email");

  // Contact: live character counter for the message (ID selector, input event)
  $("#msg").on("input", function () {
    $("#msg-count").text($(this).val().length + " characters (minimum 10)");
  });

  // Back to top button: fade in after scrolling, animate scroll up
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) { $("#back-top").fadeIn(200); } else { $("#back-top").fadeOut(200); }
  });
  $("#back-top").on("click", function () { $("html, body").animate({ scrollTop: 0 }, 400); });
});
