$(function () {

  $(".tabs li").on("click", function() {
    index = $(this).index();
    $(".tabs li").removeClass("active");
    $(".tabs li")
      .eq(index)
      .addClass("active");
    // 小红线运动
    $(".line").animate({ left: index * 2.5 + ('rem')}, 300);

    // 切换面板
    $(".panel")
      .eq(index)
      .show()
      .siblings(".panel")
      .hide();
  });

  // 视频切换wifi
  $(".btns li").on('click',function () {
    $(this).addClass('active').siblings('li').removeClass('active');
  });


  // 视频
  var videoObject = {
    container: '.videosamplex',//“#”代表容器的ID，“.”或“”代表容器的class
    variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
    poster: '../images/video_poster.png',
    mobileCkControls: true,//是否在移动端（包括ios）环境中显示控制栏
    mobileAutoFull: false,//在移动端播放后是否按系统设置的全屏播放
    h5container: '#videoplayer',//h5环境中使用自定义容器
    video: 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4'//视频地址
  };
  var player = new ckplayer(videoObject);






  // var player = videojs('my-player');
  
  // player.on('pause', function () {
  //   $('.vjs-big-play-button').show();
  // })
  // player.on('play', function () {
  //   $('.vjs-big-play-button').hide();
  // })

  // var myPlayer = document.getElementById("my-player");
  // myPlayer.addEventListener('touchstart',function (e) {
  //   player.pause();
  //   }
  // })



  
  

  // 轮播
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 'auto',
  });
})