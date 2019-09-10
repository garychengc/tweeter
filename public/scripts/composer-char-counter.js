$(document).ready(function() {
  let maxWord = 140;
  $("textarea").on('keydown',function() {
    let remaining = maxWord - $(this).context.value.length;
    $(this)
      .parent()
      .find("span")
      .html(remaining);

    remaining < 0
      ? $(".counter").addClass("countLimit")
      : $(".counter").removeClass("countLimit");
  });
});
