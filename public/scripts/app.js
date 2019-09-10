/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // const $tweet = $("<article>").addClass('tweet');
  tweets.forEach(tweet => {
    $(document).ready(() => {
      $('#tweetContainer').append(createTweetElement(tweet));
    })
  });
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};

const createTweetElement = tweet => {
  return (`
      <article>
        <header>
          <div>
            <img src=${tweet.user.avatars} />
            <div>${tweet.user.name}
          </div>
          <div>${tweet.user.handle}</div>
        </header>
  
        <div class='mainContent'>${tweet.content}</div>
  
        <footer>
          <div class='date'>
            ${tweet.created_at}
          </div>
          <div class='icon'>
            icons(%$@#$@#$)
          </div>
        </footer>
  
      </article>
      `);
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
  }
];


// const $tweet = createTweetElement(tweetData);

// console.log($tweet);
renderTweets(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $(".container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
