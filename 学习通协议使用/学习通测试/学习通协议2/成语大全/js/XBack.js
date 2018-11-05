XBack = {};

(function (XBack) {
    XBack.STATE = 'x - back';
    XBack.element;

    XBack.onPopState = function (event) {
        event.state === XBack.STATE && XBack.fire();
        XBack.record(XBack.STATE); //初始化事件时，push一下  
    };

    XBack.record = function (state) {
        history.pushState(state, null, location.href);
    };

    XBack.fire = function () {
        var event = document.createEvent('Events');
        event.initEvent(XBack.STATE, false, false);
        XBack.element.dispatchEvent(event);
    };

    XBack.listen = function (listener) {
        XBack.element.addEventListener(XBack.STATE, listener, false);
    };

    XBack.init = function () {
        XBack.element = document.createElement('span');
        window.addEventListener('popstate', XBack.onPopState);
        XBack.record(XBack.STATE);
    };

})(XBack); // 引入这段js文件  

XBack.init();
XBack.listen(function() {});

/*两种方法，上边这种是知识挑战游戏用到的，下边是在网上搜到的*/

//禁止手机返回键
/*$(document).ready(function() {
 if (window.history && window.history.pushState) {
 $(window).on('popstate', function () {
 window.history.pushState('forward', null, '#');
 window.history.forward(1);
 });
 }
 window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
 window.history.forward(1);
 });*/