define(function(require, exports, module) {
	var start = require("../js/start.js");
	var confin = require("../js/confin.js");
//	var start = require("website/app/home/js/start.js");
//	var confin = require("website/app/home/js/confin.js");
	var workstop = document.querySelector(".works-top");
	var aLi = workstop.getElementsByTagName("li");
	var workslist = document.querySelectorAll(".works-list");
	var workswapr = document.querySelector(".works-wapr");
	var arr = [];
	var aPos = [];
	exports.works = function() {
		var iNow = 0;
		for (var i = 0, len = aLi.length; i < len; i++) {			
			aLi[i].index = i;
			workslist[i].style.left = "1190px";
			workslist[0].style.left = "0";			
			aLi[i].onclick = function() {					
				for (var i = 0, len = aLi.length; i < len; i++) {
					aLi[i].className = "";
				}
				this.className = "active";
				if( iNow < this.index ){
					workslist[this.index].style.left = "1190px";
					start.startMoveTime(workslist[iNow],{ left : -1190 });
				}else if(iNow > this.index){
					workslist[this.index].style.left = "-1190px";					
					start.startMoveTime(workslist[iNow],{ left : 1190 });
				}
				start.startMoveTime(workslist[this.index],{ left : 0 });
				iNow = this.index;
			}
		}
		
	}	

	exports.poplayer = function(){
		var worksbg = document.getElementById("works-bg");
		var oLi = workswapr.getElementsByTagName("li");
		var workslayer = document.querySelector(".workswarp");	
		var workslayertwo = workslayer.querySelector(".works-layer");
		var workslayertop = document.querySelector(".works-layer-top");	
		var img = workslayertop.getElementsByTagName("img")[0];
		var workslayercon = document.querySelector(".works-layer-con");	
		var workslayerbot = document.querySelector(".works-layer-bot");	
		var workslayerright = document.querySelector(".works-layer-right");	
		var rightimg = workslayerright.getElementsByTagName("img")[0];	
		var close = document.querySelector(".close");
		for( var i = 0; i < oLi.length; i++ ){
			oLi[i].index = i;			
			oLi[i].addEventListener("click", function(event){
				var ev = ev || event;
				ev.stopPropagation();
				var that = this;
				var arr = [];
				workslayer.style.display = "block";
				var name = this.dataset.name;
				var imageurl = this.dataset.imageurl;
				var tool = this.dataset.tool;
				var types = this.dataset.types;
				var synopsis = this.dataset.synopsis;
				var url = this.dataset.url;
				var erwm = this.dataset.erwm;
				var synopsis = this.dataset.synopsis;
				var onoff = this.dataset.onoff;
				var worksurl = document.querySelector(".works-url");
				
				document.querySelector(".works-name").innerHTML = name;
				document.querySelector(".works-tool").innerHTML = tool;
				img.src= "" + imageurl + "" ;
				document.querySelector(".works-types").innerHTML = types;		
				var codewarp = workslayerright.querySelector(".codewarp");
				var codewarpimg = codewarp.getElementsByTagName("img")[0];
				if(onoff == 1){
					codewarpimg.src = "" + erwm + "";
					codewarp.style.display = "block";
					worksurl.innerHTML = "";
				}else{
					worksurl.innerHTML = url;
					worksurl.href = url;
					codewarp.style.display = "none";
				}
				var xhr = new XMLHttpRequest();
				xhr.open("get","js/digital.json");
				xhr.send();
				xhr.onreadystatechange = function(){
					if( xhr.readyState == 4 && xhr.status == 200 ){
						var data = JSON.parse(xhr.responseText);
						for( var i in data ){
							arr.push(data[i].neirong);							
							document.querySelector(".synopsis").innerHTML = arr[that.index];
						}
					}
				}
			})
		}
		workslayertwo.onclick = function(event){
			var ev = ev || event;
			ev.stopPropagation();
		}
		document.onclick = function(){

			workslayer.style.display = "none";
		}
		close.onclick = function () {			
			workslayer.style.display = "none";
		}
	}
	


})