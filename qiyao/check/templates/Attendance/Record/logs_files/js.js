// JavaScript Document

function getobj(itemid){
	return document.getElementById(itemid)
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function isnull(variable) {
	return variable == null ? true : false;
}

function Fun_PubSwitch_V(itemid){
	if (getobj(itemid).style.visibility == "hidden") {
		getobj(itemid).style.visibility = "";
	}
	else{
		getobj(itemid).style.visibility = "hidden";
	}
}

function showobj(itemid){
	getobj(itemid).style.display = ""
}

function hideobj(itemid){
	getobj(itemid).style.display = "none"
}

function autoswitch (itemid){
	if (getobj(itemid).style.display != "")getobj(itemid).style.display = "";
	else getobj(itemid).style.display = "none";
}

function changClass(Front,id,count,de_class,indexclass,show){
	
	for(i=1;i<=count;i++){
		getobj(Front + i).className = de_class;
		if (show != false){
			getobj(Front + "S_" + i).style.display = "none";
		}
	}
	
	getobj(Front + id).className = indexclass;
	if (show != false){
		getobj(Front + "S_" + id).style.display = "";
	}
}


function changClass_Special(Front,id,count,de_class,indexclass){
	
	for(i=1;i<=count;i++){
		if (i == count)
			getobj(Front + i).className = de_class + " noborder";
		else
			getobj(Front + i).className = de_class;
	}
	
	getobj(Front + id).className = indexclass;
}


function allchangClass(form,itemid,de_class,indexclass){
	var form = getobj(form);
	var item_arr = form.getElementsByTagName('li');
    for (var i=0;i<item_arr.length;i++){
		var e = item_arr[i];
		if (e.value == 1)
			e.className = de_class;
	}
	getobj(itemid).className = indexclass;
}


function onechangClass(itemid,de_class,indexclass){
	if (getobj(itemid).className == de_class){
		getobj(itemid).className = indexclass;
	}
	else{
		getobj(itemid).className = de_class;
	}
}


function show_select(aa){
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	if (window.ActiveXObject) Sys.ie = ua.match(/msie ([\d.]+)/)[1]
	
	if(Sys.ie == "6.0") {
		var form = top.if_content_t.document;
		var item_arr = form.getElementsByTagName('select');
		
		for (var i=0;i<item_arr.length;i++){
			var e = item_arr[i];
			
			if (aa == 1){
				e.style.visibility = "visible";
			}
			else if (aa == 0){
				e.style.visibility = "hidden";
			}
			else{
				if ((e.style.visibility == "visible") || (e.style.visibility == ""))
					e.style.visibility = "hidden";
				else
					e.style.visibility = "visible";
			}
			
			
			
			//visibility:hidden; visibility:visible
		}
	}
}

function rehref(url){
	top.document.getElementById("if_content").src = url
};

var float_arr = new Array()
float_arr[0] = "hint_Persel_List";
float_arr[1] = "hint_TYRZSJ";
float_arr[2] = "hint_JJRZSJ";
float_arr[3] = "hint_TYLZSJ";
float_arr[4] = "hint_JJLZSJ";
float_arr[5] = "hint_CXJQ";
float_arr[6] = "hint_CTYG";
float_arr[7] = "hint_SZGLY";
float_arr[8] = "hint_SZPTYG";
float_arr[9] = "hint_SZGLQX";
float_arr[10] = "hint_SZMKSZ";
float_arr[11] = "hint_AddPer";
float_arr[12] = "hint_Addfoler";  
float_arr[13] = "hint_resetfolername";
float_arr[14] = "hint_BCCG";
float_arr[15] = "hint_BCCGCG";
float_arr[16] = "hint_sendorder";
float_arr[17] = "hint_TopicType";
float_arr[18] = "hint_orderdate";
float_arr[19] = "hint_LY";
float_arr[20] = "hint_LSP";
float_arr[21] = "hint_senditemorder";
float_arr[22] = "hint_itemorderdateerr";
float_arr[23] = "hint_itemorderdateset";
float_arr[24] = "cancelover";
float_arr[25] = "orderover";
float_arr[26] = "setorderautodate";
float_arr[27] = "resetorderautodate";
float_arr[28] = "setorderautodateover";
float_arr[29] = "removeorderautodateover";
float_arr[30] = "addorderitem";
float_arr[31] = "canceladdorderitem";
float_arr[32] = "withdraworder";
float_arr[33] = "order_pass";
float_arr[34] = "order_nopass";
float_arr[35] = "convertitemorder";
float_arr[36] = "cancel_order";
float_arr[37] = "cancel_orderstop";
float_arr[38] = "moveorder";
float_arr[39] = "sendremarks";
float_arr[40] = "saveremarks";
float_arr[41] = "resetorderinfo";
float_arr[42] = "removedraft";
float_arr[42] = "compulsoryremoveorder";
float_arr[43] = "compulsorymoveorder";
float_arr[44] = "y_compulsorymoveorder";
float_arr[45] = "hint_JRXXTJ";
float_arr[46] = "hint_BAXXCX";
float_arr[47] = "compulsoryremovemeeting";
float_arr[48] = "compulsorymovemeeting";
float_arr[44] = "y_compulsorymovemeeting";
float_arr[45] = "cancel_timeorder";
float_arr[46] = "Createmeeting";
float_arr[47] = "meetingnotin";
float_arr[48] = "meetingreset";
float_arr[49] = "hint_Perlook_List";
float_arr[50] = "addpertype";
float_arr[51] = "addper_1";
float_arr[52] = "addper_2";
float_arr[53] = "addper_3";
float_arr[54] = "hint_removefoler";
float_arr[55] = "set_ordersenddate";
float_arr[56] = "order_inSearch";
float_arr[57] = "hint_Lock_order";
float_arr[58] = "hint_unLock_order";
float_arr[59] = "up_file";
float_arr[60] = "file_removefile";
float_arr[61] = "file_movefile";
float_arr[62] = "file_thoroughlyremove";
float_arr[63] = "file_cleangarbage";
float_arr[64] = "file_removetype";
float_arr[65] = "file_mewtype";
float_arr[66] = "file_settype";
float_arr[67] = "meg_remove_draft";
float_arr[68] = "meg_remove_con";
float_arr[69] = "meg_set_type";
float_arr[70] = "meg_add_type";
float_arr[71] = "meg_add_card";
float_arr[72] = "meg_help";
float_arr[73] = "ser_scwz";
float_arr[74] = "ser_tjfz";
float_arr[75] = "ser_xgfz";
float_arr[76] = "ser_scfz";
float_arr[77] = "ser_szku";
float_arr[78] = "ser_ztku";
float_arr[79] = "ser_set_time_s";
float_arr[80] = "ser_set_time_o";
float_arr[81] = "ser_tjlyjsr";
float_arr[82] = "ser_xzcyy";
float_arr[83] = "ser_xgcyy";
float_arr[84] = "ser_remove_record";
float_arr[85] = "removeworktype";
float_arr[86] = "readuserphoto";
float_arr[87] = "hint_Persel_List2";



function showfloathint(windowname){
	
	closefloathint();
	
	//top.document.getElementById('float_bg').style.display='block';
	top.document.getElementById('float_warp').style.display='block';
	top.document.getElementById(windowname).style.display='block';
	
	show_select(0)
}

function closefloathint(){

	for (i=0;i<float_arr.length;i++){
		if (!isnull(top.document.getElementById(float_arr[i]))){top.document.getElementById(float_arr[i]).style.display='none';}
	}

	//top.document.getElementById('float_bg').style.display='none';
	top.document.getElementById('float_warp').style.display='none';
	show_select(1)
}

$(function(){
	$("#sel_Profession td").hover(
		function () {
			if ($(this).html() != "&nbsp;") $(this).addClass("over");
		},
		function () {
			$(this).removeClass("over");
		}
	);
	
	$("#Copysend").bind("click",function(){
		$(this).html($(this).html() == "添加抄送" ? "取消抄送" : "添加抄送")
	})
	
	$("#Alonesend").bind("click",function(){
		$(this).html($(this).html() == "分别发送" ? "取消分别发送" : "分别发送")
	})
	
	$("a[name='Handwritten_height_add']").bind("click", function(){
	 	$("#Handwritten_main").height($("#Handwritten_main").height() + 100)
	 
	}); 
	
	$("a[name='Handwritten_height_reduce']").bind("click", function(){
		if ($("#Handwritten_main").height() > 100 || $("#Handwritten_main").height() > 100){
			$("#Handwritten_main").height($("#Handwritten_main").height() - 100)
		}
	}); 
});

var b_ks_name = "";
function ksfy_2_list_show(item){
	
	$(document).unbind("click",ksfy_2_list_hide) 
	
	var left_s,top_s
	
	if (b_ks_name == "") loction()
	else {
		if (b_ks_name == $(item).attr("name")) ksfy_2_list_hide()
		else{
			$("#ksfy_2_list").hide()
			loction()
		}
	}
	
	function loction(){
		if (item != 'undefined'){
			b_ks_name = $(item).attr("name");
			left_s = $(item).offset().left
			top_s = $(item).offset().top + 21
			
			if ((left_s + $("#ksfy_2_list").width()) > $(window).width()) left_s = $(item).offset().left - 240
			
			if ($("#ksfy_2_list").height() > $(window).height() - ($(item).offset().top - $(window).scrollTop()) - $(item).height() + 5)  top_s = $(item).offset().top - $("#ksfy_2_list").height() -3
			$("#ksfy_2_list").css({ left: left_s , top: top_s }); 
		}
		$("#ksfy_2_list").fadeIn("normal"); 
	}
	
	setTimeout("$(document).bind('click',ksfy_2_list_hide)",500)
}

function ksfy_2_list_hide() {
	$("#ksfy_2_list").fadeOut("normal"); 
	b_ks_name= "";
}

function ksfy_2_list_hide2(item){
	if (b_ks_name == $(item).closest("dl").find("input.ksfy_4").attr("name")) ksfy_2_list_hide();
}