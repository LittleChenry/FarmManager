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
	$(".header").height(headerheight);
	$(".menu").height(actualheight - headerheight);
	$(".content").height(actualheight - headerheight);
	$(".accuracy").height(actualheight - headerheight);
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
			ChooseFunction(e.data.index,this);
			$(".content").show();
		});
	})
}

function ChooseFunction(num,e) {
	switch(num){
		case 0:
			invitation(e);
			break;
		default:
			defaultFunction(e);
	}
}