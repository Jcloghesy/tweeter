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
 *            values vs. max allowed (turns red if inputted too many characters)
 */
$(document).ready(function () {
  
  $('.new-tweet textarea').on('input', function() {
    $('.new-tweet p').empty().slideUp();
    let newTweetLength = $(this).val().length;
    let nearbyCounter = $(this).siblings('.counter');
    const tweetLengthLimit = 140;
console.log(newTweetLength, tweetLengthLimit)
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





/* ============================================================================================= */


