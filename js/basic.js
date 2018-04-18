$(document).ready(function () {
	AdjustPage();
	MenuToggle();
})

window.onresize = function() {
	AdjustPage();
}

function AdjustPage() {
	windowheight = $(window).height();
	windowwidth = $(window).width();
	headerheight = 50;
	actualheight = windowheight > 700 ? windowheight : 700;
	actualwidth = windowwidth > 1200 ? windowwidth : 1200;
	$(".page").width(actualwidth);
	$(".header").height(headerheight);
	$(".menu").height(actualheight - headerheight);
	$(".content").height(actualheight - headerheight);
	$(".search-list").height(actualheight - headerheight - 70);
	$(".page").show();
}

function MenuToggle() {
	$(".menu").find("ul li").each(function(index){
		$(this).unbind("click").bind("click",{index:index},function(e){
			$(".content").hide();
			if (!($(this).hasClass("active"))) {
				$(this).addClass("active").siblings().removeClass("active");
			}
			ChooseFunction(e.data.index);
			$(".content").show();
		});
	})
}

function ChooseFunction(num) {
	switch(num){
		case 0:
			userInfo();
			break;
		case 1:
			invitation();
			break;
		default:
			defaultFunction();
	}
}

$("#input").unbind("click").bind("click",function(){
	var str=$("#numbers").val();
 	str=str.replace(/\n/g, ";").replace(/\r/g, ';');
 	$("#search").val(str);
 	$(".modal").fadeOut();
});

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}