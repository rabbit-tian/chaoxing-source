$(function () {
    // 创建
    $(".add").on('click',function () {
        $(".mark").fadeIn();
        $(".pai").fadeIn();
        // 禁止鼠标滚动
        stopScroll(); 
    })

    $(".pai-cancel").on('click',function () {
        $(".mark").hide();
        $(".pai").hide();
        // 允许滚动
        goScroll();
    })


    // 禁止鼠标滚动
    function stopScroll() {
        $("document").on("touchmove", "no", function (e) {
            e.preventDefault();
        });

        $("body").css({ overflow: "hidden" });
    }

    // 允许滚动
    function goScroll() {
        $("document").off("touchmove", "no", function (e) {
            e.preventDefault();
        });
        $("body").css({ overflow: "auto" });
    }

});