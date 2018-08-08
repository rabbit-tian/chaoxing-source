
function _jsBridgeReady(){  //此方法在学习通页面一打开就会自动运行，原理相当于jquery的onready()方法；
    try{
        jsBridge.bind('CLIENT_GET_USERINFO', function(object){ //客户端回调，返回给页面用户信息
           var fid=object.fid;
            var puid=object.puid;
            var idiom = new idiomsApp.idioms;
            var http = idiom.http;
            var photourl=idiom.photourl;
            var pageCount=10;
            var toatlPage=null,liFid='';
            var page=1;
            /**********排行****************/
            (function () {
                var searchSort = (function searchSort() {
                    return {
                        init: function () {
                            gameRankings(fid,'chengyu001',$(".my-ranking tbody"),$(".ranking-list tbody"),page);
                            changeRank();
                            returnPre();
                            addHeight();
                            eleSscroll($(".center"));
                        }
                    };
                    function eleSscroll(ele) {
                        ele.scroll(function() {
                            var top = $(this).scrollTop();
                            var height = $(this).height();
                            var scrollHeight = $(this).get(0).scrollHeight;
                            if(scrollHeight <= top+height){
                                $(".pullUp").show();
                                if(page<toatlPage){
                                    page++;
                                    loadMore(fid,'chengyu001', $(".ranking-list tbody"),page)
                                }else {
                                    $(".pullUp").hide();
                                    $(".pullEnd").show();
                                    return;
                                }

                            }
                        })
                    }
                    function addHeight() {
                        var headHead=$(".wrapHead").height();
                        var height = screen.height - headHead;

                        $(".center").css('margin-top',headHead);
                        $('.center').css({'height':height-20,'overflow':'scroll','-webkit-overflow-scrolling':'touch'});
                    }

                    /*返回*/
                    function returnPre(){
                        $(".head-return").on('touchend',function () {
                            jsBridge.postNotification('CLIENT_EXIT_LEVEL', {
                                message: '' || ''
                            });
                        });
                    }
                    /*********排行(search-sort.html)*********/
                    /*切换分类*/
                    function changeRank() {
                        $(".head-ul li").on('touchend',function () {
                            $(".center").animate({'scrollTop':0},0);
                            liFid=$(this).attr('fid');
                            liFid>0?fid=object.fid:fid=-1;
                            gameType=$(".sort-list li.cur").attr('game-type');
                            gameRankings(fid,gameType,$(".my-ranking tbody"),$(".ranking-list tbody"),1);
                            $(this).addClass('cur').siblings().removeClass('cur');
                            $('.sort-list li').removeClass('cur').eq(0).addClass('cur');
                            page=1;
                            eleSscroll($(".center"));
                        });
                        $('.sort-list li').on('touchend',function () {
                            $(".center").animate({'scrollTop':0},0);
                            gameType=$(this).attr('game-type');
                            $(this).addClass('cur').siblings().removeClass('cur');
                            gameRankings(fid,gameType,$(".my-ranking tbody"),$(".ranking-list tbody"),1);
                            page=1;
                            eleSscroll($(".center"));
                        });
                    }
                    /*加载更多*/
                    function loadMore(Fid, gameType, ele2,page) {
                        $.ajax({
                            type: "post",
                            url: http + "/server/apis?cmd=chengyu_top&fid=" + Fid + "&gametype=" + gameType + "&top="+pageCount+"&page="+page+"&puid="+puid,
                            dataType: "json",
                            success: function (data) {
                                toatlPage=data.allPages;
                                var  rankingList = '';
                                for (var i = 0; i < data.rows.length; i++) {
                                    var row = data.rows[i];
                                    // var time = idiom.formatDuring(row.usesecond);

                                    var sto_num = row.scorevalue;
                                    var puid=data.rows[i].puid;
                                    rankingList += ' <tr><td>' +( (i + 1)+(page-1)*pageCount )+ '</td><td><div class="photo"> <img src="'+photourl+puid+"_80"+'" alt="" class="user-photo"></div> </td> <td> <div class="user"> <span class="user-name">' + row.uname + '</span>\n' +
                                        '<span class="get-gemstone"></span><span class="use-time">' + sto_num + '</span></div></td> <td>完成' + row.overstage + '关</td> </tr>'
                                }
                                ele2.append(rankingList);
                                $(".pullUp").hide();
                            },
                            error: function () {
                                ajaxError();
                            }
                        });
                    }
                    /*获取添加*/
                    function gameRankings(Fid, gameType, ele1, ele2,page) {//Fid,gameType
                        $.ajax({
                            type: "post",
                            url: http + "/server/apis?cmd=chengyu_top&fid=" + Fid + "&gametype=" + gameType + "&top="+pageCount+"&page="+page+"&puid="+puid,
                            dataType: "json",
                            success: function (data) {
                                toatlPage=data.allPages;
                                bindHeadHtml(data,ele1);
                                bindHmlt(data,ele2,1);
                            },
                            error: function () {
                                ajaxError();
                            }
                        });
                    }
                    /*绑定数据*/
                    function bindHeadHtml(data,  ele1) {
                        ele1.html('');
                        var myRankingTr = '';
                        if( data.order.orderid!=undefined){
                            myRankingTr = ' <tr><td>' + data.order.orderid + '</td><td><div class="photo"> <img src="'+photourl+data.order.puid+"_80"+'" alt="" class="user-photo"></div> </td> <td> <div class="user"> <span class="user-name">' + data.order.uname + '</span>\n' +
                                '<span class="get-gemstone"></span><span class="use-time">' + data.order.scorevalue + '</span></div></td> <td>完成' + data.order.overstage + '关</td> </tr>';
                        }
                        ele1.html(myRankingTr);
                    }
                    function bindHmlt(data, ele2,page) {
                        ele2.html('');
                        var  rankingList = '';
                        for (var i = 0; i < data.rows.length; i++) {
                            var row = data.rows[i];
                            var time = idiom.formatDuring(row.usesecond);
                            var sto_num = row.scorevalue;
                            var puid=data.rows[i].puid;
                            if (i == 0) {
                                rankingList += ' <tr><td><div class="level level1"></div></td><td><div class="photo"> <div class="king king1"></div> <img src="'+photourl+puid+"_80"+'" alt="" class="user-photo"></div> </td> <td> <div class="user"> <span class="user-name">' + row.uname + '</span>\n' +
                                    '<span class="get-gemstone"></span><span class="use-time">' + sto_num + '</span></div></td> <td>完成' + row.overstage + '关</td> </tr>'
                            } else if (i == 1) {
                                rankingList += ' <tr><td><div class="level level2"></div></td><td><div class="photo"> <div class="king king2"></div> <img src="'+photourl+puid+"_80"+'" alt="" class="user-photo"></div> </td> <td> <div class="user"> <span class="user-name">' + row.uname + '</span>\n' +
                                    '<span class="get-gemstone"></span><span class="use-time">' + sto_num + '</span></div></td> <td>完成' + row.overstage + '关</td> </tr>'
                            } else if (i == 2) {
                                rankingList += ' <tr><td><div class="level level3"></div></td><td><div class="photo"><div class="king king3"></div> <img src="'+photourl+puid+"_80"+'" alt="" class="user-photo"></div> </td> <td> <div class="user"> <span class="user-name">' + row.uname + '</span>\n' +
                                    '<span class="get-gemstone"></span><span class="use-time">' + sto_num + '</span></div></td> <td>完成' + row.overstage + '关</td> </tr>'
                            } else {
                                rankingList += ' <tr><td>' +( (i + 1)+(page-1)*pageCount )+ '</td><td><div class="photo"> <img src="'+photourl+puid+"_80"+'" alt="" class="user-photo"></div> </td> <td> <div class="user"> <span class="user-name">' + row.uname + '</span>\n' +
                                    '<span class="get-gemstone"></span><span class="use-time">' + sto_num + '</span></div></td> <td>完成' + row.overstage + '关</td> </tr>'
                            }
                        }
                        ele2.append(rankingList);
                    }
                })();
                searchSort.init();
            })();
        });
    }catch(e){}
    try{
        jsBridge.bind('CLIENT_LOGIN_STATUS', function(object){  //客户端回调，通知用户的登录状态
            if(object.status == 1){//当前是已经登录的状态
                jsBridge.postNotification("CLIENT_GET_USERINFO", {"accountKey":"" } ) ; //发送给客户端，获取用户信息
            }
        });
    }catch(e){}
    jsBridge.postNotification("CLIENT_LOGIN_STATUS", {"accountKey":""} ) ; //发送给客户端是否是登录状态
    if (navigator.userAgent.toLowerCase().indexOf("android") != -1) {
        jsBridge.postNotification('CLIENT_SHOW_KEYBOARD', {});
    }
}




