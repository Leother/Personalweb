define(function(require,exports,module){
	var next = document.getElementById("next");
	var prev = document.getElementById("prev");
	var confin = require("../js/confin.js");
//	var confin = require("website/app/home/js/confin.js");
	exports.res = function(){
		var wheeled = document.querySelector(".wheeled");	
		
		next.onclick = function(){
			var $t = 0;
			var aLi = wheeled.getElementsByTagName("li");
			for ( var i = 0, len = aLi.length; i < len; i++ ) {
				aLi[i].index = i;
				if( confin.hasClass( aLi[i],"active" ) ){
					 $t = i;
				}
				aLi[i].className = "";
			}
			var iBe = $t +1;
			var iPr = $t +2;
			iPr = iPr % len;			
			iBe = iBe % len;			
			confin.addClass( aLi[$t],"prev" );
			confin.addClass( aLi[iBe],"active" );				
			confin.addClass( aLi[iPr],"next" );
		}
		prev.onclick = function(){
			var $t = 0;
			var aLi = wheeled.getElementsByTagName("li");
			for ( var i = 0, len = aLi.length; i < len; i++ ) {
				aLi[i].index = i;
				if( confin.hasClass( aLi[i],"active" ) ){
					 $t = i;
				}
				aLi[i].className = "";
			}
			var iBe = $t +1;
			var iPr = $t +2;
			iPr = iPr % len;			
			iBe = iBe % len;
			confin.addClass( aLi[$t],"next" );
			confin.addClass( aLi[iBe],"prev" );				
			confin.addClass( aLi[iPr],"active" );
		}
		
		
	}
	
})
