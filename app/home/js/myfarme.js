(function(w){
	function myfarme(){}
	//获取样式
	myfarme.getStyle = {
		//获取ID
		id : function(str){
			return document.getElementById(str);
		},
		//获取CSS
		class : function(str){
			if( document.getElementsByClassName ){
				return document.getElementsByClassName(str);
			}else{
				var arr = [];
				var elem = document.getElementsByTagName("*");
				for ( var i = 0, len = elem.length; i < len; i++ ) {
					var child = elem[i];
					var classname = child.className.split(" ");
					for ( var j = 0, leng = classname.length; j < leng; j++ ) {
						if( classname[j] == str ){
							arr.push(classname[i]);
							break;
						}
					}
				}
				return arr;
			}
		},
		//获取标签
		tag : function(tag){
			return document.getElementsByTagName(tag);
		},
		//多组获取
		find : function(content,elem){
			var firstcont = content.charAt(0);
			var firstelem = elem.charAt(0);
			
			if( firstcont == "#" ){
				content = content.substring(1);
				return document.getElementById(content)
			}else if(firstcont == "."){
				content = content.substring(1);
				return myfarme.getStyle.css(content);
			}
			if( firstelem == "#" ){
				elem = elem.substring(1);
				return content.getElementById(elem)
			}else if( firstelem == "." ){
				elem = elem.substring(1);
				return content.getElementsByClassName(elem)
			}else{
				return content.getElementsByTagName(elem);
			}
		},
		hasClass : function(elem,cls){
 			cls = cls || "";
 			if(cls.replace(/\s/g,"").length == 0){ return false; }
 			return new RegExp(' ' + cls + ' ' ).test(' ' + elem.className + ' ');
		},
		addClass : function(elem,cls){
			if( !myfarme.getStyle.hasClass(elem,cls) ){
				elem.className += ' ' + cls;
			}
		},
		removeClass : function(elem,cls){
			if(myfarme.getStyle.hasClass(elem,cls)){
				var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
				while(newClass.indexOf(' ' + cls + ' ') >= 0){
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
			}
		},
		css : function(content,key,val){
			var dom = myfarme.analyzingtype.isString(content) ? myfarme.getStyle.class(content) : content;
			if( dom.length ){
				if( val ){
					for ( var i = 0, len = dom.length; i < len; i++ ) {
						setStyle(dom[i],key,val);
					}
				}else{
					getStyle(dom[0]);
				}
			}
			function getStyle(dom){
				if( dom.currentStyle ){
					return dom.currentStyle[key];
				}else{
					return dom.getComputedStyle(dom,null)[key];
				}
			}
			function setStyle(dom,key,val){
				return dom.style[key] = val;
			}
		}
	}
	
	//判断数据类型
	
	myfarme.analyzingtype = {
		//判断是否为数字类型
		isNumber : function(val){
			return typeof val === "number" && isFinite(val);
		},
		//判断是否为字符串类型
		isString : function(val){
			return typeof val === "string";
		},
		//判断是否为字布尔类型
		isBoolean : function(val){
			return typeof val === "boolean";
		},
		//判断是否为undefind
		isUndefind : function(val){
			return typeof val === "undefind";
		},
		//判断是否为对象
		isObj : function(val){
			if( val === null || typeof val === "undefind" ){
				return false;
			}
			return typeof val === "object";
		},
		//判断是否为null
		isNull : function(val){
			return val === null;
		},
		//判断是否为数组
		isArray : function(arr){
			if( arr === null || typeof arr === "undefind" ){
				return false;
			}
			return arr.constructor === Array;
		},
		//判断传进的参数
		isParameter : function(str){
			var firststr = str.charAt(0);
			if( firststr == "#" ){
				return str = document.getElementById(str);
			}else if( firststr == "." ){
				return str = myfarme.getStyle.class(str);
			}
		}
	}
	
	//操作字符串
	myfarme.string = {
		//去掉单词左右空格
		tirm : function(str){
			return str.replace(/(^\s*) | (\s*$)/g,"");
		},
		//去掉单词左空格
		ltirm : function(str){
			return str.replace(/(^\s*)/g,"");
		},
		//去掉单词右空格
		rtirm : function(str){
			return str.replace(/(^\s*$)/g,"")
		}
	}
	
	//操作数字类型
	myfarme.operumber = {
		//随机数
		random : function(start,end){
			return Math.floor( Math.random() * (end - start) + start )
		}
	}
	//事件
	myfarme.event = {
		//绑定事件
		on : function(str,elem,fn){
			var strfirst = str.charAt(0);
			if( strfirst == "#" ){
				str = myfarme.getStyle.id(str.substring(1))
			}else if( strfirst == "." ){
				str = myfarme.getStyle.class(str.substring(1));
			}else{
				str = myfarme.getStyle.tag(str);
			}
			 str.addEventListener(elem,fn);
		},
		//移除事件
		un : function(str,elem,fn){
				var strfirst = str.charAt(0);
				if( strfirst == "#" ){
					str = myfarme.getStyle.id(str.substring(1))
				}else if( strfirst == "." ){
					str = myfarme.getStyle.class(str.substring(1));
				}else{
					str = myfarme.getStyle.tag(str);
				}
			str.removeEventListener(elem,fn);
		},
		//点击事件
		click : function(id,fn){			
			return myfarme.event.on(id,"click",fn);
		},
		//鼠标移动事件
		mousemove : function(id,fn){
			return myfarme.event.on(id,"mouseover",fn);
		},
		//鼠标移开事件
		mouseout : function(id,fn){
			return myfarme.event.on(id,"mouseout",fn);
		},
		//鼠标移动移开事件
		hover : function(id,fn1,fn2){
			myfarme.event.mousemove(id,fn1);
			myfarme.event.mouseout(id,fn2);
		},
		//隐藏
		hide : function(str){
			return str.style.display = "none";
		},
		//显示
		show : function(str){
			return str.style.display = "block";
		}
		
	}
	
	//ajax
	myfarme.myajax = {
		ajax : function(options){
			options = options || {}; 
			options.type = (options.type || "GET").toUpperCase(); 
			options.dataType = options.dataType || "json"; 
			var params = formatParams(options.data);
			
			//创建 - 非IE6 - 第一步 
			if (window.XMLHttpRequest) { 
				 var xhr = new XMLHttpRequest(); 
			} else {
				//IE6及其以下版本浏览器 
				var xhr = new ActiveXObject('Microsoft.XMLHTTP'); 
			}
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) { 
					var status = xhr.status; 
					if (status >= 200 && status < 300) { 
						options.success && options.success(xhr.responseText, xhr.responseXML); 
					} else { 
						options.fail && options.fail(status); 
					} 
				} 
			}
			if (options.type == "GET") { 
				xhr.open("GET", options.url + "?" + params, true); 
				xhr.send(null); 
			} else if (options.type == "POST") { 
				xhr.open("POST", options.url, true); 
				//设置表单提交时的内容类型 
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
				xhr.send(params); 
			}
			
			//数据格式转换
			function formatParams(data) { 
				var arr = []; 
				for (var name in data) { 
					arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name])); 
				} 
				arr.push(("v=" + Math.random()).replace(".",""));				
				return arr.join("&"); 
			}
		}
	}
	
	
	w.myfarme = myfarme;
	
})(window)
