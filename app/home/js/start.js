define(function(require, exports, module) {
	var con = require("../js/confin.js");
//	var con = require("website/app/home/js/confin.js");
	function startMove(obj, json, fn) { //传递3个参数
		//所有设置多物体运动的时候不能共用
		clearInterval(obj.timer); //关闭this的timer
		obj.timer = setInterval(function() {
			for (var attr in json) //使用json来传入多个值，需要遍历
			{
				var iCur = 0;
				if (attr == "opacity") {//对传入值进行判断
					iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100); //任何时候后都尽量避免使用浮动数字
				} else {
					iCur = parseFloat(getStyle(obj, attr));
				}
				var Speed = (json[attr] - iCur) / 8; //使用缓冲运动
				Speed = Speed > 0 ? Math.ceil(Speed) : Math.floor(Speed); //缓冲运动必须取整
				if (iCur == json[attr]) {
					clearInterval(obj.timer);
					fn && fn();
				} else {
					if (attr == "opacity") {
						obj.style.filter = "alpha:apha(opacity:" + (iCur + Speed) + ")"
						obj.style.opacity = (iCur + Speed) / 100;
						document.title = obj.style.opacity;
					} else {
						obj.style[attr] = iCur + Speed + "px"; //设置宽高
					}

				}
			}
		}, 30)
	}
	
	
	function startMoveTime(obj,json,times,fx,fn){
		
		var iCur = {};
		var startTime = nowTime();
		
		if( typeof times == 'undefined' ){
			times = 400;
			fx = 'linear';
		}		
		if( typeof times == 'string' ){
			if(typeof fx == 'function'){
				fn = fx;
			}
			fx = times;
			times = 400;
		}
		else if(typeof times == 'function'){
			fn = times;
			times = 400;
			fx = 'linear';
		}
		else if(typeof times == 'number'){
			if(typeof fx == 'function'){
				fn = fx;
				fx = 'linear';
			}
			else if(typeof fx == 'undefined'){
				fx = 'linear';
			}
		}		
		for(var attr in json){
			iCur[attr] = 0;
			if( attr == 'opacity' ){
				iCur[attr] = Math.round(getStyle(obj,attr)*100);
			}
			else{
				iCur[attr] = parseInt(getStyle(obj,attr));
			}
		}		
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){			
			var changeTime = nowTime();			
			//startTime changeTime			
			var scale = 1-Math.max(0,startTime + times - changeTime)/times; //2000 - 0 -> 1-0 -> 0-1			
			for(var attr in json){				
				var value = Tween[fx](scale*times,iCur[attr],json[attr] - iCur[attr],times);				
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity='+ value +')';
					obj.style.opacity = value/100;
				}
				else{
					obj.style[attr] = value + 'px';
				}				
			}			
			if(scale == 1){
				clearInterval(obj.timer);
				if(fn){
					fn.call(obj);
				}
			}			
		},30);		
		function nowTime(){
			return (new Date()).getTime();
		}
	}
		var Tween = {
		linear: function (t, b, c, d){  //匀速
			return c*t/d + b;
		},
		easeIn: function(t, b, c, d){  //加速曲线
			return c*(t/=d)*t + b;
		},
		easeOut: function(t, b, c, d){  //减速曲线
			return -c *(t/=d)*(t-2) + b;
		},
		easeBoth: function(t, b, c, d){  //加速减速曲线
			if ((t/=d/2) < 1) {
				return c/2*t*t + b;
			}
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInStrong: function(t, b, c, d){  //加加速曲线
			return c*(t/=d)*t*t*t + b;
		},
		easeOutStrong: function(t, b, c, d){  //减减速曲线
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
			if ((t/=d/2) < 1) {
				return c/2*t*t*t*t + b;
			}
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
			if (t === 0) { 
				return b; 
			}
			if ( (t /= d) == 1 ) {
				return b+c; 
			}
			if (!p) {
				p=d*0.3; 
			}
			if (!a || a < Math.abs(c)) {
				a = c; 
				var s = p/4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
			if (t === 0) {
				return b;
			}
			if ( (t /= d) == 1 ) {
				return b+c;
			}
			if (!p) {
				p=d*0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},    
		elasticBoth: function(t, b, c, d, a, p){
			if (t === 0) {
				return b;
			}
			if ( (t /= d/2) == 2 ) {
				return b+c;
			}
			if (!p) {
				p = d*(0.3*1.5);
			}
			if ( !a || a < Math.abs(c) ) {
				a = c; 
				var s = p/4;
			}
			else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			if (t < 1) {
				return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
						Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			}
			return a*Math.pow(2,-10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
		},
		backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
			if (typeof s == 'undefined') {
			   s = 1.70158;
			}
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		backOut: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 3.70158;  //回缩的距离
			}
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}, 
		backBoth: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 1.70158; 
			}
			if ((t /= d/2 ) < 1) {
				return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			}
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
			return c - Tween['bounceOut'](d-t, 0, c, d) + b;
		},       
		bounceOut: function(t, b, c, d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
			}
			return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		},      
		bounceBoth: function(t, b, c, d){
			if (t < d/2) {
				return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
			}
			return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
		}
	}
	
	
	function getStyle(obj, attr) { //获取样式
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	}
	exports.startMove = startMove;
	exports.startMoveTime = startMoveTime;
	exports.getStyle = getStyle;
})