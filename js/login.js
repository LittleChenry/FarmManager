$(document).ready(function () {
	AdjustPage();
})

function AdjustPage() {
	windowheight = $(window).height();
	windowwidth = $(window).width();
	headerheight = 50;
	actualheight = windowheight > 700 ? windowheight : 700;
	actualwidth = windowwidth > 1200 ? windowwidth : 1200;
	$(".page").width(actualwidth);
	$(".header").height(headerheight);
	$(".page").show();
}