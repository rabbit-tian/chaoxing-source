var idiom = new idiomsApp.idioms;
var http = idiom.http;
var objUrl = idiom.queryURLParameter(window.location.href);
var dataValue = objUrl.dataValue;

function _jsBridgeReady() {
    /**********搜索成语详情页（search-explain）*****************/
    function addHtml() {
        $(".idiom-pinyin,.idiom-con,.expalin").html('');
        $.ajax({
            type: "post",
            url: http + "/server/apis?cmd=chengyu_search&search=" + dataValue,
            dataType: "json",
            success: function (data) {
                getData(data);
            },
            error: function () {
                ajaxError()
            }
        });
    }
    /*获取数据*/
    function getData(data) {
        var pinyin = idiom.resetBlank(data.rows[0].pinyin).split(" ");
        var words = data.rows[0].name;
        for (var j = 0; j < pinyin.length; j++) {
            $(".idiom-pinyin").append('<li>' + pinyin[j] + '</li>');
            $(".idiom-con").append('<li>' + words[j] + '</li>')
        }
        if (!data.rows[0].diangu || data.rows[0].diangu=="NULL") {
            return;
        } else {
            $(".expalin").append('<div class="diangu ex-list"> <h1>【解释】</h1> <p>' + data.rows[0].diangu + '</p> </div>')
        }
        if(!data.rows[0].chuchu || data.rows[0].chuchu=="NULL"){
            return;
        }else {
            $(".expalin").append('<div class="chuchu ex-list"> <h1>【出处】</h1> <p>' + data.rows[0].chuchu + '</p> </div>')
        }
        if (!data.rows[0].lizi || data.rows[0].lizi=="NULL") {
            return;
        } else {
            $(".expalin").append('<div class="chuchu ex-list"> <h1>【出处】</h1> <p>' + data.rows[0].chuchu + '</p> </div>')
        }
    }
    $(".head-return").on('click', function () {
        jsBridge.postNotification('CLIENT_EXIT_LEVEL', {
            message: '' || ''
        });
    });
    addHtml();
}