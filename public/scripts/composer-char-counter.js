/* ============================================================================================= */
/* ==-------------------------------   COMPOSER-CHAR-COUNTER.JS  -----------------------------== */
/* ============================================================================================= */


/**
 * Implements character counter function (listener, handler, still available) 
 *   DOCUMENT READY - starts by ensuring HTML elements are loaded in browser
 *     - HTML loading occurs prior to any attempts to access elements  
 *   EVENT LISTENER - establishes listener for text input focused on typing
 *      in textarea (.new-tweet section of Tweet form), obtains textarea values 
 *   ANALYSIS - counts inputted chars & compares to max to determine available 
 *	 RESPONDS - updates the displayed counter showing char still available 
 *            - determines counter styling by applying/removing class based on
 *            values vs. max allowed (turns red if inputted too many characters)
 */
$(document).ready(function () {
  
  $('.new-tweet textarea').on('input', function() {
    $('.new-tweet p').empty().slideUp();
    let newTweetLength = $(this).val().trim().length;
    let nearbyCounter = $(this).siblings('.counter');
    const tweetLengthLimit = 140;
    if (newTweetLength > tweetLengthLimit) {
      nearbyCounter.css({color:'red'})
      //nearbyCounter.addClass('tweetTooLong');
    } else if (newTweetLength <= tweetLengthLimit) {
      nearbyCounter.css({color:'black'})
      //nearbyCounter.removeClass('tweetTooLong');
    }
    nearbyCounter.text(tweetLengthLimit - newTweetLength);
  });

});

let newTweetLengthUn = $(this).val().length;



/* ============================================================================================= */


