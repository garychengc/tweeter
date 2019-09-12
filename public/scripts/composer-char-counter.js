$(document).ready(function() {
  let maxWord = 140;
  $("textarea").on("input", function() {
    let remaining = maxWord - $(this).val().length;
    $(this)
      .parent()
      .find("span")
      .html(remaining);

    remaining < 0
      ? $(".counter").addClass("countLimit")
      : $(".counter").removeClass("countLimit");
  });

  //Scrollup button function - brings the page to the top
  $("#scrollUp").on("click", function(e) {
    $("html, body").animate({ scrollTop: 0 }, "fast");
  });

  //Scroll backup button
  $(window).on("scroll", function(e) {
    let clickToWrite = $("#write");
    let scrollUpBtn = $("#scrollUp");
    let headerBottom = $("#realheader").position().top;
    let windowTop = $(window).scrollTop();

    if (windowTop > headerBottom) {
      scrollUpBtn.removeClass("invisible");
      clickToWrite.addClass("invisible");
    } else {
      scrollUpBtn.addClass("invisible");
      clickToWrite.removeClass("invisible");
    }
  });
});
