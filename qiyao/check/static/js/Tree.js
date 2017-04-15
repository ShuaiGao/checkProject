// JavaScript Document

$(function(){
	$('#Tree .com_name label').click(
		function(){
			$('#Tree_view').toggleClass("open");
			$(this).toggleClass("Enlarge");
			
		}
	)
	
	$('#Tree span label').click(
		function(){			
			$(this).toggleClass("Enlarge");
			$(this).parent().siblings(".Tree_view_sub").toggleClass("open");
		}
	)
	
	$("#Tree span").hover(
		function () {
			$(this).toggleClass("over");
		},
		function () {
			$(this).toggleClass("over");
		}
	); 
	
	
	$('.perS .d_title ul li').click(
		function(){
			$(this).siblings("li").removeClass("li_sel");
			$(this).addClass("li_sel");
		}
	)
	
	/*$('#d_list_view .group span').click(
		function(){
			$(this).parent().toggleClass("sel_d");
			$('#d_list_view .group').removeClass("show");
			$(this).parent().addClass("show");
			
			$(this).parent().next(".list_view_sub").toggleClass("open");
		}
	)*/
	
	$('#d_list_view li').click(
		function(){
			$(this).toggleClass("seled"); 
		}
	);
	
	
	$("#expression .index").toggle(
		function () {
			$("#expression").hide();
			$(this).css("background-position","2px -16px");
		},
		function () {
			$("#per_list").show();
			$(this).css("background-position","3px 4px");
		}
	)
	
})