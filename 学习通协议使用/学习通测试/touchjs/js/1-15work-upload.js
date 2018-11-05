$(function () {
    // 选择作品组的选择
    $(".grade li").on('click',function () {
        // $(this).attr('isClick',false);
        if ($(this).attr('isClick') == 0) {
            $(this).css({
                backgroundColor: '#fff',
                color: '#2B333B',
            })
            $(this).attr("isClick", 1);
        }else{
            $(this).css({
                backgroundColor: '#116AE4',
                color: '#fff',
            })
            $(this).attr("isClick",0);
        }
    });


    // 选择关联资源 多选的操作
    $(".resource label").on('click',function () {
        if ($(this)
            .find(":checkbox")
            .prop("checked")) {
            $(this)
                .find("img")
                .show();
            $(this).find('.analog').css({ borderColor: "#fff" });
        } else {
            $(this)
                .find("img")
                .hide();
            $(this)
              .find(".analog")
                .css({ borderColor: "#d9dde1" });
        }
    })
});