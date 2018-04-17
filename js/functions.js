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
	$(".advance-area").prepend('<div class="param"></div>');
	$(".advance-area").prepend('<div class="param1"></div>');
	
	$(".param1").append('<span>有效消费总额：</span><input id="validspending" type="text" class="" >');
	$(".param1").append('<span>有效消费余额：</span><input id="validspendingcharge" type="text" class="" >');
	$(".param1").append('<span>开始时间：</span><input id="starttime" type="date" class="" >');
	$(".param1").append('<span>结束时间：</span><input id="endtime" type="date" class="" >');
	$(".param").append('<span>用户总数权重：</span><input id="totaluser" type="text" class="" >');
	$(".param").append('<span>有效用户权重：</span><input id="validuser" type="text" class="" >');
	$(".param").append('<span>充值总额权重：</span><input id="Totalrecharge" type="text" class="" >');
	$(".param").append('<span>消费总额权重：</span><input id="Totalspending" type="text" class="" >');
	$(".param").append('<span>消费充值总额权重：</span><input id="Totalspendingcharge" type="text" class="" >');
	$(".param").append('<button id="submit" type="button" class="">提交</button>');
	$("#output").after('<button id="refresh" type="button" class="">刷新数据</button>');
	$("#query").unbind("click").bind("click",function(){
		queryinvite($("#search").val());
	});	
	$("#submit").unbind("click").bind("click",function(){
		submitparam();
	});
	
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
		+ '批量导入</button><button id="advance" type="button" class="">高级选项</button><button id="query" type="button" class="">'
		+ '查询结果</button><button type="button" id="output" class="">导出Excel</button><div class="advance-area">'
		+ '<div class="filter"><span>筛选：</span></div><div class="sort"><span>排序：</span></div></div></div>';
	var resultcontent = '<div class="results"><div class="datatable"><div class="pages"></div><div><table class="table" id="table" ><tr>';
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
	$("#output").unbind("click").bind("click",function(){
		tableToExcel("table");
	});
}

function queryinvite(phone){
	var list=phone.split(";");	
	var validspending=$("#validspending").val();
	var validspendingcharge=$("#validspendingcharge").val();
	var totaluser=$("#totaluser").val();
	var validuser=$("#validuser").val();
	var starttime=$("#starttime").val();
	var endtime=$("#endtime").val();
	alert(starttime);
	var startdate=new Date(starttime);
	var enddate=new Date(endtime);
	starttime=startdate.getTime()/1000;
	endtime=enddate.getTime()/1000;
	var Totalrecharge=$("#Totalrecharge").val();
	var Totalspending=$("#Totalspending").val();
	var Totalspendingcharge=$("#Totalspendingcharge").val();
	console.log(list);
	// $.ajax({
	// 		type: "get",
	// 		async: false,
	// 		url: "/invite/redEnvelope",
	// 		data:{
	// 			phone:phone,
	// 			totalConsume:validspending,
	// 			chargeConsume:validspendingcharge,
	// 			startTime:starttime,
	// 			endTime:endtime
	// 		},
	// 		dataType: "json",
	// 		success: function (data) {
	// 			// var table=$("table");
	// 			// var tbody="<tbody>";
	// 			// for (var i = 0; i < data.data.length; i++) {
	// 			// 	var tr = '<tr><td>'+i+'</td><td>'+ data.data[i].total +'</td><td>'+data.data[i].valid+'</td><td></td><td></td></tr>'
	// 			// 	tbody += tr;
	// 			// }
	// 			// tbody += "</tbody>";
	// 			// table.append(tbody);
	// 			alert(data.data);
	// 		}
	// 	});
}

// function submitparam(){	
// 	var validspending=$("#validspending").val();
// 	var validspendingcharge=$("#validspendingcharge").val();
// 	var totaluser=$("#totaluser").val();
// 	var validuser=$("#validuser").val();
// 	var starttime=$("#starttime").val();
// 	var endtime=$("#endtime").val();
// 	var Totalrecharge=$("#Totalrecharge").val();
// 	var Totalspending=$("#Totalspending").val();
// 	var Totalspendingcharge=$("#Totalspendingcharge").val();
// 	$.ajax({
// 			type: "get",
// 			async: false,
// 			url: "/invite/ ",
// 			data:{
// 				totalConsume:validspending,
// 				chargeConsume:validspendingcharge,
// 				startTime:starttime,
// 				endTime:endtime				
// 			},
// 			dataType: "json",
// 			success: function (data) {
// 				alert("提交成功");
// 			}
// 		});
// }
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" '
    		+'xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook>'
    		+'<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>'
    		+'</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
    format = function(s, c) {
        return s.replace(/{(\w+)}/g,
        function(m, p) { return c[p]; }) }
            return function(table, name) {
                if (!table.nodeType) table = document.getElementById("table")
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
                window.location.href = uri + base64(format(template, ctx))
              }
})();