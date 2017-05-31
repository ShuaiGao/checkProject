var allowpostattach = parseInt('1');

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var is_mac = userAgent.indexOf('mac') != -1;

function AC_GetArgs(args, classid, mimeType) {
	var ret = new Object();
	ret.embedAttrs = new Object();
	ret.params = new Object();
	ret.objAttrs = new Object();
	for (var i = 0; i < args.length; i = i + 2){
		var currArg = args[i].toLowerCase();
		switch (currArg){
			case "classid":break;
			case "pluginspage":ret.embedAttrs[args[i]] = 'http://www.macromedia.com/go/getflashplayer';break;
			case "src":ret.embedAttrs[args[i]] = args[i+1];ret.params["movie"] = args[i+1];break;
			case "codebase":ret.objAttrs[args[i]] = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0';break;
			case "onafterupdate":case "onbeforeupdate":case "onblur":case "oncellchange":case "onclick":case "ondblclick":case "ondrag":case "ondragend":
			case "ondragenter":case "ondragleave":case "ondragover":case "ondrop":case "onfinish":case "onfocus":case "onhelp":case "onmousedown":
			case "onmouseup":case "onmouseover":case "onmousemove":case "onmouseout":case "onkeypress":case "onkeydown":case "onkeyup":case "onload":
			case "onlosecapture":case "onpropertychange":case "onreadystatechange":case "onrowsdelete":case "onrowenter":case "onrowexit":case "onrowsinserted":case "onstart":
			case "onscroll":case "onbeforeeditfocus":case "onactivate":case "onbeforedeactivate":case "ondeactivate":case "type":
			case "id":ret.objAttrs[args[i]] = args[i+1];break;
			case "width":case "height":case "align":case "vspace": case "hspace":case "class":case "title":case "accesskey":case "name":
			case "tabindex":ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];break;
			default:ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
		}
	}
	ret.objAttrs["classid"] = classid;
	if(mimeType) {
		ret.embedAttrs["type"] = mimeType;
	}
	return ret;
}

function AC_FL_RunContent() {
	var ret = AC_GetArgs(arguments, "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
	var str = '';
	if(is_ie && !is_opera) {
		str += '<object ';
		for (var i in ret.objAttrs) {
			str += i + '="' + ret.objAttrs[i] + '" ';
		}
		str += '>';
		for (var i in ret.params) {
			str += '<param name="' + i + '" value="' + ret.params[i] + '" /> ';
		}
		str += '</object>';
	} else {
		str += '<embed ';
		for (var i in ret.embedAttrs) {
			str += i + '="' + ret.embedAttrs[i] + '" ';
		}
		str += '></embed>';
	}
	return str;
}

//编辑器相关处理
var fckEditorInstance  = new Array();//用來儲存FCKeditor Instance的陣列
var fckEditorValue  = new Array();//用來儲存FCKeditor 内容的陣列 
function FCKeditor_OnComplete( editorInstance )
{
    fckEditorInstance[editorInstance.Name] = editorInstance;
}
function getFckInst(idname)
{
    return fckEditorInstance[idname];
}
function getEditorTextContents(EditorId) 
{
	var oEditor = getFckInst(EditorId);
	if(oEditor){
		return(oEditor.GetXHTML(true)); 
	} else {
		return '';
	}
}

function trim( text )
{
  if (typeof(text) == "string")
  {
    return text.replace(/^\s*|\s*$/g, "");
  }
  else
  {
    return text;
  }
}

function show_loading(obj)
{
	obj.html('<div align="center" style="margin-top:20px;"><img src="./templates/images/loading.gif"><span style="color:#CCCCCC;">正在加载...</span></div>');
}

var DataFormat = {
isEmail:function(email) {
	var reg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
  	return reg.test( email );
},
isQQ:function(qq) {
	var reg = /^[\d]+$/;
  	return reg.test( qq );
},
isPhone:function(phone) {
	var reg = /^[\d]+\-[\d]+$/;
  	return reg.test( phone );
},
isMobile:function(mobile) {
	var reg = /^[\d]+$/;
  	return reg.test( mobile );
},
isIdNumber:function(id) {
	var reg = /^[\d]+$/;
  	return reg.test( id );
},
isUsername:function(username){
	reg = /^([a-z0-9]+[\-]?[a-z0-9]+)+$/;
	return reg.test( username );
},
isEmpty:function( val )
{
  switch (typeof(val))
  {
    case 'string':
      return trim(val).length == 0 ? true : false;
      break;
    case 'number':
      return val == 0;
      break;
    case 'object':
      return val == null;
      break;
    case 'array':
      return val.length == 0;
      break;
    default:
      return true;
  }
},
isCSV:function(val) {
	reg = /^([\d]+,)+$/;
	return reg.test( val+',' );
}
}

function get_main_win() {
	if(top.if_content_t) {
		return top.if_content_t.document;
	} else if(top.if_content) {
		return top.if_content.document;
	} else {
		return null;
	}
}

function showfloathint(windowname){
	closefloathint();
	top.document.getElementById('float_bg').style.display='block';
	top.document.getElementById('float_warp').style.display='block';
	top.document.getElementById(windowname).style.display='block';
	try{
		show_select(0);
	} catch(e) {}
}

function closefloathint(){
	$('#float_warp',top.document).children().css('display','none');
	top.document.getElementById('float_warp').style.display='none';
	top.document.getElementById('float_bg').style.display='none';	
	try{
		show_select(1);
	} catch(e) {}
}

function showinfo(msg,url,target,preDlg)
{
	var jump = "";//默认不跳转
	if(!isNaN(url)) {
		jump = "top.document.getElementById('if_content').contentWindow.history.go("+url+");";
	} else if(url && url.length > 0){
		if(target == 1){//从父窗口重新加载
			jump = "top.document.location.href='index.php?mp="+url+"';";
		} else {//iframe跳转
			jump = "$('#if_content').attr('src','"+url+"')";
		}		
	}
	
	var onclick = '';
	if(preDlg) {
		onclick = "showfloathint('"+preDlg+"');"+jump;
	} else {
	 	onclick = "closefloathint();"+jump;
	}
	
	if(DataFormat.isEmpty(msg)) {	//无信息直接跳转
		eval(onclick);return;
	}
	if(msg['html']) {	//HTML内容
		$('#message_box',top.document).html(msg['html']);
	} else {	//文本
		$('#message_box',top.document).html('<span class="info_title">'+msg+'</span>');
	}
	$('#message_close',top.document).html('<a href="#" onclick="'+onclick+'" class="Per_sel_Search"></a>');
	$('#message_operation',top.document).html('<input name="Per_sel_bu1" type="button" value="确定" class="button_21" id="message_confirm" onclick="'+onclick+'"/>');
	
	showfloathint('hint_message');
	$('#message_confirm',top.document).focus();
}

function show_operation_tips(html,target,count)
{
	var times = 5;
	if(isNaN(count)) {
		count = 1;
	}
	
	if(typeof(target) == 'object') {
		id = target.attr('id');
		if(!id) {
			var date = new Date();
			id = 'tips'+date.getTime();
			
			target.attr('id',id);
		}
	} else if(typeof(target) == 'string') {
		id = target;
		target = $('#'+target);
	}
	
	if(count < times) {
		if(count == (times-1)) {
			count++;
			setTimeout("show_operation_tips('"+html+"','"+id+"','"+count+"')",3000);
		} else if(count%2==0){
			count++;
			setTimeout("show_operation_tips('"+html+"','"+id+"','"+count+"')",150);
			target.hide();
		} else {
			count++;
			setTimeout("show_operation_tips('"+html+"','"+id+"','"+count+"')",150);
			target.html(html);
			target.show();
		}
	} else {
		target.hide();
	}
}

function show_confirm_box(msg_html,submit_callback,cancel_callback)
{
	$('#confirm_msg_box',top.document).html(msg_html);
	$('#confirm_operation',top.document).html('<input type="button" value="确定" class="button_21" id="confirm_ok" onclick="closefloathint();ifr_callback(\''+submit_callback+'\');"/>&nbsp;<input name="Per_sel_bu2" type="button" value="取消" class="button_21" onClick="closefloathint();ifr_callback(\''+cancel_callback+'\');" />');
	$('#confirm_dlg_close',top.document).click(function() {
															closefloathint();top.ifr_callback(cancel_callback);
														});
	showfloathint('confirm_dialog');
	$('#confirm_ok',top.document).focus();
}

function get_float_html(type)
{
	$.ajax({
	url:'float_html.php',
	type:'POST',
	data:'type='+type,
	success:function(msg)
	{
		$('body').append(msg);
	}
	});
}

function go_home_url(){//回主页
	window.location.reload();
}
function go_next_url(){//下一页
	if_content_t.window.history.go(-1);
}
function go_forward_url(){//前一页
	if_content_t.window.history.go(1);
}
function go_refresh_url(){//刷新
	if_content_t.window.location.reload();
}

function auto_month()
{
	var syear = $('#autosend_year').val();
	var smonth = $('#autosend_month').val();
	var sday = $('#autosend_date');
	var oday = sday.val();
	var maxday = 28;
	sday.empty();
	for(var i=1;i<=28;i++) {
		if(i < 10) {
			i = '0' + i;
		}
		sday.append('<option value="'+i+'">'+i+'</option>');
	}
	if(smonth != '02'){
		sday.append('<option value="29">29</option>');
		sday.append('<option value="30">30</option>');
		maxday = 30;
		switch(smonth){
			case '01':
			case '03':
			case '05':
			case '07':
			case '08':
			case '10':
			case '12':{
				sday.append('<option value="31">31</option>');
				maxday = 31;
			}
		}
	} else {
		if(syear%400==0 || (syear%4==0 && syear%100!=0)) {
			sday.append('<option value="29">29</option>');
			maxday = 29;
		}
	}
	$('#autosend_month').val(smonth);
	if (parseInt(oday) <= maxday)	sday.val(oday);
}

function autosend_type(){
	var send_type = $('#send_type').val();
	if(send_type == 1){
		var type = $('#auto_type1').val();
		if(type == 1){//公历
			var obj = $('#autosend_date');
			lunar.init();
			var solar_date = lunar.lunarDateToSolar($('#send_year1').val(), $('#send_month1').val(), $('#send_date1').val());
			solar_date = solar_date.split('-');
			obj.val(solar_date[0]+'-'+solar_date[1]+'-'+solar_date[2]);
			obj.next().hide();
			obj.show();
		}else if(type == 2){//农历
			var send_date = $('#autosend_date').val().split('-');
			var year = send_date[0];
			var month = send_date[1];
			var date = send_date[2];
			lunar.init();
			var lunar_date = lunar.solarDateToLunar(year, month, date);
			lunar_date = lunar_date.split('-');
			var obj = $('#send_year1');
			obj.parent().show();
			$('#autosend_date').hide();
			if(obj.html() == ''){
				var min_year = 2010;
				var max_year = 2020;
				var html = '';
				for(var i=min_year; i<=max_year; i++){
					html += '<option value="'+i+'">'+i+'</option>';
				}
				obj.html(html);
			}
			obj.val(lunar_date[0]);
			
			obj = $('#send_month1');
			if(obj.html() == ''){
				var html = '';
				for(var i=1; i<=12; i++){
					html += '<option value="'+i+'">'+lunar.getLunarMonthNum(i)+'</option>';
				}
				obj.html(html);
			}
			obj.val(lunar_date[1]);
			
			obj = $('#send_date1');
			if(obj.html() == ''){
				var html = '';
				var max = lunar.monthDays(lunar_date[0], lunar_date[1]);
				for(var i=1; i<=max; i++){
					html += '<option value="'+i+'">'+lunar.getLunarDateNum(i)+'</option>';
				}
				obj.html(html);
			}
			obj.val(lunar_date[2]);
		}
	}else if(send_type == 3){
		var type = $('#auto_type3').val();
		var obj = $('#send_date3');
		if(type == 1){//公历
			var html = '';
			for(var i=1; i<=28; i++){
				var val = i;
				if(val < 10){
					val = '0'+i;
				}
				html += '<option value="'+val+'">'+val+'</option>';
			}
			obj.html(html);
			var current_time = new Date();
			obj.val(current_time.getDate());
		}else{//农历
			lunar.init();
			var html = '';
			for(var i=1; i<=29; i++){
				html += '<option value="'+i+'">'+lunar.getLunarDateNum(i)+'</option>';
			}
			obj.html(html);
		}
	}
	autosend_change();
}

function date_change(){
	var year = $('#send_year1').val();
	var month = $('#send_month1').val();
	var max = lunar.monthDays(year, month);
	if($('#send_date1 option:last').val() != max){
		var html = '';
		for(var i=1; i<=max; i++){
			html += '<option value="'+i+'">'+lunar.getLunarDateNum(i)+'</option>';
		}
		$('#send_date1').html(html);
	}
}

function auto_type(){
	var type = $('#send_type').val();
	if(type == 2 || type == 3){
		var current_time = new Date();
		var obj = $('#send_hour'+type);
		if(obj.html() == '') {
			var max = 24;
			var	html = '';
			for(var i=0; i<max; i++)
			{
				var val = i;
				if(val < 10) {
					val = '0'+i;
				}
				html += '<option value="'+val+'">'+val+'</option>';
			}
			obj.html(html);
		}
		obj.val(current_time.getHours());
		
		obj = $('#send_minute'+type);
		if(obj.html() == ''){
			var max = 60;
			var	html = '';
			for(var i=0; i<max; i++)
			{
				var val = i;
				if(val < 10) {
					val = '0'+i;
				}
				html += '<option value="'+val+'">'+val+'</option>';
			}
			obj.html(html);
		}
		obj.val(current_time.getMinutes());
		
		if(type == 3){
			obj = $('#send_date'+type);
			for(var i=1; i<=28; i++){
				var val = i;
				if(val < 10){
					val = '0'+i;
				}
				html += '<option value="'+val+'">'+val+'</option>';
			}
			obj.html(html);
			obj.val(current_time.getDate());
		}
	}
	
	autosend_change();
}

function autosend_change()
{
	var send_type = $('#send_type').val();
	if(send_type == 1){
		var send_date = $('#autosend_date').val().split('-');
		var mydate = $('#mydate', get_main_win()).val();
		var type = $('#auto_type1').val(); 
		if(type == 1){
			var send_date = $('#autosend_date').val().split('-');
		}else{
			lunar.init();
			var solar_date = lunar.lunarDateToSolar($('#send_year1').val(), $('#send_month1').val(), $('#send_date1').val());
			var send_date = solar_date.split(',');
		}
		if(mydate.indexOf('-') != -1){
			if(Date.parse(send_date[0]+'/'+send_date[1]+'/'+send_date[2]) > Date.parse(mydate.replace(/-/g, '/'))){
				$('#set_time_msg').text('定时发送时间大于期限的开始时间');
			}
		}
		
		if(type == 1) {
			var t = '公历'+send_date[0]+'年'+send_date[1]+'月'+send_date[2]+'日 ';
			var arr = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
			var date = new Date(Date.parse(send_date[0]+'/'+send_date[1]+'/'+send_date[2]));
			t += '('+arr[date.getDay()]+' 第'+which_week(send_date[0]+'/'+send_date[1]+'/'+send_date[2])+'周) '+$('#send_hour1').val()+':'+$('#send_minute1').val();
		}else{
			var t = '农历'+$('#send_year1').val()+'年'+$('#send_month1 option:selected').text()+'月'+$('#send_date1 option:selected').text()+'日 '+$('#send_hour1').val()+':'+$('#send_minute1').val();
		}
		
	}else if(send_type == 2){
		var arr = new Array('一', '二', '三', '四', '五', '六', '日');
		var t = '';
		for(var i=1;i<8;i++){
			if($('#send_day'+i).attr('checked') == true){
				t += '周'+arr[i-1]+'、';	
			}
		}
		if(t){
			t = '每'+t.replace(/(、+)$/, ' ');
		}
		t += $('#send_hour2').val()+':'+$('#send_minute2').val();
	}else if(send_type ==3){
		if($('#last_day').attr('checked') == true){
			var last_day = '最后一天';	
		}else{
			var last_day = $('#send_date3 option:selected').text()+'日';
		}
		var t = $('#auto_type3 option:selected').text()+'每月'+last_day+' '+$('#send_hour3').val()+':'+$('#send_minute3').val();
	}
	
	$('#autosend_selected').text(t);
}

function which_week(date) {
//根据日期取得当年第几周 2010/08/10
	date = new Date(Date.parse(date));
	var date1 = new Date(date.getFullYear(), 0, 1);
	var date_diff = (date.getTime() - date1.getTime())/86400000;
	
	day = date1.getDay();
	day = (day == 0? 7:day);
	
	return Math.ceil((date_diff - 7 + day)/7) + 1;	
}

function select_dep_job(obj){
	obj.siblings('li').removeClass('li_sel');
	obj.addClass('li_sel');
}

function open_list(obj){
	if(obj.siblings('ul').height() > 150){
		obj.siblings('ul').height(150);	
	}
	obj.siblings('ul').toggle();
}

function sel_name(obj, type){
	obj.parent().toggle();
	obj.siblings('li').attr('icon', 0);
	obj.attr('icon', 1);
	$('#sel_name').text(obj.html().replace(/&nbsp;/g, '').replace('-', ''));
	if(type == 1){
		UserList.search_job();	
	}else{
		UserList.search();
	}
}

function change_dep_job(type){
	$('#userlist_left').empty();
	$('#userlist_group').empty();
	if($('#userlist_search').val() != '姓名关键字搜索'){
		$('#userlist_search').val('姓名关键字搜索');
	}
	$('#sel_name').text(top.UserList.all['company']);
	if(type == 1){
		UserList.add_left_arr();
		UserList.add_list_job();
		$('#userlist_search').unbind('keyup');
		$('#userlist_search').bind('keyup', function(){UserList.sleep(2);});
	}else{
		UserList.add_group_list();
		UserList.add_left_arr();
		UserList.add_list();
		$('#userlist_search').unbind('keyup');
		$('#userlist_search').bind('keyup', function(){UserList.sleep(1);});
	}
}

function update_sub(){
	select_dep_job($('#li_1'));
	$('#userlist_search').unbind('keyup');
	$('#userlist_search').bind('keyup', function(){UserList.sleep(1);});
	UserList.updateData('sub');
}

function highlight(word, obj){
		//var str = '/'+word+'/g';
		//var reg = new RegExp(eval(str));
		if(typeof(obj) == 'undefined'){
			obj1 = $('#order_list');	
		}else{
			obj1 = 	$('#'+obj);
		}
		var reg = new RegExp(word+"(?=[^<>(&nbsp;)]*<)","ig");
		obj1.html(obj1.html().replace(reg, '<span style="background-color:#FFFF00;">'+word+'</span>'));
}

function strlen(str){
	var len= 0;
	var lens = str.length;
	for(var i = 0; i < lens; i++){
		if(str.charCodeAt(i) > 255){
			len += 2;	
		}else{
			len ++;	
		}
	}
	return len;
}

function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 300; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}

function show_center_box(id){
	var box_obj = $('#'+id);
	box_obj.css({left: ($(window).width() - box_obj.width() - 170)/2, top: ($(window).height() - box_obj.height() - 80)/2});	
	box_obj.show();
	show_bg(1);
}

function show_bg(a){
	if(a == 1){
		if(typeof($('#content_bg').attr('id')) == 'undefined'){
			$('body').append('<div id="content_bg"></div>');
		}else{
			$('#content_bg').show();
		}
	}else{
		$('#content_bg').hide();
	}
	
	try{
		var is_ie6 = navigator.userAgent.toLowerCase().match(/msie ([\d\.]+);/)[1];
		if(is_ie6 == '6.0'){
			$('select[show!="1"]').each(function(){
				if(a == 1){
					$(this).css('visibility', 'hidden');
				}else{
					$(this).css('visibility', 'visible');
				}
			});
		}
	}catch(e){}
}

function show_scwith(obj){
	var order_per = obj.parent();
	if(order_per.css('height') == '18px'){
		obj.css("background-position","left -550px");
		order_per.css("height","auto");
		var order_per_height = order_per.height(); 
		order_per.css("height","18px");
		order_per.animate( { height: order_per_height + "px"}, { queue: false, duration: 500 } );
		setTimeout("obj.css('height','auto')",1000);
	}else{
		obj.css("background-position","left -600px");
		order_per.animate( { height: "18px"}, { queue: false, duration: 500 } );
	}
}

function showinfo_tips(message, type, url){
	if(type == 1) {
		var style = 'edit_1';
	}else{
		var style = 'edit_2';	
	}
	var obj = $('#edit_text', top.document);
	obj.removeAttr('class');
	obj.addClass(style);
	obj.text(message);
	$('#edit_hint', top.document).show();
	top.clear_tips();
	if(isNaN(url) && typeof(url) != 'undefined'){
		url = url.replace(/#*$/, '');
		location.href = url;	
	}else if(url == 1){
		history.back();	
	}
}

function clear_showinfo_tips(){
	$('#edit_hint', top.document).hide();	
}

function goto(url){
	url = url.replace(/#*$/, '');
	if(navigator.userAgent.indexOf('IE') != -1){
		var refer = document.createElement('a');
		refer.href = url;
		document.body.appendChild(refer);
		refer.click();
	}else{
		location.href = url;	
	}
}

function binarySearch(items, value){ 
         
	var startIndex  = 0, 
		stopIndex   = items.length - 1, 
		middle      = Math.floor((stopIndex + startIndex)/2); 
	
	while(items[middle] != value && startIndex < stopIndex){ 
	
		//adjust search area（调整查找范围） 
		if (value < items[middle]){ 
			stopIndex = middle - 1; 
		} else if (value > items[middle]){ 
			startIndex = middle + 1; 
		} 
	
		//recalculate middle（重新计算中项索引） 
		middle = Math.floor((stopIndex + startIndex)/2); 
	} 
	
	//make sure it's the right value（确保返回正确的值） 
	return (items[middle] != value) ? -1 : middle; 
}

/*
  @ 返回中文格式日期
  @param: obj：Date对象
		  show: 显示项目，显示日期=1，显示时间=2，显示星期=4，可以相加得出相应的项目, 不传为显示全部
 */		  
function cnDate(obj,show){
	if(obj.getFullYear()){
		arrDays = new Array('日','一','二','三','四','五','六');
		strDate  = obj.getFullYear()+'年'+(obj.getMonth()+1)+'月'+obj.getDate()+'日';
		strTime  = obj.getHours()+"点"+obj.getMinutes()+"分"+obj.getSeconds()+'秒';
		strDay  = '星期'+arrDays[obj.getDay()];
		switch(show){
			case 1: str = strDate; break;
			case 2: str = strTime; break;
			case 3: str = strDate+' '+strTime; break;
			case 4: str = strDay; break;
			case 5: str = strDate+' '+strDay; break;
            case 6: str = (obj.getMonth()+1)+'月'+obj.getDate()+'日' + ' '+strTime;break;
            case 7: str =  obj.getDate()+'日' + ' '+strTime;break;
			default: str = strDate+' '+strTime+' '+strDay; break;
		}
		return str;
	} else {
		return 'Not a valid Date object.';
	}
}

/*
	日期转时间戳
	datetime: yyyy-mm-dd h:m:i
*/
function datetime_to_unix(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    
    var h = arr[3] ? arr[3]-8 : '00';
    var m = arr[4] ? arr[4] : '00';
    var s = arr[5] ? arr[5] : '00';
    
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2], h, m, s));
    return parseInt(now.getTime()/1000);
}

function current_date(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	if(month < 10){
		month = '0'+month;
	}
	
	var day = date.getDate();
	if(day < 10){
		day = '0'+day;
	}
	
	var hour = date.getHours();
	if(hour < 10){
		hour = '0'+hour;
	}
	
	var minute = date.getMinutes();
	if(minute < 10){
		minute = '0'+minute;
	}
	
	return year+'-'+month+'-'+day+' '+hour+':'+minute;
}

function str_random(len) {
	var arr = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
	var str = '';
	for(var i=0; i<10; i++){
		str += arr[Math.floor(Math.random()*25)];		
	}
	return str;
}

function arr_unique(arr){  //数组去重
    var res = [];
    var json = {};
    for(var i = 0; i < arr.length; i++){
        if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}


function strlen(str) {  //在IE8 兼容性模式下 不会报错
    var s = 0;
    for(var i = 0; i < str.length; i++) {
        if(str.charAt(i).match(/[\u0391-\uFFE5]/)) {
            s += 2;   
        } else {
            s++;
        }
    }
    return s;
}