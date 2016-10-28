define(function(require, exports, modelu) {

	function hasClass(elem, cls) {
		return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function addClass(elem, cls) {
		if (!hasClass(elem, cls)) {
			elem.className += ' ' + cls;
		}
	}

	function removeClass(elem, cls) {
		if (hasClass(elem, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			elem.className = elem.className.replace(reg, '');
		}
	}

	function toggleClass(elem, cls) {
		if (hasClass(elem, cls)) {
			removeClass(elem, cls);
		} else {
			addClass(elem, cls);
		}
	}
	
	function remove(obj){
		var prentNode = obj.parentNode;
		prentNode.removeChild(obj);
	}
	
	function getLeft(obj){
		var iLeft = 0;
		while(obj){
			iLeft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
		return iLeft;
	}
	function getTop(obj){
		var iTop = 0;
		while(obj){
			iTop += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return iLeft;
	}
	exports.hasClass = hasClass;
	exports.remove = remove;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.toggleClass = toggleClass;
	exports.getLeft = getLeft;
	exports.getTop = getTop;

})