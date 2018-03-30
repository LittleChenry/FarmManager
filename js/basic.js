$(document).ready(function () {
	AdjustPage();
	
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
	$(".search-list").height(actualheight - headerheight - 100);
	$(".page").show();
}