function invitation(e) {
	var title = "邀请数";
	var tableth = new Array("账号","昵称","下一级邀请数","总邀请数","邀请详情");
	contentMain(title,tableth);
	
}

function defaultFunction(e) {
	var content = $(".content");
	content.html("");
	
}

function contentMain(title,tableth) {
	var content = $(".content");
	content.html("");
	var accuracy = '<div class="accuracy"><div class="subtitle">查询列表</div><div class="data-area">'
		+ '<textarea class="search-list" placeholder="每行一条数据"></textarea></div></div>';
	var advance = '<div class="advance"><div id="pagetitle" class="subtitle">邀请数</div><div class="filter">'
		+ '<p>筛选：</p></div><div class="sort"><p>排序：</p></div><div class="results"><p>查询结果：</p>'
		+ '<div class="level"><span>全部</span><i class="fa fa-angle-right"></i></div><div class="datatable">'
		+ '<table class="table"><tr>';
	for (var i = 0; i < tableth.length; i++) {
		advance = advance + '<th>'+ tableth[i] +'</th>';
	}
	advance	+= '</tr></table></div></div></div>';
	content.append(accuracy);
	content.append(advance);
	adjustContent();
}

function adjustContent() {
	windowheight = $(window).height();
	actualheight = windowheight > 700 ? windowheight : 700;
	$(".accuracy").height(actualheight - headerheight);
	$(".search-list").height(actualheight - headerheight - 70);
}