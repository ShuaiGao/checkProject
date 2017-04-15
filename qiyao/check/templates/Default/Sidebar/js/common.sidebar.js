//主框架公共js
function all_changClass( id ){  
	if( $("li#"+id).attr('isck')=='1' ) {
		$('li[isck=1]').removeClass('on');
		$("li#"+id).removeClass('bg_blue').addClass('on'); 
	}
}

$(document).ready(function(){
	
	$('li[isck=1]').hover(function(){
			if($(this).hasClass('on'))return;
			$('li[isck=1]').removeClass('bg_blue');
			$(this).addClass('bg_blue');
		},function(){
			if($(this).attr('class') == 'on')return;
			$('li[isck=1]').removeClass('bg_blue');
		});
	
	$('li[isck=1],li[isck=3]').bind('click', function(evt){	
		$('li[isck=1],li[isck=3]').removeClass('on');		
		$(this).removeClass('bg_blue');
		if( $(this).attr('isck')==1 ) $(this).addClass('on');
		evt.stopPropagation();
	});
	
	$('.title_option a').click(function(e){ 
		e.stopPropagation(); 
	}) 

	$('.myleft a').focus(function(){
						  this.blur();		  
								  })
	
	$('.open_zk').toggle(function(){
							$(this).children('ul').show();
							var img = $(this).find(".title_ico").attr("src");
							var arr = img.split('/');
							img = img.replace(arr[arr.length-1],'oc_left_02.gif');
							$(this).children('.cls').children('span').children('.title_ico').attr('src',img);			
						},
						function () {
							$(this).children('ul').hide();
							var img = $(this).find(".title_ico").attr("src");
							var arr = img.split('/');
							img = img.replace(arr[arr.length-1],'oc_left_01.gif');
							$(this).children('.cls').children('span').children('.title_ico').attr('src',img);	
						}									
	)
	$('li[expanded=1]').click();
	$(".menu li[isck!=1]").each(function(){					
		if( $(this).next().hasClass('open_zk') || $(this).next().hasClass('no_open_zk')){ 
		$(this).next().css('border-top','none'); 
		}
	}) 
	
	
	
if( $('.menu li:first').hasClass('open_zk')|| $('.menu li:first').hasClass('no_open_zk') ) 	{
				$('.menu li:first').attr('style','border-top:none;margin-top:3px;')
				}
	else{
				$('.menu li:first').attr('style','margin-top:3px;');
		}
	
	
})

