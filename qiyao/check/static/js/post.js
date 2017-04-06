var swfuploaded = 0;

function swfHandler(action) {
	if(action == 1) {
		swfuploaded = 1;
	} else if(action == 2) {
		swfuploadwin();
		
		if(swfuploaded) {
			swfattachlistupdate(action);
		}
	} else if(action == 3) {
		swfuploaded = 0;
		pagescroll.right(1, '$(\'#swfuploadbox\').show(); $(\'#swfbox\').show();');
	}
}


function swfuploadwin() {
	if($('#swfuploadbox').css('display') == 'none') {
		$('#swfuploadbox').css('display','');
		$('#swfbox').css('display','') ;
		$('#swfclosebtn').css('display','');
		$('#swfuploadbox').jqDrag($('#swfuploadtitle'));
	} else {
		$('#swfuploadbox').css('display','none');
		$('#swfbox').css('display','none');
		$('#swfclosebtn').css('display','none');
	}
}

function sendFileData(data){
}

function swf_minimize(){
    /*
	$('#swfuploadbox').hide();
	$('#swfbox').hide();
	$('#swfclosebtn').hide();
	$('#loading1').remove();
	$(document.body).append('<div id="loading1" class="float_hint_1_w" style="display:none;position:absolute;z-index:100;width:230px;height:50px;"><div class="float_hint1"><div class="d_title" id="swfuploadtitle" style="cursor:move;"><label style="background:url(../templates/images/upload.gif) no-repeat;">上传中........</label><a href="#" onClick="clearTimeout(mini);$(\'#loading1\').hide();return false;">&nbsp;</a><a href="#" onClick="clearTimeout(mini);$(\'#loading1\').hide();swfuploadwin();return false;" class="mini1">&nbsp;</a></div><img src="../templates/images/loading1.gif" width="220" height="19" /><div></div>');
	$('#loading1').css({left: $(window).width()-250, top: $(document).scrollTop()+document.documentElement.clientHeight-110});
	$('#loading1').show();
	mini = setTimeout('swf_minimize()', 1000);
        */
}

function close_minimize(){
	clearTimeout(mini);
}

function delAttach(id) {
	
}

function delSWFAttach(id) {

}

function delEditAttach(id) {

}

function addAttach() {
	
}

function insertAttach(id) {
	
}

function attachlist(op) {
	
}

function attachupdate(aid, ctrlobj) {

}