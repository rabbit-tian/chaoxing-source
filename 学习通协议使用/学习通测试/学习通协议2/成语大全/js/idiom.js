
(function () {
  var idiomsApp = idiomsApp||{};
  var _DEBUG = true;
  var _PRODUCT = !_DEBUG;
    idiomsApp.idioms=function () {
		if(_DEBUG){
			this.apphttp='http://127.0.0.1:63342/成语大全/';
			/*this.apphttp='http://127.0.0.1:63342/项目管理/2018.6.1/成语大全/';*/
			this.http='http://book.jieyueji.cn';
			this.photourl='http://photo.chaoxing.com/p/';
		  //  this.http='http://192.168.101.185:888';
			_that=this;
		}
		if(_PRODUCT){
			this.http='http://book.jieyueji.cn';
			this.photourl='http://photo.chaoxing.com/p/';
			this.apphttp=this.http;
			_that=this;
		}
	
        this.formatDuring=function (mss) {
            var days = parseInt((mss /(1000 * 60 * 60 * 24)).toFixed(2));
            var hours = parseInt(((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toFixed(2));
            var minutes = parseInt(((mss % (1000 * 60 * 60)) / (1000 * 60)).toFixed(2));
            var seconds =parseInt((mss % (1000 * 60)) / 1000);
            if(days>0){
                return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
            }
            else if(hours>0){
                return  hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
            }else if(minutes>0){
                return   minutes + " 分钟 " + seconds + " 秒 ";
            }else {
                return   seconds + " 秒 ";
            }
        };
        this.queryURLParameter=function (url) {
            var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
            url.replace(reg, function () {
                obj[arguments[1]] = arguments[2];
            });
            return obj;
        };
        this.resetBlank=function (arr) {
            var regEx = /\s+/img;
            return arr.replace(regEx, ' ');
        }

        this.timerplay=function(aa){
            var hour=0,minute=0,second= 0;
            hour = Math.floor(aa/(60 * 60));
            minute = Math.floor(aa / 60)-(hour * 60);
            second = Math.floor(aa)-(hour * 60 * 60)-(minute * 60);
            if (hour <= 9) hour = '0' + hour;
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            $('#time .hour').html(hour);
            $('#time .minute').html(minute);
            $('#time .second').html(second);
        }

        /*分享*/
        this.share1=function(aa,bb,cc){
            resUrl=bb;
            var content = {
                "resTitle":aa,
                "resUrl":resUrl,
                "resLogo":_that.apphttp+'images/shareApp.png',
                "resUid":cc,
                "toolbarType":2
            };
            if(resUrl!=null && resUrl!=''){
                jsBridge.postNotification("CLIENT_TRANSFER_INFO", {"cataid": 100000015,"content": content});
            }
        }

    };
    if(window)
        window.idiomsApp = idiomsApp||{};
})(window,undefined);
