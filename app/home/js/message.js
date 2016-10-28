define(function(require,exports,module){
	var messageTable = document.querySelector(".warp-messageTable");
	var btn = messageTable.querySelector(".sub");
	var timer = null;
	var iNow = 0;
	var sHtml ='<div class="box"><div class="pic"></div><div class="ico"></div><div class="content text"><p class="tagname"></p><p class="tagcon"></p></div></div>';
	var messageList = document.getElementById("messageList");
	var setmessage = document.querySelector(".setmessage");
	var name = setmessage.querySelector(".yf-name");
	var con = setmessage.querySelector(".yf-con");
	var point = setmessage.querySelector(".point");
	
	btn.onclick = function(){
		console.log();
		if( con.value === "" || con.value === null ){
			point.innerHTML = "内容不能为空!";
		}else{			
			
			var li = document.createElement("li");
			li.innerHTML = sHtml;	
			if( messageList.children.length == 0 ){
				messageList.appendChild(li);
			}else{
				var first = messageList.firstChild;
				messageList.insertBefore( li,messageList.children[0] )
			}
			
			var aLi = messageList.children;
			var yfname = document.querySelector(".yf-name");
			var yfcon = document.querySelector(".yf-con");
			var tagname = aLi[iNow].querySelector(".tagname");
			var tagcon = aLi[iNow].querySelector(".tagcon");
			var box = document.querySelectorAll(".box");
			var liH = aLi[0].offsetHeight;
			clearTimeout(timer);
			if( name.value == "" || name.value == null ){
				tagname.innerHTML = "游客1";
			}else{
				tagname.innerHTML = name.value;
			}
			 tagcon.innerHTML = yfcon.value;					
			 if( aLi.length > 3 ){
				messageList.removeChild(messageList.lastChild);
			}
			timer =	setTimeout(function(){					
				box[0].style.transform = "rotateY(0deg)";		
					
			},100);			
			point.innerHTML = "";
			name.value = con.value = "";
			
		}
		
	}	
})
