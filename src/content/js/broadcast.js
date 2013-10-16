// Broadcast Message
// A function to send a message recursively to ALL reachable 
// windows from this location i.e. iframes and parent windows.
// Example Usage:
// document.addEventListener('DOMContentLoaded', function(){
//   document.addEventListener('click', function(event){
//     broadcastMessage(window, {'mess':'age'}, '*');
//   });
// }, false );
// window.addEventListener('message', function(event){
//   console.log(' - Recieved message:', event.data, window.location.href);
// });
(function (factory) {
  'use strict';
  window.broadcastMessage = factory();
}(function () {
  'use strict';
  window.addEventListener('message', function(event){
    fn(event.source, event.data, '*');
  }, false);
  var fn = function (source, message, targetOrigin) {
    if (window.parent !== window && window.parent !== source) {
      window.parent.postMessage(message, targetOrigin);
    }
    Array.prototype.forEach.call(document.getElementsByTagName('iframe'), function(frame) {
      if (frame.contentWindow !== source) {
        frame.contentWindow.postMessage(message, targetOrigin);
      }
    });
  };
  return fn;
}));