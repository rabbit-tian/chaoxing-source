$(function () {
    // 点击查看全部
    $(".opus-mark").on('click',function () {
        $(this).hide();
        $(".opus-text").css({
            overflow:'auto',
            height: 'auto',
        })
    })

    // 点击收起
    $(".up").on('click',function () {
        $(".opus-mark").show();
        $(".opus-text").css({
            overflow: 'hidden',
            height: '3rem',
        })
    })

    // 评论区点击查看全部
    $(".comment-mark").on('click', function () {
        $(this).hide();
        $(this).parents(".second-box").css({
            overflow: 'auto',
            height: 'auto',
        })
    })

    // 点击收起
    $(".upward").on('click', function () {
        $(this).siblings('.comment-mark').show();
        $(this).parents(".second-box").css({
            overflow: 'hidden',
            height: '3rem',
        })
    })

    // 头部查看全部
    // var $hText = $(".opus-text");
    // var $hTarget = $hText.find(".opus-mark");
    // var $hUp = $hText.find(".up");
    // checkAll($hTarget, $hText, $hUp,3);

    // // 评论去查看全部
    // var $commentText = $(".second-box");
    // var $commentTarget = $commentText.find(".comment-mark");
    // var $commentUp = $commentText.find(".upward");
    // checkAll($commentTarget, $commentText, $commentUp,5);


    // 查看全部 小效果
    // function checkAll($target,$text,$up,height) {
    //     // 点击查看全部
    //         $target.on('click', function () {
    //         $target.hide();
    //         $text.css({
    //             overflow: 'auto',
    //             height: 'auto',
    //         })
    //     })

    //     // 点击收起
    //     $up.on('click', function () {
    //         $target.show();
    //         $text.css({
    //             overflow: 'hidden',
    //             height: height + 'rem',
    //         })
    //     })
    // }

    // 点赞
    $('.dot-good').on('click',function () {
        var num = $(this).find('span').text();

        if ($(this).attr('isClick') == 0) {
            $(this).find('img').attr('src','img/white-zan.png');
            $(this).attr("isClick",1);
            num--;
            $(this).find('span').text(num);
        }else{
            $(this).find('img').attr('src', 'img/red-zan.png');
            $(this).attr("isClick",0);
            num++;
            $(this).find('span').text(num);
        }
    })


    // 点击音频播放
    $(".audio-play").on('click', function () {
        if ($(this).attr('isClick') == 0) {
            $(this).attr("src", "img/audio-stop.png");
            $(this).attr("isClick", 1);
        } else {
            $(this).attr("src", "img/audio-play.png");
            $(this).attr("isClick", 0);
        }
    })
})