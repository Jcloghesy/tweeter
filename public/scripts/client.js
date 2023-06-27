/* ============================================================================================= */
/* ==--------------------------------   CLIENT.JS      -----------------------------------------== */
/* ============================================================================================= */
/* =========================   INSTRUCTIONS   ============================== */
/*  Initial Instructions                                                     */
    /** 
    *  - Client-side JS logic goes here
    *  - jQuery is already loaded
    *  - Reminder: Use (and do all your DOM work in) jQuery's document ready function
    */

/* 0.1 ======================   EVENT HANDLER - JQUERY READY   ============== */
  /*
  *  Event handler - using jQuery to ensure all html element loaded before calling
  *   - executed when the DOM is fully loaded and ready for manipulation
  */
  $(document).ready(function() {

/* =========================   TWEET DATA                     ============== */
  /** Tweet data - array                                                     */
    /*  
    *  tweet data - array contains all tweet data appropriately structure
    *  using in initial implementation where data is 'hardcoded' 
    */
    const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png"
          ,
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      },
      {
        "user": {
          "name": "Caitlin",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@me_ing" },
        "content": {
          "text": "I am testing an additional object!"
        },
        "created_at": 1461113959088
      }
    ]


/* ==========   OTHER FUNCTIONS (Load Tweets, )               ============== */

/**  Function - load Tweets   */
    /**
     * Makes a GET request to specified URL to access the tweet database
     * Runs returned tweet array through enderTweets function
     * After tweet loaded, processed, renders the tweets on success.
     */
    const loadTweets = function() {
      $.ajax('/tweets/', { method: 'GET' })
        .then(function(allTweets) {
          renderTweets(allTweets);
        });
    };

    loadTweets();

  /**  Function - createTweetElement                                                     */ 
   /** 
    * createTweetElement - Function to create a tweet element based on tweet data
    * @param {object} tweetData - tweet data object
    * @returns {string} - full HTML markup/structure for the tweet element
    *  Returns new html article - has all data, fully organized in html elements
    */
    const createTweetElement = function(tweetObj) {
      const $tweet = $("<article>").addClass("tweet");
      const daysAgo = daysSinceTweet(tweetObj["created_at"]);

      const innerHTML = `
            <header>
                <img src= ${tweetObj.user.avatars}>
                <span>${tweetObj.user.name}</span>
                <span class="handle">${tweetObj.user.handle}</span>
            </header>
            <span>${escape(tweetObj.content.text)}</span>
            <footer>
              <span>${daysAgo} days ago</span>
              <span class="interactOptions"><i class="fab fa-font-awesome-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
            </footer>
            `;

      $tweet.append(innerHTML);
      return $tweet;
    };

  /**  Function - Render Tweets   */
    /**
     * Takes an array of tweet objects
     * Runs each tweet object through our createTweetElement function
     * Prepends each returned tweet element to the html section with class 'all-tweets'
     */
    const renderTweets = function(tweetObjArr) {
      for (const tweet of tweetObjArr) {
        const $tweet = createTweetElement(tweet);
        $('section.all-tweets').prepend($tweet);
      }
    };

/* ==========   EVENT HANDLERS (Compose-new, submit new)      ============== */

  /** Event Listener to Prevent Default Behavior Submit  */

  /** Event Listener to Prevent Default Behavior Submit  
   *  J/Query POST event handler that serialized form data & submits
  */
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    $('.new-tweet p').empty().slideUp();
    const $form = $(this);
    const tweet = $form.serialize();
    $.ajax({ url: "/tweets/", method: 'POST', data: tweet })
    .then (function(successfulPost) {
      return $.ajax('/tweets/', { method: 'GET' })
    })
    .then (function(allTweetsArr) {
      $form[0].reset();
      $form.children('span').text(140);
      const latestTweet = [allTweetsArr[allTweetsArr.length - 1]];
      renderTweets(latestTweet);
    })
    });
  

  
/* ============================================================================================= */
/* ============================================================================================= */