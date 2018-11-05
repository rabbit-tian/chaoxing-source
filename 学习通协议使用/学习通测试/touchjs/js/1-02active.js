$(function() {
  var onOffTT = true;
  //    如果触发了轮播就禁止页面滑动
  var isSwiper = true;
  // 点赞
  var isZan = false;
  // 切换
  let index = 0;
  // 点击爱心
  var isClick = false;

  $(".heart").on("click", function() {
    if (isClick) {
      $(this)
        .children("img")
        .attr("src", "img/white-heart.png");
      $(this)
        .children("span")
        .text("收藏");
      isClick = false;
    } else {
      $(this)
        .children("img")
        .attr("src", "img/red-heart.png");
      $(this)
        .children("span")
        .text("取消收藏");
      isClick = true;
    }
  });

  // 下拉的显示
  $("#sure").on("click", function() {
    if ($(this).attr("issure") == 1) {
      $(".pull-down").hide();
      $(this).attr("issure", 0);
    } else {
      $(".pull-down").show();
      $(this).attr("issure", 1);
    }
  });
  $(".pull-down").on("click", function() {
    $(".pull-down").hide();
  });

  // 点赞
  $(".dot-good").on("click", function() {
    var num = Number($(this).parents(".part").find('.dot-zan').text());
    if (isZan) {
      $(this)
        .children("img")
        .attr("src", "img/good.png");
      
      $(this).parents(".part").find('.dot-zan').text(num-1);
      isZan = false;
    } else {
      $(this)
        .children("img")
        .attr("src", "img/gooded.png");
      $(this).parents(".part").find('.dot-zan').text(num + 1);
      isZan = true;
    }
  });

  // 切换板块页面

  $(".head-title li").on("click", function() {
    index = $(this).index();
    // 内容切换
    contentSwitch(index);
  });

  /***********   滑动头部切换   **********************/
  let $container = $(".container");

  // 手指按下事件
  let start; // 按下的点
  $container.on("touchstart", function(e) {
    isSwiper = true;
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

  // 如果点击了轮播就不执行切换
  $("body").on("touchstart.isSwiper", ".swiper-container", function(e) {
    isSwiper = false;
  });

 ;

  // 手指抬起事件
  $container.on("touchend", function(e) {
    if (isSwiper) {
      let endX = event.changedTouches[0].pageX;

      if (endX - start.x >= 100) {
        /******   左滑tab切换    *************/

        index--;
        if (index < 0) {
          index = 0;
          return;
        }

        contentSwitch(index); // 切换面板
      } else if (endX - start.x <= -100) {
        /******   右滑tab切换    *************/
        index++;
        if (index > 1) {
          index = 1;
          return;
        }
        contentSwitch(index); // 切换面板
      }
    }
  });

  // 内容切换
  function contentSwitch(index) {
    // 控制搜索框显示 ,切换到作品列表页  隐藏底部
    if (index == 0) {
      $(".head-share").hide();
      $("footer").show();
    } else {
      $(".head-share").fadeIn();
      $("footer").hide();
    }

    // 选中色 红色
    $(".head-title li").removeClass("active");
    $(".head-title li")
      .eq(index)
      .addClass("active");

    // 面板
    $(".panel-sign").hide();
    $(".panel-sign")
      .eq(index)
      .fadeIn();

    var swiper = new Swiper(".swiper-container1", {
      slidesPerView: 3
    });
    var swiper = new Swiper(".swiper-container2", { slidesPerView: 3 });
    // 小红线运动
    $(".line").animate(
      {
        left: index * 1.24 + "rem"
      },
      300
    );
  }

});
