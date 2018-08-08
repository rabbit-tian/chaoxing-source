/**
 * Created by cx on 2018/5/24.
 */
/*初始化*/
var idiom = new idiomsApp.idioms;
var objUrl = idiom.queryURLParameter(window.location.href);
var level=0;//目前到了第几关
var dsqplay=null;
var gems=0;
var intDiff=0//闯关所用的时间(秒数)
var user;  //用户信息对象
var dates;
var rwsecond;//记录时间
var dValue;//时间差距
var starts;
var fid,puid,unmae,uid;
/*添加数据*/
var text=null;
var jlnums=[];
var ttnums=0;
var realanwer=0;
var uncertain="";
var datas;
/*弹出框*/
var ipFont=$("#idiomInfo .font");
var ipPell=$("#idiomInfo .pell");
var ipDiangu=$("#diangu");
var ipChuchu=$("#chuchu");
var ipLizi=$("#lizi");
var arrypli=[];

function _jsBridgeReady(){  //此方法在学习通页面一打开就会自动运行，原理相当于jquery的onready()方法；
    try{
        jsBridge.bind('CLIENT_GET_USERINFO', function(object){ //客户端回调，返回给页面用户信息
                fid=object.fid,
                puid=object.puid,
                uid=object.uid,
                unmae=object.name;
                fn(puid,objUrl.stage);
        });
    }catch(e){}

    try{
        jsBridge.bind('CLIENT_LOGIN_STATUS', function(object){  //客户端回调，通知用户的登录状态
            //alert("是否登录："+object.status);
            if(object.status == 1){//当前是已经登录的状态
                jsBridge.postNotification("CLIENT_GET_USERINFO", {"accountKey":"" } ) ; //发送给客户端，获取用户信息
            }
        });
    }catch(e){}
    jsBridge.postNotification("CLIENT_LOGIN_STATUS", {"accountKey":""} ) ; //发送给客户端是否是登录状态
}
/*加载渲染关卡*/
function fn(puid,mm){
	$.ajaxSetup({cache: false});
    $.ajax({
        type:"get",
        url:idiom.http+'/server/apis?cmd=chengyu_getstage&puid='+puid+'&gametype=chengyu001&t=' + new Date().getTime(),
        dataType:"json",
        async: false,
        success: function (data) {
            if(mm!=1){
                gems=data.score;
                level=mm;
                $(".gemstone").text(gems);
                $(".tit i").text(level);
                rend();
            }
            else{
                level+=1;
                $(".tit i").text(level);
                rend();
            }
        },
        error:function(){
            $(".translucent-bg").show();
            ajaxError("chengyu001");
        }
    });
}
/*计时时间*/
dsqplay=window.setInterval(function(){
    intDiff++;
    idiom.timerplay(intDiff);
},1000)


/*渲染数据*/

function rend(){
    getOneQ(level,function(data){
        dateIn(data);
        dateShow(data);
        datas=data;
        realanwer=data.a;
        fcplay(realanwer);
    });
}
function dateIn(arry){
    for(var i=0;i<arry.q.length;i++){
        $("#idiom_boxs ul li").eq(i).text(arry.q[i]);
        if(arry.q[i]==""){
            jlnums.push(i);
            $("#idiom_boxs ul li").eq(i).addClass("fill")
        }
    }
}
function dateShow(data){
    for(var i=0;i<data.s.length;i++){
        $("#tt_con ul li").eq(i).text(data.s[i]);
    }
    rwsecond=new Date().getTime();
}

$("#tt_con").on("click","ul li",function(){

    if(ttnums>=2||$(this).hasClass("attr")){
        return false;
    }
    else{
        $(this).addClass("attr");
        ttnums++;
        text=$(this).text();
        $("#idiom_boxs ul li").eq(jlnums[ttnums-1]).text(text);
        if($("#idiom_boxs ul li").eq(jlnums[ttnums-1]).text()!=datas.a[jlnums[ttnums-1]]){
            $(".fancy").find(".think").fadeIn();
        }
        if(ttnums==2){
            for(var i=0;i<$("#idiom_boxs ul li").length;i++){
                uncertain+=$("#idiom_boxs ul li").eq(i).text();
            }
            if(uncertain==realanwer){
                dValue=new Date().getTime()-rwsecond;
                clearInterval(dsqplay);
               setTimeout(function(){
                   $("#idiomInfo").fadeIn(400);
                   $(".translucent-bg").fadeIn(400);
                   document.body.scrollTop=0;
                   $("html,body").css({"overflow":"hidden","height":"100%"});
               },700)
            }
        }
    }
    

});
$(".fancy").click(function(){
    uncertain='';
    for(var i=0;i<jlnums.length;i++){
        $("#idiom_boxs ul li").eq(jlnums[i]).text("");
        ttnums=0;
    }
    $("#tt_con ul li").removeClass("attr");
    $(this).find(".think").fadeOut();
});
/*下一题*/
$("#next").on("click",function(){
    hqaj(level,dValue,intDiff,fid,puid,unmae);
});


function fcplay(od){
    for(var u=0;u<idioms.length;u++){
        if(idioms[u].name==od){
            ipDiangu.html(idioms[u].diangu);
            ipChuchu.html(idioms[u].chuchu);
            ipLizi.html(idioms[u].lizi);
            arrypli=idiom.resetBlank(idioms[u].pinyin).split(" ");
            for(var i=0;i<4;i++){
                ipFont.find("li").eq(i).html(idioms[u].name[i]);
                ipPell.find("li").eq(i).html(arrypli[i])
            }
        }
    }
    $("#idiomInfo .merge .content").each(function(){
        if($(this).html()=="NULL"){
            $(this).parent().hide();
        }
    })
}
function hqaj(a,b,c,d,e,f){
    var crc = md5(""+puid+"chengyu0015D)#KD;l324(Dds8_"+a+"");
    if(c>=0&&c<10){
        starts=3;
    }
    else if(c>=10&&c<30){
        starts=2;
    }
    else{
        starts=1;
    }
    $.ajax({
        url:idiom.http+'/server/apis?cmd=chengyu_savestage&fid='+d+'&puid='+e+'&uname='+f+'&gametype=chengyu001&overstage='+a+'&usesecond='+b+'&getstars='+starts+'&score=5&crc='+crc,
        type:"get",
        dataType:"json",
        success: function (data){
            if(data.result == -1){
                nextFc();
            }else if(data.result == 1){
                return;
            }
        },
        error:function() {
            ajaxError();
        },
    })
}

function nextFc(){
    $("#idiomInfo .merge").show();
    $(".fancy .think").hide();
    gems+=5;
    level++;
    $(".tit i").text(level);
    $(".gemstone").text(gems);
    $("#idiomInfo").css({"display":"none"});
    $(".translucent-bg").css({"display":"none"});
    $("html,body").css({"overflow":"visible","height":"auto"});
    ipDiangu.empty();
    ipChuchu.empty();
    ipLizi.empty();
    getOneQ(level,function(data){
        uncertain=""
        jlnums=[];
        $("#idiom_boxs ul li").removeClass("fill");
        $("#tt_con ul li").removeClass("attr");
        ttnums=0;
        rend();
    });
    intDiff=0;
    idiom.timerplay(intDiff);
    dsqplay=window.setInterval(function(){
        intDiff++;
        idiom.timerplay(intDiff);
    },1000)
}

//是否返回提示
$(".head-return").click(function () {
    $(".popup5").removeClass("hide");
    $(".translucent-bg").show();
    document.body.scrollTop=0;
    $("html,body").css({"overflow":"hidden","height":"100%"});
})
//取消
$("#cancel").click(function () {
    $(".popup5").addClass("hide");
    $(".translucent-bg").hide();
    $("html,body").css({"overflow":"visible","height":"auto"});
})





