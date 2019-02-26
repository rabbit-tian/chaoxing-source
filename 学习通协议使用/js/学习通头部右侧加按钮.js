jsBridge.postNotification('CLIENT_CUSTOM_MENU',
    {index:0,show:1,icon:'https://z.chaoxing.com/mobile/images/share.png',menu:'',
        option:'share();'});
function share(){
    //转发网页
    var resUrl = "";
    var resUid = '';
    var content = {
        "resTitle":"",
        "resUrl":resUrl,
        "resLogo":'',
        "resUid":resUid,
        "toolbarType":2
    };
    if(resUrl!=null && resUrl!=''){
        jsBridge.postNotification("CLIENT_TRANSFER_INFO", {"cataid": 100000015,"content": content});
    }
}