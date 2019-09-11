/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = async function(tweets) {
  try {
    let appendData = []; 
    await tweets.forEach(tweet => {
      appendData.unshift(createTweetElement(tweet));
    });
    $("#tweetContainer").append(appendData.join(''));
  } catch {error => console.log(error)};
  
};

//put each tweet into the html format
const createTweetElement = tweet => {
  const currentTime = new Date();
  const diff = currentTime.getTime() - tweet.created_at;
  let result = diff / (1000 * 60 * 60 * 24);
  if (result >= 365) {
    result = Math.floor(result / 365);
    result = `${result} years ago`;
  } else if (result >= 1) {
    result = Math.floor(result);
    result = `${result} days ago`;
  } else {
    result = Math.floor(result * 24)
    result = `${result} hours ago`;
  }

  return `
      <article>
        <header>
          <div>
            <img src=${tweet.user.avatars} />
            <div>${tweet.user.name}</div>
          </div>
          <div class='tag'>${tweet.user.handle}</div>
        </header>
  
        <div class='mainContent'>${tweet.content.text}</div>
  
        <footer>
          <div class='date'>
            ${result}
          </div>
          <div class='icon'>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
  
      </article>
      `;
};

//fetching tweets with Ajax
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET",
    success: function(res) {
      renderTweets(res);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(thrownError);
    }
  });
};

//Ajax request
//call the tweetdata rendering function
$(document).ready(() => {
  loadTweets();

  $("#formSubmit").submit(function(event) {
    event.preventDefault();
    const wordCount = $(this).find("span");
    const textArea = $(this).find("textarea");

    if (wordCount.hasClass("countLimit")) {
      alert(`Over the word count limit`);
    } else if (textArea.val() === "" || textArea.val() === null) {
      alert("You haven't entered anything yet");
    } else {
      let str = $("form").serialize();

      this.reset();
      $(this)
        .find("span")
        .html(140);
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: str,
        success: function() {
          $('#tweetContainer').empty();
          loadTweets();
        }
      });
    }
  });
});
