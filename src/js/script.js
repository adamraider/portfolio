$(document).ready(function(){

  var i = 0
  var rotator = $("ul#text_rotator")
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
      rotator.animate({
        'marginTop' : '-=' + current_item.outerHeight(),
        'width' : current_item.width()
      }, 1400, "swing")
    } else {
      i = 0
      current_item = rotator_items.eq(i)
      rotator.animate({
        'marginTop' : '0',
        'width' : current_item.width()
      }, 1400, "swing")
    }
  }
})