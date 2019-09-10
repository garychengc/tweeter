$(document).ready(function() {
  const element = document.querySelector("textarea");
  element.addEventListener("keydown", function(e) {
    // console.log(e);
    console.log(this.value.length);
    console.log(140 - this.value.length);
    const remaining = 140 - this.value.length;
    // const count = document.querySelector('.counter');
    // count.textContent = 140 - this.value.length;
    $(".counter").text(140 - this.value.length);
    // if ('.counter' === this.silbings('.counter')) {
    //   console.log(this);
    //   this.textContent = remaining;
    // }

    if (remaining < 0) {
      $(".counter").addClass('countLimit');
    } else if (remaining >= 0) {
      $('.counter').removeClass('countLimit');
    }
  });
});
