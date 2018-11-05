$(function () {
    // 头部导航切换
    $(".work-nav .swi-nav").on('click',function () {
        $(".work-nav .swi-nav a").removeClass("active");
        $(this).children('a').addClass('active');
    });

    // 时间顺序切换
    var isClick = false;
    $(".work-nav .time").on('click',function () {
        if (isClick) {            
            $(this).find('img').attr('src','img/first.png');
            isClick = false;
        }else{
            $(this).find('img').attr('src', 'img/last.png');
            isClick = true;
        }
    });

    // 点击音频 切换
    $(".audio-play").on('click',function () {
        if ($(this).attr('isClick') == 0) {
            $(this).attr("src", "img/audio-stop.png");
            $(this).attr("isClick",1);
        }else{
            $(this).attr("src", "img/audio-play.png");
            $(this).attr("isClick", 0);
        }
    })


    // 爱心收藏
    $('.heart2').on('click', function () {
        var num = $(this).find('span').text();

        if ($(this).attr('isClick') == 0) {
            $(this).find('img').attr('src', 'img/bot-heart.png');
            $(this).attr("isClick", 1);
            num--;  
            $(this).find('span').text(num);
        } else {
            $(this).find('img').attr('src', 'img/red-heart.png');
            $(this).attr("isClick", 0);
            num++;
            $(this).find('span').text(num);
        }
    });

    // 爱心收藏
    $('.dot-good').on('click', function () {
        var num = $(this).find('span').text();

        if ($(this).attr('isClick') == 0) {
            $(this).find('img').attr('src', 'img/bot-good.png');
            $(this).attr("isClick", 1);
            num--;
            $(this).find('span').text(num);
        } else {
            $(this).find('img').attr('src', 'img/red-zan.png');
            $(this).attr("isClick", 0);
            num++;
            $(this).find('span').text(num);
        }
    });
    
})
