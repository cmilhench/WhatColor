// 
(function(factory){
  'use strict';
  factory();
}(function(){
  'use strict';

  function getScript(url, success) {
    var head = document.getElementsByTagName('head')[0],
      done = false,
      script = document.createElement('script');
    script.src = url;
    script.onload = script.onreadystatechange = function () {
      if (!done && (!this.readyState ||
        this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;
        success();
      }
    };
    head.appendChild(script);
  }
  // add and arrange iframe

  var v = '1.3.2';

  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    getScript('http://ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js', function () {
      // loaded. 
    });
  } else {
    // loaded.
  }
  if (window.post === undefined) {
    getScript('http://localhost:3000/js/post.js', function () {
      // loaded. 
    });
  } else {
    // loaded.
  }

}));