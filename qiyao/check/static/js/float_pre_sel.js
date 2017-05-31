// JavaScript Document

$(function(){
//	$('#hint_Persel_List .Per_sel_ul li').click(
//		function(){
//			//$(this).parent().$("li").toggleClass("bg");
//			$(this).toggleClass("bg");
//		}
//	)
//	
//	$('#add_Per_sel').click(
//		function(){
//			$('#Per_sel_ul_1 li').each(function(i){
//				if ($(this).is(".bg")) { 
//					//alert($(this).find("label").text())
//					//alert($(this + " label").text());
//					$(this).removeClass("bg"); 
//					$(this).append("<span title='删除'></span>"); 
//					//$("#Per_sel_ul_2").parent().append($(this).html())
//					$(this).clone().prependTo("#Per_sel_ul_2"); 
//					$(this).remove();
//				} 
//			}); 
//		}
//	)
//	
//	$('#Per_sel_ul_2 li span').click(
//		function(){
//			var domid = $(this).parent("li")
//			$(this).remove();
//			domid.clone().prependTo("#Per_sel_ul_1"); 
//			domid.remove();
//		}
//	)  
//	
//	$('.Per_sel .d_title ul li').click(
//		function(){
//			$(this).siblings("li").removeClass("li_sel");
//			$(this).addClass("li_sel");
//		}
//	)
//	
//	
//	$('.Per_sel .type_sel #open_list').click(alert('ff');
//		function(){
//			if ($(this).siblings("ul").height() > 150) $(this).siblings("ul").height(150)
//			$(this).siblings("ul").toggle();
//		}
//	)
//	
	$('.Per_sel .type_sel ul li').hover(
		function () {
			$(this).addClass("m_out");
		},
		function () {
			$(this).removeClass("m_out");
		}
	)
//	
//	$('.Per_sel .type_sel ul li').click(
//		function () {
//			var sel_html = $(this).html();
//			sel_html = sel_html.replace(/&nbsp;/g, "");  
//			sel_html = sel_html.replace("-", "");  
//			$('.Per_sel .type_sel #sel_name').html(sel_html)
//			$(this).parent().toggle();
//		}
//	)
//
})
