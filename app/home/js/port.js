define(function(require,exports,module){
	var portwarp = document.querySelector(".port-warp");
	var aLi = portwarp.getElementsByTagName("li");
	var icon = portwarp.querySelectorAll(".iconfont");
	var portlist = portwarp.querySelectorAll(".port-list");
	var turn = portwarp.getElementsByClassName("turn");
	var confin = require("../js/confin.js");
	var onoff = true;	
	exports.port = function(){
	for ( var i = 0; i < aLi.length; i++ ) {
		aLi[i].index = i;
		aLi[i].onoff = true;
		aLi[i].onclick = function(){
			if(this.onoff){
					hidden(this.index);
					this.onoff = false;
			}else{
				show(this.index);
				this.onoff = true;
			}
		}		
	}		
		function hidden(elem){		
			portlist[elem].style.transition = ".5s";
			portlist[elem].style.transform = portlist[elem].style.WebkitTransform = portlist[elem].style.MozTransform = portlist[elem].style.OTransform = "rotateY(90deg)";
			portlist[elem].addEventListener("transitionend",end,false);
			portlist[elem].addEventListener("oTransitionEnd",end,false);
			function end(){				
				this.removeEventListener("transitionend",end,false);
				this.removeEventListener("oTransitionEnd",end,false);
				turn[elem].style.transition = ".5s";
				turn[elem].style.WebkitTransition = ".5s";
				turn[elem].style.MozTransition = ".5s";
				turn[elem].style.transform =  "rotateY(0deg)";	
				turn[elem].style.MozTransform =  "rotateY(0deg)";	
				turn[elem].style.WebkitTransform =  "rotateY(0deg)";	
			}
		}		
		function show(elem){			
			turn[elem].style.transition = ".5s";
			turn[elem].style.transform = turn[elem].style.WebkitTransform = turn[elem].style.MozTransform = turn[elem].style.OTransform = "rotateY(-90deg)";	
			turn[elem].addEventListener("transitionend",end,false);
			turn[elem].addEventListener("oTransitionEnd",end,false);
			function end(){			
				this.removeEventListener("transitionend",end,false);				
				this.removeEventListener("oTransitionEnd",end,false);				
				portlist[elem].style.transition = ".5s";
				portlist[elem].style.transform = portlist[elem].style.WebkitTransform = portlist[elem].style.MozTransform = portlist[elem].style.OTransform = "rotateY(0deg)";
			}
		}
		
	
		
	}
	
})
