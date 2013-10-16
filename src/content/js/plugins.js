
(function(factory){
	'use strict';
	window.helpers = factory();
}(function(){
	
	function addClass(node, names) {
  	names.split(' ').forEach(function(name){
  		var cls = node.getAttribute('class') || '';
			if (!new RegExp(name, 'i').test(cls)) {
				cls += ' ' + name;
			}
			cls = cls.replace(/\s{2,}/g,' ');
			cls = cls.replace(/^\s+|\s+$/g, '');
			node.setAttribute('class', cls);
		});
	}
	function removeClass(node, names) {
  	names.split(' ').forEach(function(name){
			var cls = node.getAttribute('class') || '';
			cls = cls.replace(new RegExp('(^|\s*)' + name + '($|\s*)', 'i'), '');
			cls = cls.replace(/\s{2,}/g,' ');
			cls = cls.replace(/^\s+|\s+$/g, '');
			node.setAttribute('class', cls);
		});
	}

  function toggleClass(node, names) {
  	names.split(' ').forEach(function(name){
  		var cls = node.getAttribute('class') || '';
			if (new RegExp(name, 'i').test(cls)) {
				cls = cls.replace(new RegExp('(^|\s*)' + name + '($|\s*)', 'i'), '');
			} else {
				cls += ' ' + name;
			}
			cls = cls.replace(/\s{2,}/g,' ');
			cls = cls.replace(/^\s+|\s+$/g, '');
			node.setAttribute('class', cls);
		});
	}

	return {
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass
	};

}))