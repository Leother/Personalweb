define(function(require, exports, moudle) {
	var start = require("../js/start.js");
//	var start = require("website/app/home/js/start.js");
	exports.menu = function() {		
		var menu = document.querySelector(".menu");
		var menubg = document.querySelector(".menu-bg");
		var aLi = menu.getElementsByTagName("li");
		var aPoi = [];
		var cshleft = 0;
		for (var i = 0, len = aLi.length; i < len; i++) {
			var l = aLi[i].offsetLeft;
			var t = aLi[i].offsetTop;
			aLi[i].style.left = l + "px";
			aLi[i].style.top = t + "px";
			aPoi[i] = { left: l, top: t	};
		}
		for (var i = 0, len = aLi.length; i < len; i++) {
			aLi[i].style.position = "absolute";
			aLi[i].style.margin = 0;
			
			aLi[i].onmouseover = function() {				
				var left = parseInt(this.style.left);
				start.startMove(menubg, { left: left});				
			}
			aLi[i].onmouseout = function() {
				start.startMove(menubg, { left: cshleft});
			}
			aLi[i].onclick = function() {		
				var left = parseInt(this.style.left);		
			
				
				for ( var j = 0, len = aLi.length; j < len; j++ ) {
					aLi[j].className = "";					
				}
				this.className = "active";
				cshleft = this.offsetLeft;
			}
		}
		
	}



})