$(document).ready(function(){

  var content = $(".jumbotron .jumbotron-content")
  content.css({'opacity': 0.3, 'top': '12px'})
  content.animate({
    'opacity': 1, 
    'top': '0px'
  }, 1000, "swing")

  var i = 0
  var rotator = $("ul#text_rotator")
  var rotator_items_parent = $("ul#text_rotator li")
  var rotator_items = $("ul#text_rotator li span")

  startRotator()

  function startRotator() {
    setInterval(function() {
      rotate()
    }, 3400)
  }
  function rotate(){
    if(i < rotator_items.length - 1) {
      i++
      current_item = rotator_items.eq(i)
      parent_item = rotator_items_parent.eq(i)
      rotator.animate({
        'width' : 0
      }, 500, "swing")
      rotator.animate({
        'marginTop' : '-=' + parent_item.outerHeight()
      }, 100, "swing")
      rotator.animate({
        'width' : current_item.width()
      }, 1400, "swing")
    } else {
      i = 0
      current_item = rotator_items.eq(i)
      rotator.animate({
        'width' : 0
      }, 500, "swing")
      rotator.animate({
        'marginTop' : '0',
      }, 100, "swing")
       rotator.animate({
        'width' : current_item.width()
      }, 1400, "swing")
    }
  }
})
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});