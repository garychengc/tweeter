/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $("#tweetContainer").append(createTweetElement(tweet));
  });
};

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
          <div>${tweet.user.handle}</div>
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

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

$(document).ready(() => {
  renderTweets(tweetData);
});

// const $tweet = createTweetElement(tweetData);

// console.log($tweet);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $(".container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
