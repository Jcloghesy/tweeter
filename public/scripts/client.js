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

/* =========================   EVENT HANDLER - JQUERY READY   ============== */
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


  
