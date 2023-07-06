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

/* ======================   EVENT HANDLER - JQUERY READY   ============== */
/*
*  Event handler - using jQuery to ensure all html element loaded before calling
*   - executed when the DOM is fully loaded and ready for manipulation
*/
$(document).ready(function() {
  //bracket to close .ready (function() { above   

/* ==========   OTHER FUNCTIONS (Escape, Load Tweets, )               ============== */
/**  Escape Function: convert string to text node (prevent XSS) */ 
  /**
   * Escapes special characters in string, prevents cross-site scripting (XSS) attack
   * @param {string} str - takes in string  to evaluate
   * @returns {string} - outputs escaped string (escapes special characters) 
   * Create new div element - the inner HTML of the created text node
   */
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

/**  Calculation - daysSinceTweet function    */
  /**
   * Takes a date in epoch time
   * Returns the whole number of days difference between the input time and current date
   */
  const daysSinceTweet = function(epochOfTweet) {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const millisecondsInDay = 86400000;

    const timeDifference = currentTime - epochOfTweet;
    const dayDifference = timeDifference / millisecondsInDay;

    return Math.floor(dayDifference);
  };



/* ==========   MAIN FUNCTIONS (Create, Render)               ============== */  
/**  CreateTweetElement Function                                          */ 
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

/**  RenderTweets Function                                                */
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

/**  loadTweets Function                                                  */
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
/**  New Tweet Form Submission (remove/slide-up error mess)               */
  /**
   * Triggered - Form Submission Triggered on submission of the form with the class 'new-tweet'
   * Existing Messages - emplie & slides up Empties and slides up any existing error messages
   * Checks the length of the text being submitted and runs error messages if necessary
   * POST text -> /tweets/ - If no errors from text length, makes POST request with form text to /tweets/
   * GET /text/  - then makes a GET request to /tweets/
   *     Reset , Render to add new 
   * - Then resets the form and uses our renderTweets function to add the new tweet to the page 
   */
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    $('.new-tweet p').empty().slideUp();
    const $form = $(this);
    const newTweetTextStr = $form.children('textarea').val().trim();

    if (!newTweetTextStr) {
      $('.new-tweet p').addClass('error-message-box')
      $('.new-tweet p').append("<b>Error:</b> Tweets must contain at least one character. ");
      setTimeout(() => {
        $('.new-tweet p').slideDown();
      }, 600);
    } else if (newTweetTextStr.length > 140) {
      $('.new-tweet p').addClass('error-message-box')
      $('.new-tweet p').append("<b>Error:</b> Tweets may not exceed 140 characters in length. Your tweet is currently too long.");
      setTimeout(() => {
        $('.new-tweet p').slideDown();
      }, 600);
    } else {
      $('.new-tweet p').removeClass('error-message-box')
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
      .fail(function(err) {
        alert(err.responseJSON.error);
      })
    }
  });

/**  Compose to Submit Toggle                                             */ 
  /**
   * Triggered on click of the button with id 'compose-new'
   * Toggles the html section with the class 'new-tweet'
   * Focuses on the text area of the html section with the class 'new-tweet'
   */
  $('#compose-new button').click(function() {
    $('section.new-tweet').slideToggle("slow");
    $('section.new-tweet textarea').focus();
  });

});

/* ============================================================================================= */
/* ============================================================================================= */