(function(){

  // To make images retina, add a class "2x" to the img element
  // and add a <image-name>@2x.png image. Assumes jquery is loaded.

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();

  function isRetina() {
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
              (min--moz-device-pixel-ratio: 1.5),\
              (-o-min-device-pixel-ratio: 3/2),\
              (min-resolution: 1.5dppx)";

    if (window.devicePixelRatio > 1)
      return true;

    if (window.matchMedia && window.matchMedia(mediaQuery).matches)
      return true;

    return false;
  };


  function retina() {
    if (!isRetina())
      return;

    $("img.2x").map(function(i, image) {
      var path = $(image).attr("src");
      path = path.replace(".png", "@2x.png");
      path = path.replace(".jpg", "@2x.jpg");
      $(image).attr("src", path);
    });
  };

  function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      console.log( $(".article-nav") )
      // Scroll Down
      $('.article-nav').removeClass('scroll-up').addClass('scroll-down');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
        $('.article-nav').removeClass('scroll-down').addClass('scroll-up');
      }
    }

    lastScrollTop = st;
  }


  $(document).ready(function(){
    retina();
    jQuery(".timeago").timeago();
    $(".time-since").each(function(){
      var date = Date.parse($(this).text());
    });

    $(window).scroll(function(event){
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 256);
  });

})();

