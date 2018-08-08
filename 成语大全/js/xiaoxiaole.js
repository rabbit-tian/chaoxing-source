var IDIOM = new idiomsApp.idioms,
    timerIndex = null,
    intDiff = 0,
    STAGE,//关
    GEMSTONE = 0,
    STAR = 1,
    score = 5,//每关可获得的宝石数
    starTimeArr = [],
    endTimeArr =[],
    times = 0,
    fid,
    puid,
    uid,
    uname;

starTimeArr.push(new Date().getTime());

var promptArr = new Array();//已经提示过的成语数组

function _jsBridgeReady() {
    //此方法在学习通页面一打开就会自动运行，原理相当于jquery的onready()方法；
    try {
        jsBridge.bind('CLIENT_GET_USERINFO', function (object) { //客户端回调，返回给页面用户信息
            fid = object.fid;
            puid = object.puid;
            uname = object.name;
            uid=object.uid;
            setStage();
            //获取成语
            getOneP(STAGE, function (data) {
                initRender(data);
            });
            timerStart();
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

//渲染页面
function initRender(idiomObj) {
    $("#stage").text(STAGE);//设置当前关数
    $("#gemstone").text(GEMSTONE);//设置宝石数量

    var font_list = $(".font-list"),
        fontHtml = "",
        ul_width;
    idiomObj.s.forEach(function (ele) {
        fontHtml += '<li>' + ele + '</li>';
    })
    font_list.html(fontHtml);

    if(STAGE > 20){
        ul_width = 7.3;
    }else{
        ul_width = 6.06;
        $('.center').height(window.innerHeight-$('.top_menu').outerHeight()-$('header').outerHeight());
    }
    font_list.css({"width": ul_width + "rem"});

    //字块点击事件
    $(".font-list li").on('touchstart',function () {
        if ($(this).hasClass("font-active")) {
            $(this).removeClass("font-active");
        } else if ($(this).attr("flag") != "hide") {
            $(this).addClass("font-active");
        }
        var activeArr = $(".font-list li.font-active");
        if ($(".font-list li.font-active").length > 4) {
            $(this).removeClass("font-active");
            return;
        }
        if (activeArr.length == 4) {//选择字块数够4个，判断是否为成语
            var text = $(".error-text");//错误提示
            var str = "";//所选择的四个字
            for (var x = 0, len = activeArr.length; x < len; x++) {
                str += activeArr[x].innerText;
            }
            str = isIdioms(idiomObj.a, str);//判断
            if (str) {
                $(".idiom-list").append('<li onclick="showIdiomInfo(this);">' + str + '</li>');//成语正确，添加到下边
                activeArr
                    .animate({"opacity": 0})
                    .removeClass("font-active")
                    .attr("flag", "hide");
                text.addClass("hide");//隐藏错误提示
                $(".prompt-text").addClass("hide");//隐藏提示
                /*if(true){*/
                if ($(".font-list li[flag=hide]").length == idiomObj.s.length) {//所有成语都消除完毕
                    timerStop();
                    var hh = $('#time .hour').text(),
                        mm = $('#time .minute').text(),
                        ss = $('#time .second').text(),
                        timeText = "", times;
                    timeText += hh == "00" ? "" : hh + "小时";
                    timeText += mm == "00" ? "" : mm + "分";
                    timeText += ss == "00" ? "" : ss + "秒";
                    savaStage(timeText);
                }
            } else {//显示错误提示
                text
                    .removeClass("shake")
                    .removeClass("hide");
                setTimeout(function () {
                    text.addClass("shake")
                }, 1)
            }
        }
    })
}

//判断所选择成语是否正确
function isIdioms(arrA, strQ) {
    var arrQ = strQ.split(""),
        index, newI;
    for (var x = 0, len1 = arrA.length; x < len1; x++) {
        newI = arrA[x];
        for (var i = 0, len = arrQ.length; i < len; i++) {
            index = newI.indexOf(arrQ[i]);
            if (index == -1) {
                break;
            } else {
                newI = newI.substring(0, index) + newI.substring(index + 1, newI.length);
                if (newI == "") {
                    return arrA[x];
                }
            }
        }
    }
    return false;
}

//成语点击弹出详细信息
function showIdiomInfo(ele) {
    timerStop();
    endTimeArr.push(new Date().getTime());
    var idiom_info = $(".idiom-info"),
        translucent = $(".translucent-bg"),
        pinyin;
    for (var i in idioms) {
        if (idioms[i].name == ele.innerText) {
            for (var s in idioms[i].name) {
                $(".font li")[s].innerText = idioms[i].name[s];
                if (s == idioms[i].name.length - 1) {
                    break;
                }
            }
            pinyin = idioms[i].pinyin.ResetBlank().split(" ");
            for (var p in pinyin) {
                $(".pinyin li")[p].innerText = pinyin[p];
            }
            $(".idiom-info #jieshi").text(idioms[i].diangu);
            $(".idiom-info #chuchu").text(idioms[i].chuchu == "NULL" ? "" : idioms[i].chuchu);
            $(".idiom-info #lizi").text(idioms[i].lizi == "NULL" ? "" : idioms[i].lizi);
            translucent.removeClass("hide");
            idiom_info.removeClass("hide");
            $("html,body").css("overflow", "hidden");
            document.documentElement.scrollTop = 0;//回到页面顶部
            break;
        }
    }
    translucent.unbind('click').click(function () {
        starTimeArr.push(new Date().getTime());
        $(".info .content").text("");
        $(this).addClass("hide");
        idiom_info.addClass("hide");
        $("html,body").css("overflow", "auto");
        timerStart();
    })
}

//更新宝石数量
function updateGemstone(num) {
    var gemstone = $("#gemstone");
    var crc = md5(puid + "chengyu002" + score + "D)#KD;l324(Dds8_" + STAGE);
    if ((parseInt(gemstone.text()) + num) < 0) {
        $(".popup3").removeClass("hide");
        $(".translucent-bg").removeClass("hide");
        $("html,body").css("overflow", "hidden");
        return false;
    } else {
        $.ajax({
            type: "get",
            url: IDIOM.http + "/server/apis?cmd=chengyu_changescore&puid=" + puid
            + "&gametype=chengyu002&scorechange=" + num + "&remark=" + "" + "&crc=" + crc,
            dataType: "json",
            success: function (data) {
                if (data.total != -1) {
                    ajaxError();
                }
            },
            error: function () {
                ajaxError("chengyu002");
            }
        })
        GEMSTONE = parseInt(gemstone.text()) + num;
        gemstone.text(GEMSTONE);
        return true;
    }
}

//保存关卡
function savaStage(timeText) {
    endTimeArr.push(new Date().getTime());
    starTimeArr.forEach(function(ele, index){
        times += endTimeArr[index]-ele;
    })
    STAR = setStar(times);
    GEMSTONE = parseInt(GEMSTONE) + 5;
    var crc = md5(puid + "chengyu002" + score + "D)#KD;l324(Dds8_" + STAGE);
    $.ajax({
        type: "get",
        url: IDIOM.http + "/server/apis?cmd=chengyu_savestage&fid=" + fid + "&puid=" + puid + "&uname=" + uname
        + "&gametype=chengyu002&overstage=" + STAGE + "&usesecond=" + times + "&getstars=" + STAR + "&score=" + score + "&crc=" + crc,
        dataType: "json",
        success: function (data) {
            if (data.result == -1) {
                STAGE = parseInt(STAGE) + 1;
                sessionStorage.setItem("stage", STAGE);
                sessionStorage.setItem("gemstone", GEMSTONE);
                $(".popup2 #useTime").text(timeText);
                $(".popup2 .star").addClass("star" + STAR);
                $(".popup2").removeClass("hide");
                $(".translucent-bg").removeClass("hide");
                $("html,body").css("overflow", "hidden");
                document.documentElement.scrollTop = 0;//回到页面顶部
                if (STAR > 2) {
                    $(".popup2 .star").css("transform", "scale(2)");
                    window.setTimeout(function () {
                        $(".popup2 .star").css("transform", "scale(1)");
                    }, 400);
                }
            } else if (data.result == 1) {
                ajaxError();
            }
        },
        error: function () {
            ajaxError("chengyu002");
        }
    })
}

//关卡评星
function setStar(times) {
    if (times <= 60000) {
        return 3;
    }
    if (60000 < times && times <= 180000) {
        return 2;
    }
    if (times > 180000) {
        return 1;
    }
}

//设置关卡
function setStage() {
    GEMSTONE = sessionStorage.getItem("gemstone");
    STAGE = sessionStorage.getItem("stage");
    var urlStage = GetQueryString("stage");
    if (urlStage != null) {
        if (GEMSTONE == null) {
            getStage();
        }
        STAGE = urlStage;
        return;
    }
    if (STAGE == null) {
        getStage();
    }
}

//获取关卡信息
function getStage() {
    $.ajax({
        type: "get",
        url: IDIOM.http + "/server/apis?cmd=chengyu_getstage&puid=" + puid + "&gametype=chengyu002",
        dataType: "json",
        async: false,
        success: function (data) {
            // alert(JSON.stringify(data));
            STAGE = data.total == 0 ? 1 : data.rows[data.rows.length - 1].overstage + 1;
            GEMSTONE = data.score == undefined ? 0 : data.score;
        },
        error: function () {
            ajaxError("chengyu002");
        }
    });
}

//重新加载页面
function resetPage() {
    window.location.href = "xiaoxiaole.html";
    $(".popup2 .star").attr("class", "star");
}

//计时开始
function timerStart(){
    /*计时时间*/
    timerIndex = null;
    timerIndex = window.setInterval(function () {
        intDiff++;
        IDIOM.timerplay(intDiff);
    }, 1000)
}
//计时停止
function timerStop(){
    timerIndex = window.clearInterval(timerIndex);
}
var translucent = $(".translucent-bg");//蒙层

//提示按钮点击事件
$(".prompt-button").click(function () {
    translucent.removeClass("hide");
    $(".popup1").removeClass("hide");
    $("html,body").css("overflow", "hidden");
    document.documentElement.scrollTop = 0;//回到页面顶部
})

//不用提示
$(".no-button").click(function () {
    $(".popup1").addClass("hide");
    translucent.addClass("hide");
    $("html,body").css("overflow", "auto");
})

//使用提示
$(".use-button").click(function () {
    $(".popup1").addClass("hide");
    translucent.addClass("hide");
    $("html,body").css("overflow", "auto");
    $(".error-text").addClass("hide");
    var idiomList = $(".idiom-list li"),
        flag;
    for (var i in idioms) {
        flag = true
        for (var x = 0; x < idiomList.length; x++) {
            if (idioms[i].name == idiomList[x].innerText) {
                flag = false;
                break;
            }
        }
        for (var w in promptArr) {
            if (idioms[i].name == promptArr[w]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            if (updateGemstone(-3)) {
                $(".prompt-text")
                    .text("【提示】" + idioms[i].diangu)
                    .removeClass("hide");
                promptArr.push(idioms[i].name);
                return;
            } else {
                return;
            }
        }
    }
})

//宝石不足抵扣提示
$("#errSure").click(function () {
    $(".popup3").addClass("hide");
    $(".translucent-bg").addClass("hide");
    $("html,body").css("overflow", "auto");
})

//重置本关
$(".reset-button").click(function () {
    location.reload();
})

//下一关
$("#nextStage").click(resetPage);

//是否返回提示
$(".head-return").click(function () {
    $(".popup5").removeClass("hide");
    $(".translucent-bg").removeClass("hide");
    document.body.scrollTop=0;
    $("html,body").css({"overflow":"hidden","height":"100%"});
})

//取消
$("#cancel").click(function () {
    $(".popup5").addClass("hide");
    $(".translucent-bg").addClass("hide");
    $("html,body").css({"overflow":"visible","height":"auto"});
})






