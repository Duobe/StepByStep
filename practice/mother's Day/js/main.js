var initScreen = function(callback) { //初始化html  font-size
    $("html").css("font-size", document.documentElement.clientHeight / document.documentElement.clientWidth < 1.5 ? (document.documentElement.clientHeight / 603 * 312.5 + "%") : (document.documentElement.clientWidth / 375 * 312.5 + "%")); //单屏全屏布局时使用,短屏下自动缩放
    // $("html").css("font-size",document.documentElement.clientWidth/320*62.5+"%");//长页面时使用,不缩放
    if (callback) callback();
};
/*
 * 坚屏帧听 */

function _resize(e){

}

function _onorientationchange(e) {
    if (window.orientation == 90 || window.orientation == -90) {
        //显示竖屏浏览提示框
        $("#landscape_wrap").css("display", "-webkit-box");
    } else {
        //竖屏下恢复默认显示效果
        var st = setTimeout(initScreen, 300);
        $("#landscape_wrap").css("display", "none");
    }
    _resize(e);
}

// next question
function nextQuestion (num,model) {
    if(model==null){
        $('#section'+(num-1)).addClass('transform0');
        $('#section'+num).addClass('transform'+(num-1));
        return;
    }
    $(model).css({display:'none'});
    if(num==1||num==2){
        $('#section'+(num-1)).addClass('transform0');
        $('#section'+num).addClass('transform');
    }else if(num==3){
        $('#section'+(num-1)).addClass('transform0');
        $('#section'+num).addClass('transform'+(num-1));
    }else{
        $('#section'+num).addClass('transform0');
        $('#section'+(num+1)).addClass('transform'+num);
    }
}

function mask(id,num){
	var _date = $("#date1").val();
	if(_date&&num==1){
		_date = _date.split('-');
		var start_T = new Date(2001,01,01).getTime();
		var select_T = new Date(_date[0],_date[1],_date[2]).getTime();
		if(select_T>=start_T){
            $(id).show();
            return;
        }else{
            $('#section1').addClass('transform0');
            $('#section2').addClass('transform');
		}
	}else{
		$(id).show();
	}
}

var _A = 0;
var _B = 0;
var _C = 0;

function result () {
    for(var i=0,len=localStorage.length; i<len;i++){
        if(localStorage.getItem(localStorage.key(i))=='A'){
            _A++;
        }else if(localStorage.getItem(localStorage.key(i))=='B'){
            _B++;
        }else if(localStorage.getItem(localStorage.key(i))=='C'){
            _C++;
        }
    }
    if(_A==0&&_B==5){
        $('#result1').addClass('result_transform1');
    }else if(_A>1&&_A<=2){
        $('#result2').addClass('result_transform2');
    }else if(_A>3&&_A<=4){
        $('#result3').addClass('result_transform3');
    }else if(_A==5){
        $('#result4').addClass('result_transform4');
    }else if(_C>=3){
        $('#result5').addClass('result_transform5');
    }else{
        $('#result6').addClass('result_transform6');
    }
}

function count (question,answer) {
    localStorage.setItem(question,answer);
    // console.log('#section'+question,answer);

    if(question==3||(question==4&&answer!='C')||(question==5&&answer!='C')){
        $('#section'+question).addClass('transform0');
        $('#section'+(question+1)).addClass('transform'+question);
    }else if(answer=='C'){
        console.log('#model'+question);
        if(question>=4){
            $('#model'+(question-1)).show();
        }else{
            $('#model'+question).show();
        }
    }else{
        var question = question+1;
        if(question>6){
            console.log(answer);
            result();return;
        }
        nextQuestion(question,'');
    }
}

function lastSection(section){
	var ts = 'transform'+(section-1);
	if(section==2){
		$('#section1').removeClass('transform0');
		$('#section2').removeClass('transform');
	}else{
		
		$('#section'+section).removeClass(ts);
		$('#section'+(section-1)).removeClass('transform0');	
		console.log('transform'+(section-1))
	}
}

$("li").click(function(){
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
})

$(function() {
    initScreen();
    window.addEventListener("onorientationchange" in window ? "orientationchange":"resize", function(e){
        _onorientationchange(e);
    }, false);

    var $date1 = $("#date1");
    var instance1 = pikadayResponsive($date1);
});

var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
			iPhone: u.indexOf('iPhone') > -1,
			iPad: u.indexOf('iPad') > -1
		};
	}()
};
if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

}
if (browser.versions.android) {

}