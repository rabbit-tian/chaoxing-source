var IOD = new idiomsApp.idioms;

//将所有空格替换为1个空格
String.prototype.ResetBlank = function () {
    var regEx = /\s+/g;
    return this.replace(regEx, ' ');
};

//ajax错误提示
function ajaxError(type) {
    var html = '<div class="popup4 hide">'
                    + '<img class="error" src="images/error.png" alt="">'
                    + '<p class="prompt-text2">请求出错，请重试</p>'
                    + '<div class="btn-box">'
                        + '<div class="button2 btn-yellow" id="back">返回</div>'
                        + '<div class="button2 btn-blue" id="retry">重试</div>'
                    + '</div>'
            + '</div>';
    if($(".translucent-bg").length == 0){
        html += '<div class="translucent-bg hide"></div>';
    }
    $("body").append(html);
    $(".popup4").removeClass("hide");
    $(".translucent-bg").removeClass("hide");
    $("body").css("overflow", "hidden");
    document.documentElement.scrollTop = 0;//回到页面顶部
    $("#back").click(function(){
        jsBridge.postNotification('CLIENT_EXIT_LEVEL', {
            message: '' || ''
        });
    })
    $("#retry").click(function(){
        window.location.href = window.location.href;
    });
}

//超出最大关卡显示弹窗；

function overStep(){
    var Html='<div class="popup6">'
            +'<p class="prompt-text2">棒棒哒！您已完成所有关卡。</p>'
            +'<p class="">是否确定返回？</p>'
            +'<div class="btn-box">'
            +'<div class="button2 btn-yellow" id="btnYellow">取消</div>'
            +'<div class="button2 btn-blue" id="btnBlue">确定</div>'
            +'</div>'
            +'</div>'
    $("body").append(Html);
    $(".popup4").removeClass("hide");
    $(".translucent-bg").show();
    $("body").css("overflow", "hidden");
    document.documentElement.scrollTop = 0;//回到页面顶部

    $("#btnYellow").on("click",function(){
        $(".translucent-bg").hide();
        $(this).parent().parent().hide();
    })
    $("#btnBlue").on("click",function(){
        jsBridge.postNotification('CLIENT_EXIT_LEVEL', {
            message: '' || ''
        });
    })
}

/**
 * @ 功能：获取字符串传参
 * @ 用法：var i = GetQueryString("参数名");
 */
var GetQueryString = function (name) {
//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var reg = new RegExp(name + "=([^&]*)");
    var r = window.location.search.substr(1).match(reg);//其中window可省略
    if (r != null)
        return unescape(r[1]);//unescape可以对通过 escape()编码的字符串进行解码，如未进行escape编码的可省略
    return null;
};

//是否返回弹窗确定按钮
$("#sure").click(function () {
    jsBridge.postNotification("CLIENT_REFRESH_STATUS", {"status":1} );
    jsBridge.postNotification('CLIENT_EXIT_LEVEL', {
        message: '' || ''
    });
})

/*禁止右键点击的默认事件*/
document.onkeydown = function () {
    var e = window.event || arguments[0];
    if (e.keyCode == 123) {
        return false;
    } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
        return false;
    } else if ((e.ctrlKey) && (e.keyCode == 85)) {
        return false;
    } else if ((e.ctrlKey) && (e.keyCode == 83)) {
        return false;
    }
}
document.oncontextmenu = function () {
    return false;
}
