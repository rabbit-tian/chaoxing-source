/*
 v0.1 ashan
 成语抽题，包含成语填空和成语消消乐两种方式
 */
var qidx = 0;
var idioms = [];//所有取到的成语，含解释
var question = [];//成语数组
function getIdioms(stage, fn){
    $.ajax({
        type:"get",
        url:"/server/apis?cmd=chengyu_chuti&stage=" + stage + "&t=" + new Date().getTime(),
        dataType:"json",
        success: function (data) {
            idioms = idioms.concat(data.rows);
            $.each(data.rows, function(idx, item){
                question.push(item.name);
            });
            return fn && fn(stage);
        },
        error:function(){
            return;
        }
    });
}
function getOneQ(stage,fn){
    if(qidx >= question.length){
        getIdioms(stage, function(stage){
            return getOneQ(stage,fn);
        });
    }else {
        var a1 = Math.floor(Math.random() * 3), b1 = Math.floor(Math.random() * 3);
        while (b1 == a1) {
            b1 = Math.floor(Math.random() * 3);
        }
        var a = question[qidx];
        var q = a.split("");
        var s = question.join("").replace(question[0], "").replace(question[1], "").replace(question[2], "").replace(question[3], "");
        s = shuffle(s.split("")).join("");
        s = s.slice(0, 18) + q[a1] + q[b1];
        q[a1] = q[b1] = "";
        s = shuffle(s.split(""));
        qidx++;
        var a1 = {q: q, a: a, s: s};
      //console.log(a1);
        return fn({q: q, a: a, s: s});

    }
}
function getOneP(stage,fn){
    if(qidx >= question.length){
        getIdioms(stage, function(stage){
            return getOneP(stage,fn);
        });
    }else {
        var qnum = stage > 20 ? 9 : 5, a = [];
        for(var i=0;i<qnum;i++,qidx++){
            a.push(question[qidx]);
        }
        var s = a.join("");
        s = shuffle(s.split(""));

        var a1 = {a: a, s: s};
        // console.log(a1);
        return fn({a: a, s: s});
    }
}
function shuffle(arr) {
    var i,j,temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}