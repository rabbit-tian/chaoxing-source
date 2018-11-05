/**
 * json格式字符串转化为json对象
 * @param str
 * @returns
 */
function str2JSON(str){    
	var json = eval('(' + str + ')');    
	return json;    
}
/**
 * json格式字符串转化为json对象
 * @param str
 * @returns
 */
function JSON2Str(json){
	if(typeof json == 'object'){
		if(json instanceof Array){
			var arr = [];
			for (var i in json){
				arr.push(JSON2Str(json[i]));
			}
			return "["+arr.join(",")+"]";
		}else{
			var arr = [];
			for (var i in json){
				arr.push(i+":"+JSON2Str(json[i]));
			}
			return "{"+arr.join(",")+"}";
		}
	}else{
		if(typeof json=='number'){
			return json;
		}else{
			return "'"+json+"'";
		}
	}
}
/**
 * 用户个人配置页面
 */
function set(title,webUrl){
	
//	jQuery.ajax({
//		type : "get",
//		url : "/mobileActivity/setsession",
//		dataType : "json",
//		async:false,
//		success : function(data) {
//		}
//	});
	
	if($.trim(webUrl).indexOf("http://")==0||$.trim(webUrl).indexOf("https://")==0){
		
	}else{
		webUrl = "http://"+document.domain+webUrl;
	}
	if(webUrl.indexOf("getactivitybook")!=-1){
		jsBridge.postNotification('CLIENT_OPEN_URL',{"title": title, "loadType": 1, "webUrl": webUrl,toolbarType:"0"});
	}else{
		jsBridge.postNotification('CLIENT_OPEN_URL',{"title": title, "loadType": 1, "webUrl": webUrl,toolbarType:"1"});
	}
}
/**
 * 协议打开替换普通a连接方式
 */
openA = set;
$(document).ready(function(){
	/**
	 * 当页面提供了.pullUp>.pullUpIcon加载标记时，页面滑动到底端就开始使用定义的getData加载数据
	 * 1.显示加载中的标记；
	 * 2.调用getData()加载数据：若成功需要隐藏加载中的标记，若未定义getData()将会自动影藏加载标记，
	 * 			若加载数据失败需要自处理。
	 */
	
	if($(".pullUp>.pullUpIcon").length>=1){
		$(window).scroll(function() {  
	        var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();  
	        var positionValue = (scrollTop + windowHeight) - scrollHeight;  
	        if (positionValue >= 0 && scrollTop!=0) {
	        	try{
	        		if($(".pullUp>.pullUpIcon").length==1){
	        			$(".pullUp").show();
	        		}
	        		getData();
	        	}catch(e){
	        		if($(".pullUp>.pullUpIcon").length==1){
	        			$(".pullUp").hide();
	        		}
	        		console.log("当前没有activity()加载函数");
	        	}
	        }  
	    });  
	}
});

/**
 * 打开课程
 * 
 * @param data
 *            数据
 */
function openres_course(data){
	if(showtips() == 0){
		return;
	}
	jsBridge.postNotification('CLIENT_OPEN_RES',data);
}

/**
 * 打开小组
 */
function opengroup(groupId,groupbbsid){
	jsBridge.postNotification('CLIENT_OPEN_GROUP', {"GroupId":groupId,"Groupbbsid":groupbbsid,"needRecord":""}) ;
}


//a链接的点击事件
function appUrl(title,url){
		if($.trim(url).indexOf("javascript:")==0){
			window.location.href=url;
		}else{
			if($.trim(url).indexOf("http://")==0||$.trim(url).indexOf("https://")==0){
				
			}else{
				url = "http://"+document.domain+url;
			}
			jsBridge.postNotification('CLIENT_OPEN_URL',{"title": title, "loadType": 1, "webUrl": url,toolbarType:"1"});
		}
}

// 显示提示语
function showtips(){
//	var state = getCookie("state");
////	alert("state="+state+"+++"+getCookie("fid"));
//    if (state == "" || state == "0") {
//    	if (getCookie("fid") == "1385"){
//    		return 1;
//    	} else{
//    	   $(".tips").show();
//	       $(".tips").animate({"bottom":"100px"},800,function(){
//	    	   setTimeout(function(){
//	    		   $(".tips").css("display","none");
//	    	   },800);
//	          
//	       });
//	       return 0;
//    	}
//    } else {
//    	return 1;
//    }
	return 1;
}
//function showtips(){
//	var state = getCookie("state");
//    if (state == "" || state == "0") {
//	   $(".tips").show();
//       $(".tips").animate({"bottom":"100px"},800,function(){
//    	   setTimeout(function(){
//    		   $(".tips").css("display","none");
//    	   },800);
//          
//       });
//       return 0;
//    } else {
//    	return 1;
//    }
//}

// 获取cookie
function getCookie(name){
    var value="";
    if (document.cookie.length > 0) {
        var cookieArray=document.cookie.split("; ");
        for(var i=0;i<cookieArray.length;i++){
            var cookie=cookieArray[i].split("=");
            if(cookie[0]==name){
            value=unescape(cookie[1]); 
            }   
        }   
    }
 return value; 
}