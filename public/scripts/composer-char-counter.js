$(document).ready(function() {
  let maxWord = 140;
  $("textarea").on('input',function() {
    let remaining = maxWord - $(this).val().length;
    $(this)
      .parent()
      .find("span")
      .html(remaining);

    remaining < 0
      ? $(".counter").addClass("countLimit")
      : $(".counter").removeClass("countLimit");
  });
});
