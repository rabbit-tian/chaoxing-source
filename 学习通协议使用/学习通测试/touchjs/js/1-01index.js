$(function () {
    /***********   点击头部切换   **********************/
    let index = 0;
    $(".switch li a").on('click',function () {
        index = $(this).parents('li').index();
        // 内容切换
        contentSwitch(index);
    });


    /***********   滑动头部切换   **********************/
    let $container = $(".container");

    // 手指按下事件
    let start; // 按下的点
    $container.on("touchstart", function(e) {
      let touches = event.touches[0];
      start = { x: touches.pageX, y: touches.pageY };
    });

    // 手指移动事件
    let delta; // 手指移动的距离
    $container.on("touchmove", function(e) {
      let touches = event.touches[0];
      delta = { x: touches.pageX - start.x, y: touches.pageY - start.y };
      // 防止横向位移
      if (Math.abs(delta.x) > Math.abs(delta.y)) {
        event.preventDefault();
      }
    });


    // 手指抬起事件
    $container.on("touchend", function(e) {
        
      let endX = event.changedTouches[0].pageX;

      if (endX - start.x >= 50) {
        /******   左滑tab切换    *************/
        index--;
        if (index < 0) {
            index = 0;
            return;
        };
        contentSwitch(index); // 切换面板

      } else if (endX - start.x <= -50) {
        /******   右滑tab切换    *************/
        index++;
        if (index > 3) {
            index =3;
            return;
        };
        
        contentSwitch(index); // 切换面板
      }
    });



    // 内容切换
    function contentSwitch(index) {
        // 选中色 红色
        $(".switch li a").removeClass('active');
        $(".switch li a").eq(index).addClass("active");

        // 面板
        $(".matter").hide();
        $(".matter").eq(index).fadeIn();

        // 小红线运动
        $(".line").animate({
            left: index * 1.875 + 'rem',
        }, 300)
    }


});