(function(factory){
	'use strict';
	factory(chrome);
}(function(){
	'use strict';

	// Simple communication with extension pages
	var port = chrome.extension.connect();

	// Tell our chrome to webpage page comunication 
	// system that we are alive listening and here.
	port.postMessage({ type : 'init' });

	// Start listening to messages from the extension.
	port.onMessage.addListener(function(msg) {
		if (!msg.type || msg.type !== 'click') {
			return;
		} 
    var done = false;
		var head = document.getElementsByTagName('head')[0];
		var name = chrome.extension.getURL('content/coordinator.js')
		var rtms = document.querySelector('script[src="' + name + '"]');
		// If we click the extension button a second time, remove the
		// coordinator script, (it will monitor itself and clear up).
		if (rtms) {
			rtms.parentNode.removeChild(rtms);
			return;
		}
    rtms = document.createElement('script');
  	rtms.setAttribute('type', 'text/javascript');
  	rtms.setAttribute('src', name);
    head.appendChild(rtms);
    rtms.onload = rtms.onreadystatechange = function () {
      if (!done && (!this.readyState ||
        this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;
      }
    }
	});


}));