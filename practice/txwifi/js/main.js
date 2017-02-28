var initScreen=function(callback){//初始化html  font-size
    //$("html").css("font-size",document.documentElement.clientHeight/document.documentElement.clientWidth<1.5 ? (document.documentElement.clientHeight/603*312.5+"%") : (document.documentElement.clientWidth/375*312.5+"%")); //单屏全屏布局时使用,短屏下自动缩放
    $("html").css("font-size",document.documentElement.clientWidth/375*312.5+"%");//长页面时使用,不缩放
    if(callback)callback();
};
/*
* 坚屏帧听 */
function _onorientationchange(e){
    if(window.orientation==90||window.orientation==-90){
        //显示竖屏浏览提示框
        $("#landscape_wrap").css("display", "-webkit-box");
    }else{
        //竖屏下恢复默认显示效果
        var st=setTimeout(initScreen,300);
        $("#landscape_wrap").css("display", "none");
    }
    // _resize(e);
}
/*
* 图片预加载
 * */
var downImg = 0;//已下载数量
var percent = 0;//百分比
var length = 0;
function loadImage() {
    var img = $("body").find("img[loadsrc]");//图片数组
    length = img.length;//图片数量
    for ( var i=0;i<length;i++ ){
        var imgs = new Image();
        var imgDiv = img.eq(i);
        var imgsrc = imgDiv.attr("loadsrc");
        imgs.src = imgsrc;
        if(imgs.complete) {
            imgDiv.attr("src",imgsrc).removeAttr("loadsrc");//有缓存
            imgDown();
        } else {
            imgDiv.attr("src",imgsrc).load(function(){
                $(this).removeAttr("loadsrc");//无缓存
                imgDown();
            });
        }
    }
}
function imgDown() {
    downImg ++;
    percent = parseInt(100*downImg/length);
    //$(".progress").html(percent + '%');
    if ( percent == 100 ) {
        loadend();
    }
}
var p = true;
function play () {
    var video = document.getElementById('video');
    if(p){
        video.play();
        p=false;
        return;
    }
    p=true;
    video.pause();
}
$(function(){
    // loadImage();
    initScreen();
    window.addEventListener("onorientationchange" in window ? "orientationchange":"resize", function(e){
        _onorientationchange(e);
    }, false);
    
})

$('.astronaut').click(function (e) {
    $("#content").css("height","13.34rem");
    $('#t3').show();
    e.preventDefault && e.preventDefault();
    e.returnValue=false;
    e.stopPropagation && e.stopPropagation();
    return false;
});

var sign = false;
function pageController(id,top){
    if(id=="#page1"){
        $(id).css({"-webkit-transition": "top 3s","top":"-0.88rem"});
        // $(id).css("top","-0.88rem");
        // $("#content").css({"-webkit-transition": "top 5s","top": "-31.3rem"});
        $("#content").addClass('page1-content');
       // $("#content").css({"-webkit-transition": "-webkit-transform 5s ease-in","-webkit-transform": "translate3d(0,26.3rem,0)"});

        console.log('1');
        setInterval(function () {
           $('.leaves').css({"top":"2rem","left":".3rem"});
           $('.kite').addClass('animate-top');
           $('.kite2').addClass('animate-top2');
           $('.plane').css({"-webkit-transition": "left ease-in 8s,top ease-in 8s","left":"7.5rem","top":"-3.2rem"});
           $('.plane2').css({"-webkit-transition": "right 6s","right":"7.5rem"});
           //$('.page3 .phone1').addClass('page1-phone');
           $('.page3 .phone1').css({"opacity":"1","-webkit-transition": "top 6s","top":"6.4rem"});
           $('.page3 .text').css({"-webkit-transition": "opacity 16s","opacity":"1"});
        },1000/8);
        setTimeout(function () {
            $('#page4').css({"opacity":"1"});
            $('#page3').css({"display":"none"});
        },6000)
    }else if(id=="#page3"){
        console.log('3');
        // $('#page3').css({"top":"-0.88rem"});
        $('.page3 .phone1').css({"-webkit-transition": "top 12s","top":"-13.4rem"});
        $("#content").css({"-webkit-transition": "top 4s","top": "-17.96rem"});
    }else if(id == "#page4"&&sign){
        console.log('2');
        $("#content").removeClass('page2-content').addClass('page3-content');
        //$("#content").css({"-webkit-transition": "top 2s","top": "0"});
        $('.astronaut').css({"-webkit-transition": "right 5s,bottom 5s","right":"2rem","bottom":"5rem"}).addClass('animate-t3');
        //alert();
    }else if(id == "#page4"){
        console.log('4');
        $("#content").removeClass('page1-content').addClass('page2-content');

        $('.page4 .astronaut').css({"-webkit-transition": "left 3s,bottom 3s","left":"0.4rem","bottom":"-0.8rem"});
        $('.airship').css({"-webkit-transition": "right 3s,top 3s","right":".2rem","top":"6.5rem"});
        //$("#content").css({"-webkit-transition": "top 8s","top": "-9.69rem"}).removeClass('page1-content');
        $('#page4').css({"-webkit-transition": "top 5s","top":"-0.2rem"});
        sign = true;
    }
}

/* phone change position and background*/
$('#phone').click(function(){
    $(this).addClass('page1-phone');
});