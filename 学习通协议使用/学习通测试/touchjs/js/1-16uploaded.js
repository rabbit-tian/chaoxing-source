$(function() {
  //  ios中 处理 fixed 定位
  windowInnerHeight = window.innerHeight; //获取当前浏览器窗口高度
  $(window).resize(function() {
    if (window.innerHeight < windowInnerHeight) {
      $(".footer").css({
        position: "absolute",
        color: "red"
      });
    } else {
      $(".footer").css({
        position: "fixed",
        color: "green"
      });
    }
  });


  // 删除图片
  $(".img-cancel").on("click", function() {
    $(this)
      .parents("li")
      .remove();
  });

  // 删除整个图片框
  $(".delete").on("click", function() {
    $(this)
      .parents(".upload-img")
      .remove();
  });

  // 点击编辑内容
  var isClick = false;
  $("#hand").on("click", function() {
    if (isClick) {
      $(".compile").css({ backgroundColor: "#fff" });
      isClick = false;
     
    } else {
      $(".compile").css({ backgroundColor: "#f1f1f1" });
      $(this).hide();
      $(".handle-box").show();
      $(".text-comp").css({
        paddingLeft: '.3rem',
        paddingRight: '.3rem',
      })
      $('footer').hide();
      $(".compile").attr("readonly", false);
      isClick = true;
    }
  });

  // 确定和删除按钮
  $("#sure").on("click", function() {
    $("#hand").show();
    $('footer').show();
    $(".handle-box").hide();
    $(".compile").css({ backgroundColor: "#fff" });
    $(".text-comp").css({
      paddingLeft: 0,
      paddingRight: 0
    });
    $(".compile").attr("readonly", true);
    isClick = false;
  });

  $("#delete").on("click", function() {
    $(".upload-text").remove();
  });
});
