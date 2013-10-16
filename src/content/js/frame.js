(function(factory){
	'use strict';
	factory();
}(function(){
	'use strict';

	document.addEventListener('DOMContentLoaded', initialise);

	function initialise(){
		var tab = document.querySelector('#hideTab');
		tab.addEventListener('click', function(){
			var cls = window.helpers.toggleClass(tab, 'closed')
			broadcastMessage(window, { 'type': 'click', 'target': 'tab' }, '*');
		});

    function toHex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }

		
    function sortColours(colours) {
    	return Object.keys(colours).map(function(item, index, o){ return colours[item]; }).sort(function(a, b){
				if (a.count > b.count)
	      	return 1;
	    	if (a.count < b.count)
	      	return -1;
	    	// count of a must be equal to b
	      if (a.value[0] > b.value[0])
	      	return 1;
	    	if (a.value[0] < b.value[0])
	      	return -1;
	    	// count and value of a must be equal to b ... unlikely
	    	return 0;
			});
    }

    function buildUI(colours){
			var i, div, li, saveSelection = [],
				node = document.querySelector('#colours'), 
				sorted = sortColours(colours);
			for (i = sorted.length - 1; i >= 0; i--) {
				var hex = "#" + toHex(sorted[i].value[1]) + toHex(sorted[i].value[2]) + toHex(sorted[i].value[3]) + (sorted[i].value[4]?toHex(sorted[i].value[4]):'')
				div = document.createElement('div');
				div.setAttribute('style', 'background-color:' + sorted[i].value[0]);
				li = document.createElement('li');
				li.innerText = ' ' + hex;
				li.setAttribute('title', hex + ' is used ' + sorted[i].count + ' time(s)');
				li.appendChild(div);
				node.appendChild(li);
			};
    }

		// Listen to any messages that may be passed up to us.
	  window.addEventListener('message', function(event){
	  	// Handle clicking on the tab in the frame
		  if ( (event.data.type && event.data.type === 'data')) {
		  	buildUI(event.data.data);
		  }
		});
			
	 }

}))