/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = async function(tweets) {
  try {
    const appendData = []; 
    await tweets.forEach(tweet => {
      appendData.push(createTweetElement(tweet));
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
  } else {
    result = `${result} days ago`;
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

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac"
//     },
//     content: {
//       text:
//         "If I have seen further it is by standing on the shoulders of giants"
//     },
//     created_at: 1461116232227
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd"
//     },
//     content: {
//       text: "Je pense , donc je suis"
//     },
//     created_at: 1461113959088
//   }
// ];

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
          loadTweets();
        }
      });
    }
  });
});
