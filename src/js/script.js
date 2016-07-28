$(document).ready(function(){

  // var content = $(".jumbotron .jumbotron-content")
  // content.css({'opacity': 0.3, 'top': '12px'})
  // content.animate({
  //   'opacity': 1, 
  //   'top': '0px'
  // }, 1000, "swing")

  var i = 0
  var rotator = $("#text-rotator--list")
  var rotator_items_parent = $("#text-rotator--list li")
  var rotator_items = $("#text-rotator--list li span")

  startRotator()

  function startRotator() {
    setInterval(function() {
      // Make sure previous animation has completed
      // and animation queue is empty first.
      rotator.stop( true, true )
      rotate()
    }, 4000)
  }
  function rotate(){
    if(i < rotator_items.length - 1) {
     i++
    } else {
      i = 0
    }
    current_item = rotator_items.eq(i)
    parent_item = rotator_items_parent.eq(i)
    rotator.animate({
      'width' : 0
    }, 500, "swing")
    rotator.animate({
      'marginTop' : -1 * (i) * parent_item.outerHeight()
    }, 100, "swing")
    rotator.animate({
      'width' : current_item.width()
    }, 1400, "swing")
  }


})

// Initialize wow animations
new WOW().init();

// Emoji Support
window.onload = function() {

  // Set the size of the rendered Emojis
  // This can be set to 16x16, 36x36, or 72x72
  twemoji.size = '16x16';

  // Parse the document body and
  // insert <img> tags in place of Unicode Emojis
  twemoji.parse(document.body);

}