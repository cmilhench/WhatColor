(function(factory){
	'use strict';
	factory(chrome);
}(function(chrome){
	'use strict';
	var tabs = {};
	// Register any pages that send us a message of type init.
	chrome.extension.onConnect.addListener(function(port) {
		port.onMessage.addListener(function(msg) {
			if (msg.type && msg.type === 'init') {
				tabs[port.sender.tab.id] = { port : port };
			}
		});
	});
	// Tell registered pages when the extension has been clicked.
	chrome.browserAction.onClicked.addListener(function(tab) {
		tabs[tab.id].port.postMessage({
			type: 'click', 
			target: tab,
			sender: tabs[tab.id].port.id
		});
	});
	// Remove old pages for put page registration system.
	chrome.tabs.onRemoved.addListener(function(tabId) {
		if (tabs[tabId]) {
			delete tabs[tabId];
		}
	});
}));