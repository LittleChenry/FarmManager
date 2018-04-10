function userInfo() {
	var title = "用户基本信息";
	var tableth = new Array("用户id","服务器id","手机号","注册时间","注册ip","昵称","红包","余额","设置");
	contentMain(title,tableth);
	var pages = '<a class="pages-a"><i class="fa fa-angle-double-left"></i></a>'
		+ '<a class="pages-a current">1</a><a class="pages-a">2</a><span>……</span>'
		+ '<a class="pages-a">100</a><a class="pages-a"><i class="fa fa-angle-double-right"></i></a>'
		+ '<input class="compact" type="text" placeholder="跳转到"><span class="fa fa-hand-o-right"></span>';
	$(".pages").append(pages);
}

function invitation() {
	var title = "邀请统计";
	var tableth = new Array("层级","邀请数","有效客户","已奖励数","操作");
	contentMain(title,tableth);
	$("#multiinput").attr("disabled",true);
	$("#advance").attr("disabled",true);
}

function defaultFunction() {
	var content = $(".content");
	content.html("");
	
}

function contentMain(title,tableth) {
	var content = $(".content");
	content.html("");
	var titlecontent = '<div id="pagetitle" class="subtitle">'+ title +'</div>';
	var advancecontent = '<div class="search-area"><input type="text" id="search" class=""><button id="multiinput" type="button" class="">'
		+ '批量导入</button><button id="advance" type="button" class="">高级选项</button><button type="button" class="">'
		+ '查询结果</button><button type="button" class="">导出Excel</button><div class="advance-area">'
		+ '<div class="filter"><span>筛选：</span></div><div class="sort"><span>排序：</span></div></div></div>';
	var resultcontent = '<div class="results"><div class="datatable"><div class="pages"></div><div><table class="table"><tr>';
	for (var i = 0; i < tableth.length; i++) {
		resultcontent = resultcontent + '<th>'+ tableth[i] +'</th>';
	}
	resultcontent	+= '</tr></table></div></div></div></div>';
	content.append(titlecontent);
	content.append(advancecontent);
	content.append(resultcontent);
	actionInit();
}

function actionInit() {
	$("#advance").unbind("click").bind("click",function(){
		$(".advance-area").slideToggle();
	});
	$("#multiinput").unbind("click").bind("click",function(){
		$(".modal").fadeIn();
	});
	$(".close").unbind("click").bind("click",function(){
		$(this).parents(".modal").fadeOut();
	});
}