(function(factory){
	'use strict';
	window.coordinator = factory();
}(function(){
	'use strict';
	
	console.log(' > loading WhatColor coordinator...');

	// TODO: if window.coordinator return? we may already have it loaded, currently 
	// only if its loaded outside of an extension, and then you also use the extension,
	if (window.coordinator) return window.coordinator;

	// If we're running from a chrome extension we need to load 
	// the scripts there, otherwise we can load the relitively
	// TODO: update this to include urls that this is hosted on.
	var prefix = '';
	if (document.location.host !== 'localhost:3000') {
		prefix = 'chrome-extension://begomjapoppkfcdcaindehabfglbfkcn/';
	}
	
	if(document.readyState === "complete") {
		initialise();
	} else {
		document.addEventListener('DOMContentLoaded', initialise);
	}

  function appendResourceElement(parent, name, attrs, success) {
    var done = false, tag = document.createElement(name);
    for (var key in attrs) {
    	if (!attrs.hasOwnProperty(key)) continue;
    	tag.setAttribute(key, attrs[key]);
    }
    parent.appendChild(tag);
    if (!/(iframe|script|link)/.test(name) || done) { 
    	return success();
    }
    tag.onload = tag.onreadystatechange = function () {
      if (!done && (!this.readyState ||
        this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;
        success(tag);
      }
    }
  }

  function initialise(){
		var head = document.getElementsByTagName('head')[0];
		var body = document.getElementsByTagName('body')[0];
		var frame;
		
		// Add the global helper scripts
		appendResourceElement(head, 'script', 
			{ 'type':'text/javascript', 'src': prefix + 'content/js/plugins.js'}, 
			function(element){ }
		);

		// Add the styles that we will need on the host page
		// so that each of our injected iframes looks mint!
		appendResourceElement(head, 'link', 
			{ 'rel':'stylesheet', 'href': prefix + 'content/css/main.css'}, 
			function(element){ }
		);

		// Add the frame that is going to be our toolbox
		appendResourceElement(body, 'iframe', 
			{ 'src': prefix + 'content/frame.html', 'id':'tools', 'frameBorder':'0' }, 
			function(element){
				frame = element;
				frame.setAttribute('class','not-hidable visible');
				frame.contentWindow.postMessage({ type:'data', data: getColours(document) }, '*')
			}
		);

		// Listen to any messages that may be passed up to us.
	  window.addEventListener('message', function(event){
	  	// Handle clicking on the tab in the frame
		  if ( (event.data.type && event.data.type === 'click') &&
		  	(event.data.target && event.data.target === 'tab')) {
		  	window.helpers.toggleClass(frame, 'visible')
		  }
		});


		//////////
		function getMatches(expression, text) {
			var found = [], match;
			while (match = expression.exec(text)) {
				found.push(match);
			}
			return found;
		}
    function getColours(doc){
    	var s, sheet, r, matches, m, match, colours = {};
			for (s = doc.styleSheets.length - 1; s >= 0; s--) {
				sheet = doc.styleSheets[s];
				if (!sheet.cssRules) continue;
				for (r = sheet.cssRules.length - 1; r >= 0; r--) {
					matches = getMatches(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+)\s*)?\)/g, sheet.cssRules[r].cssText);
					for (m = matches.length - 1; m >= 0; m--) {
						match = matches[m];
						if (!colours.hasOwnProperty(match[0])) {
							delete match.index;
							delete match.input;
							colours[match[0]] = { value: match, count:1};
						} else {
							colours[match[0]].count++;
						}
					}
				}
			}
			return colours;
    }
		//////////

	  // Monitor for the potential removal of this script.
	  // if it's removed, lets asume that the extension is closed.
	  var removed = function(event){
	  	var source = prefix + 'content/coordinator.js';
			if (event.target.getAttribute('src') === source) {
				head.removeEventListener('DOMNodeRemoved', removed, false);
				frame.parentNode.removeChild(frame);
				window.coordinator = null;
			}
		}
		head.addEventListener('DOMNodeRemoved', removed, false);
	}

	return {};

}))