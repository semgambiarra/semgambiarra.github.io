$(function(){
  var $target = $('#auto-code');
  var $header = $("#page-header");
  var $pre = $('#page-header pre');
  var min = 0;
  var max = 69;
  var currentUrl = window.location.protocol + "//" + window.location.host + "/";

  function appendCode(code){
    $target.append(code);
    $pre.animate({scrollTop: $target.height()}, 10);
  }

  function success(result){
    var i = 0;

    setInterval(function(){
      if (i < result.length){
        appendCode(result[i]);
        i++;
      } else {
        appendCode("\n");
        i = 0;
      }
    }, 40);
  }

  $.ajax({
    url : currentUrl + "assets/code/" + Math.floor(Math.random()*(max-min+1)+min) + ".txt?d="+String(+new Date),
    dataType: "text",
    success : success
  });
})
