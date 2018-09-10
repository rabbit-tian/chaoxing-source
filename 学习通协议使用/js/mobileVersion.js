/* 解析版本号(用户比较版本) 例: version:3.0.1.2 */
function dealVersion(version) {
    var uaArr = version.split(".");
    var ua = "";
    for (var i = 0; i < uaArr.length; i++) {
        if (uaArr[i].length == 1) {
            ua += ("0" + uaArr[i]);
        } else if (uaArr[i].length == 2) {
            ua += uaArr[i];
        }
    }
    if (ua.length == 2) {
        ua += "000000";
    } else if (ua.length == 4) {
        ua += "0000";
    } else if (ua.length == 6) {
        ua += "00";
    }
    return ua;
}

/* 获取学习通版本号 */
function getXxtVersion() {
    var ua = "";
    if (navigator.userAgent.indexOf("ChaoXingStudy") > -1) {
        ua = navigator.userAgent;
        ua = ua.substring(ua.indexOf("ChaoXingStudy_") + 14);
        ua = ua.substring(ua.indexOf("_") + 1);
        ua = ua.substring(0, ua.indexOf("_"));
    }
    return ua;
}

/* ios版本,返回值为整数 */
var getIOSVersion = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/(iphone|ipod);?/i)) {
        return ua.match(/iphone os ([0-9]+)_/)[1];
    } else if (ua.match(/(ipad);?/i)) {
        return (ua.match(/cpu os ([0-9]+)_/))[1];
    }
};
/* 区分安卓和ios */
var isIos = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/(iphone|ipod|ipad);?/i)) {
        return true;
    }
};
var isIphoneX = function () {
    var isIphone = /iphone/gi.test(navigator.userAgent);
    if (isIphone && (screen.height == 812 && screen.width == 375)) {
        return true;
    }
};

/*这部分是头部加的高度  单位是px*/
if (isIos() && dealVersion(getXxtVersion()) >= dealVersion("3.2.1.0")) {
    if (isIphoneX()) {
        $('.head-signal').height("44px");
        $('.main').css("margin-top", $(".header").height() + 'px');
    } else {
        $('.head-signal').height("20px");
        $('.main').css("margin-top", $(".header").height() + 'px');
    }
}



