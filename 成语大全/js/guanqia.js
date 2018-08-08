var IDIOM = new idiomsApp.idioms,
    gametype = GetQueryString("gameType"),
    shutObj,
    STAGE,
    shutTotal=100,//关卡总数
    num = 16,//每页显示关卡
    starShut = 1,//每页开始关卡
    endShut = num,//每页结束关卡
    pandan = true,//判断是否是第一次进来
    fid,
    puid,
    znums,
    uname;


function _jsBridgeReady() {
    //此方法在学习通页面一打开就会自动运行，原理相当于jquery的onready()方法；
    try{
        jsBridge.bind('CLIENT_REFRESH_EVENT', function(object){
            window.location.reload();//这里进行刷新或者其他操作
        });
    }catch(e){}
    try {
        jsBridge.bind('CLIENT_GET_USERINFO', function (object) { //客户端回调，返回给页面用户信息
            fid = object.fid;
            puid = object.puid;
            uname = object.name;
            shutObj = getStage();
            renderShut();
        });
    } catch (e) {
    }
    try {
        jsBridge.bind('CLIENT_LOGIN_STATUS', function (object) {  //客户端回调，通知用户的登录状态
            // alert("是否登录："+object.status);
            if (object.status == 1) {//当前是已经登录的状态
                jsBridge.postNotification("CLIENT_GET_USERINFO", {"accountKey": ""}); //发送给客户端，获取用户信息
            }
        });
    } catch (e) {
    }
    jsBridge.postNotification("CLIENT_LOGIN_STATUS", {"accountKey": ""}); //发送给客户端是否是登录状态
}

//渲染关卡
function renderShut() {
    var ht = "",
        currLiClass = "pass",
        currPClass = "star_3";
    /* num = shutTotal < num ? shutTotal : num;//判断总数是否比一页显示得关卡数还小*/
    if (pandan == true) {
        if(STAGE>shutTotal){
            shutTotal+=shutTotal;
        }
        znums = STAGE % num == 0 ? (STAGE - num) / num : STAGE / num;
        starShut = Math.floor(znums) * num + 1;
        endShut=starShut + num - 1;
        endShut = endShut > shutTotal ? shutTotal : starShut + num - 1;
        /*shutTotal=endShut>=setTotal?(Math.floor(znums)+1)*num:setTotal;*/
        pandan = false;

    }


    $(".shut ul").html('');
    var j=starShut;

    for (var i = starShut; i <= endShut; i++) {
        if(i<STAGE){
            if(shutObj[j - 1].overstage==i){
                currPClass = "star_" + shutObj[j - 1].getstars;
                ht += '<li class=' + currLiClass + ' data-index="' + i + '"><div>' + i + '</div><p class='+currPClass+'></p></li>';
                j+=1;
            }else {
                currPClass="";
                ht += '<li class=' + currLiClass + ' data-index="' + i + '"><div>' + i + '</div><p class='+currPClass+'></p></li>';
                // j+=1;
            }
        }else if(i==STAGE){
            currPClass = "";
            ht += '<li class=' + currLiClass + ' data-index="' + i + '"><div>' + i + '</div><p class=' + currPClass + '></p></li>';

        }else if (i > STAGE) {
            currLiClass = "no_pass";
            currPClass = "";
            ht += '<li class=' + currLiClass + ' data-index="' + i + '"><div>' + i + '</div><p class=' + currPClass + '></p></li>';
        }
    }
    $(".shut ul").append(ht);
    isActive($(".prev"), $(".next"));
    $(".shut li").click(function () {
        var index = $(this).attr("data-index");
        if (index > STAGE) {
            return;
        } else {
            if (gametype == "chengyu001") {
                jsBridge.postNotification('CLIENT_OPEN_URL', {
                    'title': '',
                    'loadType': '1',
                    'webUrl': IDIOM.apphttp + 'tianci.html?stage=' + index,
                    'toolbarType': '0'
                });
            } else if (gametype == "chengyu002") {
                jsBridge.postNotification('CLIENT_OPEN_URL', {
                    'title': '',
                    'loadType': '1',
                    'webUrl': IDIOM.apphttp + 'xiaoxiaole.html?stage=' + index,
                    'toolbarType': '0'
                });
            }
        }
    })
}

//判断左右按钮是否可以点击
function isActive(prev, next) {

    if (endShut >= shutTotal) {
        next.removeClass("next-active");
        next.attr("disabled", true);
    } else {
        next.addClass("next-active");
        next.attr("disabled", false);
    }
    if (starShut <= 1) {
        prev.removeClass("prev-active");
        prev.attr("disabled", true);
    } else {
        prev.addClass("prev-active");
        prev.attr("disabled", false);
    }
}

//获取关卡
function getStage() {
    var obj;
    $.ajaxSetup({cache: false});
    $.ajax({
        type: "get",
        url: IDIOM.http + "/server/apis?cmd=chengyu_getstage&puid=" + puid + "&gametype=" + gametype,
        dataType: "json",
        async: false,
        success: function (data) {
            if(data.rows == undefined){
                STAGE = 1;
            }else{
                var dataLen=data.rows[data.rows.length-1].overstage;
                STAGE = dataLen + 1;
            }
            obj = data;
        },
        error: function () {
            ajaxError();
        }
    });
    return obj.rows;
}

$(".next").click(function () {
    starShut = endShut + 1;
    endShut = (endShut + num) > shutTotal ? shutTotal : (endShut + num);
    renderShut();
});
$(".prev").click(function () {
    endShut = starShut - 1;
    starShut = starShut - num;
    renderShut();
});
$(".back").click(function () {
    jsBridge.postNotification('CLIENT_EXIT_LEVEL', {
        message: '' || ''
    });
})