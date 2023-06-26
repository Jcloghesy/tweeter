/* ============================================================================================= */
/* ==-------------------------------   COMPOSER-CHAR-COUNTER.JS  -----------------------------== */
/* ============================================================================================= */


/**
 * Implements character counter function (listener, handler, still available) 
 *   DOCUMENT READY - starts by ensuring HTML elements are loaded in browser
 *        - loading occurs prior to any attempts to access elements  
 *   EVENT LISTENER - Establishes event listener for text input  
 *        - listener focused on textarea  (.new-tweet section of Tweet form)
 *        - obtains the textarea values 
 *   ANALYSIS - counts inputted chars & compares to max to determine available 
 *	 RESPONDS - updates the displayed counter showing char still available 
 *          - determines styling of counter by applying class based upon inputted
 *            values vs. max allowed (turns red if inputted too mnny characters)
 */
$(document).ready(function () {
  $('.new-tweet textarea').on('input', function() {
    let newTweetLength = $(this).val().length;
    let nearbyCounter = $(this).siblings('.counter');
    const tweetLengthLimit = 140;

    if (newTweetLength > tweetLengthLimit) {
      nearbyCounter.addClass('tweetTooLong');
    } else if (newTweetLength <= tweetLengthLimit) {
      nearbyCounter.removeClass('tweetTooLong');
    }
    nearbyCounter.text(tweetLengthLimit - newTweetLength);
  });
});





/* ============================================================================================= */


