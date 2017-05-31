// JavaScript Document

	$(document).ready(function(){
		chat_record_resize ();
	}); 
		   
	/*$(window).resize(function(){
		chat_record_resize ();		
	});*/

	function isnull(variable) {
		return variable == null ? true : false;
		//alert(!isnull(document.getElementById("ddddd")))
	}


	$(".con").css("overflow","hidden"); 
	$("#doc1").css("padding-bottom",0); 
	
	if (!isnull(document.getElementById("neworder_table"))){
		$("#doc1").css("position","relative"); 
		$("#doc1").css("z-inde","1"); 
	}
	
	function chat_record_resize (){
		
		if (!isnull(document.getElementById("neworder_table"))){
			//alert("普通工作单RESIZE()")
			
			hide_object("#Topic",0)
			hide_object("#Receive",0)
			hide_object("#neworder_edit",0)			
			
			$("#Topic").width($("#Topic").parent().width() - 30)
			$("#Receive").width($("#Receive").parent().width() - 5)
			$("#neworder_edit").width($("#neworder_edit").parent().width())
			
			
			
			show_object("#Topic",0)
			show_object("#Receive",0)
			show_object("#neworder_edit",0)
		}
		
		if (!isnull(document.getElementById("newmeg_table"))){
			//alert("短信群发RESIZE()")
			hide_object("#Topic",0)
			hide_object("#Receive",0)
			
			$("#Topic").width($("#Topic").parent().width() - 10)
			$("#Receive").width($("#Receive").parent().width() - 10)

			show_object("#Topic",0)
			show_object("#Receive",0)
		}
		
		if (!isnull(document.getElementById("template_table"))){
			//alert("模板编辑RESIZE()")
			
			
			hide_object("#Template",0)
			hide_object("#Topic",0)
			hide_object("#Receive",0)
			
			$("#Template").width($("#Template").parent().width()  - 138)
			$("#Topic").width($("#Topic").parent().width()  - 138)
			$("#Receive").width($("#Receive").parent().width()  - 138)

			show_object("#Template",0)
			show_object("#Topic",0)
			show_object("#Receive",0)
		}
		
		
		
		
		/*
		if (!isnull(document.getElementById("user_chat_record"))){
			//alert("用户聊天记录RESIZE()")
			
			$("#d_list_view").height(1);
			$("#d_record_view").height(1);
			$("#user_chat_record").height($(window).height() - 60); 
			$("#d_list_view").height($("#CR_per_list").height() - 48);
			$("#d_record_view").height($("#CR_per_list").height() - 69);
		}
		
		if (!isnull(document.getElementById("newItemorder_table"))){
			
			//alert("项目工作单RESIZE()")
			
			hide_object("#newItemorder_table input[rtype='istext']",0);
			hide_object("#newItemorder_table textarea",0);
			hide_object("#newItemorder_table div[rtype='istextarea']",0);
			
			$("#newItemorder_table input[rtype='istext']").width($("#newItemorder_table input[rtype='istext']").parent().width()-30);
			$("#newItemorder_table textarea").width($("#newItemorder_table textarea").parent().width()-30);
			$("#newItemorder_table div[rtype='istextarea']").width($("#newItemorder_table div[rtype='istextarea']").parent().width()-10);
			
			show_object("#newItemorder_table input[rtype='istext']",0);
			show_object("#newItemorder_table textarea",0);
			show_object("#newItemorder_table div[rtype='istextarea']",0);
			
			//$("input[name^='news']") 
		}
		
		if (!isnull(document.getElementById("Itemorder_table"))){
			
			hide_object("#Itemorder_table input[rtype^='istext']",0);
			hide_object("#Itemorder_table textarea",0);
			hide_object("#Itemorder_table div[rtype='istextarea']",0);
			
			$("#Itemorder_table input[rtype='istext']").width($("#Itemorder_table input[rtype='istext']").parent().width()-15);
			$("#Itemorder_table input[rtype='istext2']").width($("#Itemorder_table input[rtype='istext2']").parent().width()-105);
			$("#Itemorder_table textarea").width($("#Itemorder_table textarea").parent().width()-30);
			$("#Itemorder_table div[rtype='istextarea']").width($("#Itemorder_table div[rtype='istextarea']").parent().width()-25);
			
			show_object("#Itemorder_table input[rtype^='istext']",0);
			show_object("#Itemorder_table textarea",0);
			show_object("#Itemorder_table div[rtype='istextarea']",0);
			
			//$("input[name^='news']") 
		}*/

	}
	

	function iframeresize(){
		frame = top.document.getElementById("if_content");
		
		if (!isnull(frame)){
			chat_record_resize ();
		}
	}
	
	function show_object (itemstr,swidch){
		if (swidch) show_select(0)
		$(itemstr).show();
	}
	
	function hide_object (itemstr,swidch){
		if (swidch) show_select(1)
		$(itemstr).hide();
	}

$(function(){
	$("#perlist_swicth").click(
        function(){
            if($("#per_list").css('display') == "none" || $("#per_list").css('display') == ''){
                $("#per_list").show();
    			$(this).css("background-position","2px -46px");
    			chat_record_resize ();
            } else {
                $("#per_list").hide();
    			$(this).css("background-position","3px 4px");
    			chat_record_resize ();
            }
        }
	); 
})
