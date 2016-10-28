define(function(require,exports,module){
//	var start = require("website/app/home/js/start.js");
	var start = require("../js/start.js");
	var carousel = document.querySelector(".carousel");
	var carouselul = document.querySelector(".carousel-ul");
	var carouselmenu = document.querySelector(".carousel-menu");
	var menuLi = carouselul.getElementsByTagName("li");
	var aLi = carouselmenu.getElementsByTagName("li");
	var iNow = 0;
	var timer = 0;
	menuLi[0].style.opacity = "1";
	
	
	carousel.onmouseover = function(){
		clearInterval(timer);
	}
	carousel.onmouseout = function(){
		auto();
	}
	for ( var i = 0, len = aLi.length; i < len; i++ ) {
		aLi[i].index = i;
		aLi[i].onclick = function(){
			for ( var i = 0, len = aLi.length; i < len; i++ ) {
				aLi[i].className = "";
				menuLi[i].style.opacity = "0";
			}
			this.className = "active";
			menuLi[this.index].style.opacity = "1";
		}
	}
	auto();
	function auto(){
		
		timer = setInterval(function(){		
			for ( var i = 0, len = menuLi.length; i < len; i++ ) {
				menuLi[i].style.opacity = "0";
				aLi[i].className = "";
			}
			iNow++;
			if( iNow > menuLi.length-1 ){
				iNow = 0;
			}
			aLi[iNow].className = "active";
			menuLi[iNow].style.opacity = "1";
				
		},2500)
	}
	
})
