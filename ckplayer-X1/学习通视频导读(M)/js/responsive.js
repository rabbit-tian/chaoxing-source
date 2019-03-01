
(function(){
    var calc = function(){
        var docElement = document.documentElement;
        var clientWidthValue = docElement.clientWidth > 750 ? 750 : docElement.clientWidth;
        docElement.style.fontSize = 100*(clientWidthValue/750) + 'px';
    };
    calc();
    window.addEventListener('resize',calc);
})();
