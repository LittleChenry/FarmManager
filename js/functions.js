function userInfo() {
	var title = "用户基本信息";
	var tableth = new Array("用户id","服务器id","手机号","注册时间","注册ip","昵称","红包/￥","余额/￥","设置");
	contentMain(title,tableth);
	var pages = '<a class="pages-a"><i class="fa fa-angle-double-left"></i></a>'
		+ '<a class="pages-a current">1</a><a class="pages-a">2</a><span>……</span>'
		+ '<a class="pages-a">100</a><a class="pages-a"><i class="fa fa-angle-double-right"></i></a>'
		+ '<input class="compact" type="text" placeholder="跳转到"><span class="fa fa-hand-o-right"></span>';
	$(".pages").append(pages);
}

function invitation() {
	var title = "邀请统计";
	var tableth = new Array("用户","级数","邀请数/人","有效用户/人","消费总额/￥","应发奖励/￥","应发总奖励/￥");
	contentMain(title,tableth);
	$(".filter span").after('<ul></ul>');
	$(".filter ul").append('<li><span>查询时间范围：<input id="starttime" type="datetime-local" class="" > - <input id="endtime" type="datetime-local" class="" ></span><span>有效消费总额≥<input id="validspending" type="number" class="" value=15></span></li>');
	//$(".filter ul").append('<li><span>有效消费总额≥<input id="validspending" type="number" class="" placeholder="￥"></span></li>');
	$(".filter ul").append('<li><span>有效用户权重= <input id="validuser" type="number" class="" value=1></span><span>消费总额权重= <input id="Totalspending" type="number" class="" value=0></span><span>有效用户递减系数= <input id="validuserreduce" type="number" class="" value=0.6></span><span>消费总额递减系数= <input id="Totalspendingreduce" type="number" class="" value=1></span></li>');
	$("#output").after('<button id="refresh" type="button" class="">刷新数据</button>');
	$("#query").unbind("click").bind("click",function(){
		QueryInvite($("#search").val());
	});
	$("#refresh").unbind("click").bind("click",function(){
		LoadCache();
	});
	//$("#validspending").val(0);
	//$("#validspendingcharge").val(0);
	var currentDate = new Date();
	$("#starttime").val(currentDate.Format("yyyy-MM-dd") + "T00:00");
	$("#endtime").val(currentDate.Format("yyyy-MM-dd") + "T23:59");
}

function charge() {
	var title = "充值统计";
	var tableth = new Array("用户","级数","邀请人数","（邀请人数的）充值人数","充值总金额/￥" );
	contentMain(title,tableth);
	$(".filter span").after('<ul></ul>');
	$(".filter ul").append('<li><span>邀请查询时间范围：<input id="starttime" type="datetime-local" class="" > - <input id="endtime" type="datetime-local" class="" ></span></li>');
	$(".filter ul").append('<li><span>充值查询时间范围：<input id="starttime1" type="datetime-local" class="" > - <input id="endtime1" type="datetime-local" class="" ></span></li>');
	
	$("#output").after('<button id="refresh" type="button" class="">刷新数据</button>');
	$("#query").unbind("click").bind("click",function(){
		QueryCharge($("#search").val());
	});
	$("#refresh").unbind("click").bind("click",function(){
		LoadCache();
	});
	//$("#validspending").val(0);
	//$("#validspendingcharge").val(0);
	var currentDate = new Date();
	$("#starttime").val(currentDate.Format("yyyy-MM-dd") + "T00:00");
	$("#endtime").val(currentDate.Format("yyyy-MM-dd") + "T23:59");
	$("#starttime1").val(currentDate.Format("yyyy-MM-dd") + "T00:00");
	$("#endtime1").val(currentDate.Format("yyyy-MM-dd") + "T23:59");
}
function defaultFunction() {
	var content = $(".content");
	content.html("");
	
}

function contentMain(title,tableth) {
	var content = $(".content");
	content.html("");
	var titlecontent = '<div id="pagetitle" class="subtitle">'+ title +'</div>';
	var advancecontent = '<div class="search-area"><input type="text" id="search" class="" placeholder="输入手机号码，以;分隔"><button id="multiinput" type="button" class="">'
		+ '批量导入</button><button id="advance" type="button" class="">高级选项<i class="fa fa-angle-double-up"></i></button><button id="query" type="button" class="" style="margin-right:40px;">'
		+ '查询结果</button><button type="button" id="output" class="">导出Excel</button><div class="advance-area">'
		+ '<div class="filter"><span>筛选：</span></div><!-- <div class="sort"><span>排序：</span></div> --></div></div>';
	var resultcontent = '<div class="results"><div class="datatable"><div class="pages"></div><div><table class="table" id="table" ><thead><tr>';
	for (var i = 0; i < tableth.length; i++) {
		resultcontent = resultcontent + '<th title='+ tableth[i] +'>'+ tableth[i] +'</th>';
	}
	resultcontent += '</tr></thead></table></div></div></div></div>';
	content.append(titlecontent);
	content.append(advancecontent);
	content.append(resultcontent);	
	actionInit();
}

function actionInit() {
	$("#advance").unbind("click").bind("click",function(){
		$(".advance-area").slideToggle();
		$(this).find("i").toggleClass("fa-angle-double-up fa-angle-double-down");
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
function QueryCharge(phone) {
	if(phone == ""){
		alert("请填写电话号码");
	}
	$("table").css("position","relative");
	$("thead").after("<img id='loadimg' src='../img/load.gif' style='position:absolute;left:45%'/>");
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	var startdate = new Date(starttime);
	var enddate = new Date(endtime);
	starttime = startdate.getTime() / 1000;
	endtime = enddate.getTime() / 1000;
	var startTimeByRecharge = $("#starttime1").val();
	var endTimeByRecharge = $("#endtime1").val();
	var startdate1 = new Date(startTimeByRecharge);
	var enddate1 = new Date(endTimeByRecharge);
	startTimeByRecharge = startdate1.getTime() / 1000;
	endTimeByRecharge = enddate1.getTime() / 1000;
	var info="邀请查询时间范围：" + startdate.Format("yyyy/MM/dd hh:mm") + " - " + enddate.Format("yyyy/MM/dd hh:mm")+"   充值查询时间范围：" + startdate1.Format("yyyy/MM/dd hh:mm") + " - " + enddate1.Format("yyyy/MM/dd hh:mm");
	$.ajax({
		type: "get",
		async: true,
		url: "/recharge",
		data:{
			phone : phone,			
			startTime : starttime,
			endTime : endtime,
			startTimeByRecharge:startTimeByRecharge,
			endTimeByRecharge:endTimeByRecharge
		},
		dataType: "json",
		success: function (data) {
			//console.log(data);
			if(data.success==true){
				CreateChargeTable(data,info);
			}else{
				alert("后台数据处理中，请稍后！");
			}
			//console.log( Object.keys(data.data[0].level).length);
		}
	});
}
function CreateChargeTable(data,info){
	var table=$("table");
	$("#loadimg").remove();
	table.find("tbody").remove();
	var tbody="<tbody>";
	for (var i = 0; i < data.data.length; i++) {	
		if(data.data[i].level==null){
			var tr='<tr><td>'+ data.data[i].phone +'</td><td></td><td></td><td></td><td></td></tr>';
			tbody+=tr;
			continue;
		}
		var len=Object.keys(data.data[i].level).length;
		
		if (len==1) {
			var tr='<tr><td>'+ data.data[i].phone +'</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>';
			tbody+=tr;
		}else{
			var tr='<tr><td rowspan="'+(len-1)+'">'+ data.data[i].phone +'</td>';
			for(var j = 1; j < len; j++){
				var newCustomer = parseInt(data.data[i].level[j].newCustomer);
				var rechargers = parseInt(data.data[i].level[j].rechargers) ;
				var rechargesValues = parseInt(data.data[i].level[j].rechargesValues)/ 100;								
				if(j==1){
					tr += '<td>'+ j +'</td><td>'+ newCustomer +'</td><td>'+ rechargers +'</td><td>'+ rechargesValues +'</td></tr>';
				}else{
					tr='<tr><td>'+ j +'</td><td>'+ newCustomer +'</td><td>'+ rechargers +'</td><td>'+ rechargesValues +'</td></tr>';
				}
				tbody += tr;
			}
		}
	}
	var infotr = '<tr><td colspan="5">' + info + '</td></tr>'
	tbody += infotr;
	tbody += "</tbody>";
	table.append(tbody);
}

function QueryInvite(phone) {
	if ($("#validspending").val() == "" || phone == "") {
		console.log("有空未填");
		return false;
	}
	$("table").css("position","relative");
	$("thead").after("<img id='loadimg' src='../img/load.gif' style='position:absolute;left:45%'/>");
	var list = phone.split(";");
	console.log(list);
	var validspending = parseInt($("#validspending").val()).toFixed(2) * 100;
	
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	var startdate = new Date(starttime);
	var enddate = new Date(endtime);
	var info = "查询时间范围：" + startdate.Format("yyyy/MM/dd hh:mm") + " - " + enddate.Format("yyyy/MM/dd hh:mm") + "，" + "有效消费总额≥" + $("#validspending").val();
	console.log(info);
	starttime = startdate.getTime() / 1000;
	endtime = enddate.getTime() / 1000;
	$.ajax({
		type: "get",
		async: true,
		url: "/statistics",
		data:{
			phone : phone,
			totalConsume : validspending,				
			startTime : starttime,
			endTime : endtime
		},
		dataType: "json",
		success: function (data) {
			//console.log(data);
			if(data.success==true){
				CreateInviteTable(data,info);
			}else{
				alert("后台数据处理中，请稍后！");
			}
			//console.log( Object.keys(data.data[0].level).length);
		}
	});
}


function CreateInviteTable(data,info){
	var table=$("table");
	$("#loadimg").remove();
	table.find("tbody").remove();
	var tbody="<tbody>";
	var total=new Array();
	var validuser = $("#validuser").val()*1.0;
	var Totalspending = $("#Totalspending").val()*1.0;
	var validuserreduce = $("#validuserreduce").val()*1.0;
	var Totalspendingreduce = $("#Totalspendingreduce").val()*1.0;
	for (var i = 0; i < data.data.length; i++) {
		total[i]=0;
		if(data.data[i].level==null){
			var tr='<tr><td>'+ data.data[i].phone +'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
			tbody+=tr;
			continue;
		}
		var len=Object.keys(data.data[i].level).length;
		var newCustomer = parseInt(data.data[i].phone);
		if (len==1) {
			var tr='<tr><td>'+ data.data[i].phone +'</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>';
			tbody+=tr;
		}else{
			var tr='<tr><td rowspan="'+(len-1)+'">'+ data.data[i].phone +'</td>';
			for(var j = 1; j < len; j++){
				var newValidCustomer = parseInt(data.data[i].level[j].newValidCustomer);
				var newTotalConsume = parseInt(data.data[i].level[j].newTotalConsume) / 100;
				var totalCustomer = parseInt(data.data[i].level[j].newCustomer);				
				var redpacket=newValidCustomer*validuser*Math.pow(validuserreduce,j-1)+newTotalConsume*Totalspending*Math.pow(Totalspendingreduce,j-1);
				redpacket=redpacket.toFixed(2)*1.0;
				total[i]+=redpacket;
				if(j==1){
					tr += '<td>'+ j +'</td><td>'+ totalCustomer +'</td><td>'+ newValidCustomer +'</td><td>'+ newTotalConsume +'</td><td>'+ redpacket +'</td><td rowspan="'+(len-1)+'"></td></tr>';
				}else{
					tr='<tr><td>'+ j +'</td><td>'+ totalCustomer +'</td><td>'+ newValidCustomer +'</td><td>'+ newTotalConsume +'</td><td>'+ redpacket +'</td></tr>';
				}
				tbody += tr;
			}
		}//

	}
	var infotr = '<tr><td colspan="7">' + info + "，有效用户权重=" + validuser + "，消费总额权重=" + Totalspending + "，有效用户递减系数=" + validuserreduce + "，消费总额递减系数=" + Totalspendingreduce + '</td></tr>'
	tbody += infotr;
	tbody += "</tbody>";
	table.append(tbody);
	var row=1;
	for (var i = 0; i < data.data.length; i++) {		
		if(i>0){
			if(data.data[i-1].level!=null){
				if(Object.keys(data.data[i-1].level).length==1){
					row+=1;
				}else{
					row+=Object.keys(data.data[i-1].level).length-1;
				}
			}else{
				row+=1;
			}
		}
		if(data.data[i].level==null){
			$("tr:eq("+row+") td:eq(6)").html();
		}else{	
			if(Object.keys(data.data[i].level).length==1){
				$("tr:eq("+row+") td:eq(6)").html(0);
			}else{
				$("tr:eq("+row+") td:eq(6)").html(total[i].toFixed(2));
			}
		}
	}
}

function LoadCache(){
	/*$.ajax({
		type: "post",
		async: true,
		url: "/initCache"
	});*/
}

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