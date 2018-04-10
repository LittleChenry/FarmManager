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

