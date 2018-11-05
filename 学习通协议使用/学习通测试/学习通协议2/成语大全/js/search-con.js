/**********搜索页（search-con.html）**************/
var idiom = new idiomsApp.idioms;
var http = idiom.http;
var appUrl=idiom.apphttp;
function _jsBridgeReady(){
    $("#search").focus();
    bindIpt($('#search'));
    delIpt($(".search-cancel"));
    delHis($('.delete-history'));
    addHis();
    addHeight();

    function addHis() {
        var his1 = JSON.parse(localStorage.getItem('his'));
        if (his1) {
            for (var h = 0; h < his1.hisList.length; h++) {
                $('.history-list ul').append('<li>' + his1.hisList[h] + '</li>');
            }
            $('.history-list ul li').on('click', function () {
                $('#search').val($(this).text());
                addVal($(this).text());
            })
        } else {
            var his = {
                hisList: []
            };
            localStorage.setItem('his', JSON.stringify(his));
        }
    }
    function bindIpt(ele) {
        ele.bind('input propertychange', function () {
            var serVal = $(this).val();
            if(serVal == ""){
                $(".search-result ul").html('');
                $(".search-history").show();
            }else{
                addVal(serVal);
            }
        });
    }
    /*删除搜索*/
    function delIpt(ele) {
        ele.on('click', function () {
            $("#search").val('');
            $(".search-result ul").html('');
            $(".search-history").show();
        });
    }
    /*删除历史记录*/
    function delHis(ele) {
        ele.on('click', function () {
            $(".history-list ul").html('');
            his = JSON.parse(localStorage.getItem('his'));
            his.hisList.splice(0, his.hisList.length);
            localStorage.setItem('his', JSON.stringify(his));
        });
    }
    /*ajax 获取数据*/
    function addVal(serval) {
        $.ajax({
            type: "post",
            url: http + "/server/apis?cmd=chengyu_search&search=" + serval,
            dataType: "json",
            success: function (data) {
                $(".search-history").hide();
                $(".search-result ul").html('');
                getData1(data);
            },
            error: function () {
                // ajaxError()
            }
        });
    }
    /*添加数据*/
    function getData1(data) {
        if (data.rows) {
            for (var i = 0; i < data.rows.length; i++) {
                $(".search-result ul").append('<li>' + data.rows[i].name + '</li>')
            }
        }
        $(".search-result ul li").on('click', function () {
            var searchCon=encodeURIComponent($(this).text());
            var searchVal = $('#search').val();
            his = JSON.parse(localStorage.getItem('his'));
            if (his.hisList.indexOf(searchVal) <= -1) {
                his.hisList.push(searchVal);
                localStorage.setItem('his', JSON.stringify(his));
            }
            jsBridge.postNotification('CLIENT_OPEN_URL', {'title':'', 'loadType':'1' ,'webUrl':appUrl+"search-explain.html?dataValue=" + searchCon,'toolbarType':'0'})
        })
    }
    function addHeight() {
        var headHead=$(".wrapHead").height();
        var height = screen.height - headHead;

        $(".center").css('margin-top',headHead);
        $('.center').css({'height':height,'overflow':'scroll','-webkit-overflow-scrolling':'touch'});

    }
    $(".head-return").on('click',function () {
        jsBridge.postNotification('CLIENT_EXIT_LEVEL', {
            message: '' || ''
        });
    })

}