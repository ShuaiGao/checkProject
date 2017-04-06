$(document).ready(function(){
	qyBanner.init();
});

var qyBanner = {
	// 图片数量
	len: 0,
	// 暂停切换     
	pause: false,
	// 切换方向："left":从右到左，"right":从左到右，"up":从下到上，"down":从上到下，默认为空，随机切换
	direction: "",
	
	init: function(direction){
		var picList = $('#ibanner_pic2').children('a');
		if( picList.length<=1 ){
			return false;
		}
		this.len = picList.length;
		if( direction && direction!="undefined" ) this.direction = direction;
		this.addBtn();
		this.btnEvent();
		this.picEvent();
		setInterval(this.run,5000);
	},

	addBtn: function(){
		if(!$('#ibanner2')||!$('#ibanner_pic2')) return false;
		var picList = $('#ibanner_pic2').children('a');
		var html = '<div id="ibanner_btn2">';
		for( var i=1; i<=this.len; i++ ){
			html += '<span id="btn_'+i+'" class="normal">&nbsp;</span>';
			picList[i-1].setAttribute('id','pic_'+i);
		}
		html += '</div>';
		$('#ibanner2').append(html);
		$("#btn_1").removeClass().addClass('current');
	},
	
	btnEvent: function(){
		$('#ibanner_btn2 span').live('mouseover',function(){
					var arr_id = $("#ibanner_btn2 span.current").attr("id").split("_");
					var current = parseInt(arr_id[1]);
					var next = $(this).attr("id").split("_");
					next = parseInt(next[1]);
					qyBanner.pause = true;
					if( current==next ){
						return false;
					}
					setTimeout(function(){
						qyBanner.show(current,next);
						//this.setAttribute('class','current');
					},300);
				});	  	
		$('#ibanner_btn2 span').live('mouseout',function(){ qyBanner.pause = false; });
	},
	
	picEvent: function(){
		$('#ibanner_pic2 img,#ibanner_pic2 map').live('mouseover',function(){
					qyBanner.pause = true;
				});	  	
		$('#ibanner_pic2 img').live('mouseout',function(){ qyBanner.pause = false; });
	},

	run: function(){
		obj = qyBanner;
		if( !obj.pause ){
			var str_id = $("#ibanner_btn2 span.current").attr("id");
			var arr_id = str_id.split("_");
			var current = parseInt(arr_id[1]);
			if( current >= obj.len ){
				var next = 1;
			}else{
				var next = current+1;
			}
			obj.show(current,next);
		}
	},
	
	show: function(current,next){
		$("#ibanner_btn2 span").removeClass().addClass('normal');
		$("#btn_"+next).removeClass().addClass('current');
		$('#ibanner_pic2 a').css('z-index','1');
		$("#pic_"+current).css('z-index','2');
		var direction = qyBanner.direction;
		if( direction=="" ){
			var arr = new Array("left","right","down");
			rnd = parseInt(Math.random()*2);
			direction = arr[rnd];
		}
		switch( direction ){
			case "right":
				$("#pic_"+next).attr('style',"z-index:3;left:-960px").animate({
							left:'0'
						},500);
				break;
			case "left":
				$("#pic_"+next).attr('style',"z-index:3;left:960px").animate({
							left:'0'
						},500);
				break;
			case "down":
				$("#pic_"+next).attr('style',"z-index:3;top:-280px").animate({
							top:'0'
						},500);
				break;
		}
	}
}
