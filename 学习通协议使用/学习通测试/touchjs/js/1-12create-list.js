$(function() {
  // 解决ios fixed 失效问题
  windowInnerHeight = window.innerHeight; //获取当前浏览器窗口高度
  $(window).resize(function() {
    if (window.innerHeight < windowInnerHeight) {
      $(".footer").css({
        position: "absolute",
      });
    } else {
      $(".footer").css({
        position: "fixed",
      });
    }
  });

  // 点击删除
  $(".delete").on("click", function() {
    $(this)
      .parents("li")
      .empty();
  });

  // 上拉选择框
  var calendardatetime = new lCalendar();
  calendardatetime.init({
    'trigger': '#trigger1',
    'type': 'datetime'
  });
 
var calendardatetime = new lCalendar();
  calendardatetime.init({
    'trigger': '#trigger2',
    'type': 'datetime'
  });




  // var time = [
  //   {
  //     data: [
  //       { id: "1", value: "2015." },
  //       { id: "2", value: "2016." },
  //       { id: "3", value: "2017." },
  //       { id: "4", value: "2018." },
  //       { id: "5", value: "2019." },
  //       { id: "6", value: "2020." }
  //     ]
  //   },
  //   {
  //     data: [
  //       { id: "1", value: "01." },
  //       { id: "2", value: "02." },
  //       { id: "3", value: "03." },
  //       { id: "4", value: "04." },
  //       { id: "5", value: "05." },
  //       { id: "6", value: "06." },
  //       { id: "7", value: "07." },
  //       { id: "8", value: "08." },
  //       { id: "9", value: "09." },
  //       { id: "10", value: "10." },
  //       { id: "11", value: "11." },
  //       { id: "12", value: "12." },
  //     ]
  //   },
  //   {
  //     data: [
  //       { id: "1", value: "01" },
  //       { id: "2", value: "02" },
  //       { id: "3", value: "03" },
  //       { id: "4", value: "04" },
  //       { id: "5", value: "05" },
  //       { id: "6", value: "06" },
  //       { id: "7", value: "07" },
  //       { id: "8", value: "08" },
  //       { id: "9", value: "09" },
  //       { id: "10", value: "10" },
  //       { id: "11", value: "11" },
  //       { id: "12", value: "12" },
  //       { id: "13", value: "13" },
  //       { id: "14", value: "14" },
  //       { id: "15", value: "15" },
  //       { id: "16", value: "16" },
  //       { id: "17", value: "17" },
  //       { id: "18", value: "18" },
  //       { id: "19", value: "19" },
  //       { id: "20", value: "20" },
  //       { id: "21", value: "21" },
  //       { id: "22", value: "22" },
  //       { id: "23", value: "23" },
  //       { id: "24", value: "24" },
  //       { id: "25", value: "25" },
  //       { id: "26", value: "26" },
  //       { id: "27", value: "27" },
  //       { id: "28", value: "28" },
  //       { id: "29", value: "29" },
  //       { id: "30", value: "30" },
  //       { id: "31", value: "31" }
  //     ]
  //   },
  //   {
  //     data: [
  //       { id: "1", value: "0 :" },
  //       { id: "2", value: "1 :" },
  //       { id: "3", value: "2 :" },
  //       { id: "4", value: "3 :" },
  //       { id: "5", value: "4 :" },
  //       { id: "6", value: "5 :" },
  //       { id: "7", value: "6 :" },
  //       { id: "8", value: "7 :" },
  //       { id: "9", value: "8 :" },
  //       { id: "10", value: "9 :" },
  //       { id: "11", value: "10 :" },
  //       { id: "12", value: "11 :" },
  //       { id: "13", value: "12 :" },
  //       { id: "14", value: "13 :" },
  //       { id: "15", value: "14 :" },
  //       { id: "16", value: "15 :" },
  //       { id: "17", value: "16 :" },
  //       { id: "18", value: "17 :" },
  //       { id: "19", value: "18 :" },
  //       { id: "20", value: "19 :" },
  //       { id: "21", value: "20 :" },
  //       { id: "22", value: "21 :" },
  //       { id: "23", value: "22 :" },
  //       { id: "24", value: "23 :" }
  //     ]
  //   },
  //   {
  //     data: [
  //       { id: "1", value: "01" },
  //       { id: "2", value: "02" },
  //       { id: "3", value: "03" },
  //       { id: "4", value: "04" },
  //       { id: "5", value: "05" },
  //       { id: "6", value: "06" },
  //       { id: "7", value: "07" },
  //       { id: "8", value: "08" },
  //       { id: "9", value: "09" },
  //       { id: "10", value: "10" },
  //       { id: "11", value: "11" },
  //       { id: "12", value: "12" },
  //       { id: "13", value: "13" },
  //       { id: "14", value: "14" },
  //       { id: "15", value: "15" },
  //       { id: "16", value: "16" },
  //       { id: "17", value: "17" },
  //       { id: "18", value: "18" },
  //       { id: "19", value: "19" },
  //       { id: "20", value: "20" },
  //       { id: "21", value: "21" },
  //       { id: "22", value: "22" },
  //       { id: "23", value: "23" },
  //       { id: "24", value: "24" },
  //       { id: "25", value: "25" },
  //       { id: "26", value: "26" },
  //       { id: "27", value: "27" },
  //       { id: "28", value: "28" },
  //       { id: "29", value: "29" },
  //       { id: "30", value: "30" },
  //       { id: "31", value: "31" },
  //       { id: "32", value: "32" },
  //       { id: "33", value: "33" },
  //       { id: "34", value: "34" },
  //       { id: "35", value: "35" },
  //       { id: "36", value: "36" },
  //       { id: "37", value: "37" },
  //       { id: "38", value: "38" },
  //       { id: "39", value: "30" },
  //       { id: "40", value: "40" },
  //       { id: "51", value: "51" },
  //       { id: "55", value: "55" },
  //       { id: "53", value: "53" },
  //       { id: "54", value: "54" },
  //       { id: "55", value: "55" },
  //       { id: "56", value: "56" },
  //       { id: "57", value: "57" },
  //       { id: "58", value: "58" },
  //       { id: "59", value: "59" },
  //       { id: "60", value: "60" }
  //     ]
  //   }
  // ];
  // var mobileSelect1 = new MobileSelect({
  //   trigger: "#trigger1",
  //   title: "开始时间",
  //   wheels: time,
  //   position: [2] //初始化定位 打开时默认选中的哪个  如果不填默认为0
  // });

  // var mobileSelect2 = new MobileSelect({
  //   trigger: "#trigger2",
  //   title: "结束时间",
  //   wheels: time,
  //   position: [2] //初始化定位 打开时默认选中的哪个  如果不填默认为0
  // });
});
