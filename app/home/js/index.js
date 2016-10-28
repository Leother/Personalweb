define(function(require,exports,moudle){
	var menu = require("../js/menu.js");
	var port = require("../js/port.js");
	var resume = require("../js/resume.js");
	var works = require("../js/works.js");
	var target = require("../js/target.js");
	var message = require("../js/message.js");
	var carousel = require("../js/carousel.js");
	
//	var menu = require("website/app/home/js/menu.js");
//	var port = require("website/app/home/js/port.js");
//	var resume = require("website/app/home/js/resume.js");
//	var works = require("website/app/home/js/works.js");
//	
//	var message = require("website/app/home/js/message.js");
//	var carousel = require("website/app/home/js/carousel.js");
	menu.menu();
	port.port();
	resume.res();
	works.works();			
	works.poplayer();			
	
	var target = document.querySelector(".target");
	document.onscroll = function(){
		if( window.pageYOffset > 1500 ){
			var target = require("../js/target.js");
			target.target();	
		}
	}
	
	
	var drift = document.querySelector(".drift");
	window.onscroll = function(){
		var num = document.body.scrollTop;
		if( num < 200 ){
			drift.style.display = "none";
		}else{
			drift.style.display = "block";
		}
	}
	
})