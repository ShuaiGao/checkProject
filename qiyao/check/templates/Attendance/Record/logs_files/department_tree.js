  
        var setting = {
            data: {
                keep: {
                    parent: true,
                    leaf:true
                }
            },
            view: {
                addHoverDom: addHoverDom, //用户移动到节点上时的回调方法
                removeHoverDom: removeHoverDom,  //用户移除节点时的回调方法
                selectedMulti: false, //是否可以多选
                showLine: false  //是否显示节点连接线
            },
            async: {   //异步获取子节点
                enable: true,
                url:"/index.php/Default/Index/getSubDepartment",
                autoParam:["id", "name=n", "level=lv","did"],
                otherParam:{"act":"62"}
            },
            edit: {
                drag: {
                    autoExpandTrigger: true,
                    autoOpenTime: 200,
                    isMove:false
                },
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            callback: {
                beforeClick: beforeClick,  //单击预处理回调函数
                onAsyncError: onAsyncError,
                onAsyncSuccess: onAsyncSuccess,
                beforeExpand:beforeExpand, //展开节点回调方法
                onExpand: onExpand, //展开节点回调方法
                onCollapse:onCollapse //折叠节点回调方法
            }
        };
        var isdelete = true;//是否单击展开，折叠
        function beforeClick(treeId, treeNode) {
            var s_type = znodes.type;
            var search_parameters =  $('#is_search').val() == '' ? '' : $('#is_search').val();

            if(treeNode.isParent){
                //alert(treeNode.tId);
                //新增子部门不允许访问员工--废弃
                if(treeNode.did == -1000){
                    return;
                }
                if(isdelete){
                    if(treeNode.did == -1){
                        //显示所有员工列表
                        $('#type').attr('name','showall').val('1');
                        if(s_type == 1){
                           self.employee_iframe.location.href = "/index.php/Attendance/Record/showLogs/showall/1"+search_parameters;
                        }else{
                           self.employee_iframe.location.href = "/index.php/Attendance/Count/showRecord/showall/1"+search_parameters;
                        }
                    }else{
                        //显示当前选中的节点的用户列表
                        $('#type').attr('name','deptid').val(treeNode.did);
                        if(s_type == 1){
                            self.employee_iframe.location.href = "/index.php/Attendance/Record/showLogs/deptid/"+treeNode.did+search_parameters;
                        }else{
                            self.employee_iframe.location.href = "/index.php/Attendance/Count/showRecord/deptid/"+treeNode.did+search_parameters;
                        }

                    }
                }
                if(isdelete && treeNode.did != -1){
                    $("#"+treeNode.tId+"_switch").click();
                }
                isdelete = true;

            }else{
                if(treeNode.eid){
                    //显示当前节点中选中员工的详细信息
                    $('#type').attr('name','eid').val(treeNode.eid);
                    if(s_type == 1){
                        self.employee_iframe.location.href = "/index.php/Attendance/Record/showLogs/account/"+treeNode.account+search_parameters;
                    }else{
                        self.employee_iframe.location.href = "/index.php/Attendance/Count/showRecord/aid/"+treeNode.account+search_parameters;
                    }

                }
            }
            return true;
        }

        //搜索的有关函数        
        //key失去焦点
        //ajax获取搜索到的节点的did和eid
        //需要展开的部门ID
        var did=[];
        //需要展开的最低的节点的部门ID
        var curdid;
        //需要高亮的员工ID
        var eid=[];
        //var nodeList = [];
        
        //用于判断是否是搜索
        var blurflag=false;
        //用于记录第一次搜索不要折叠一级节点
        //var removeflag = false;
        //判断值是否在数组里
        function isCon(arr,val){
        for(var i=0; i<arr.length; i++){
            if(arr[i] == val)
                return true;
        }
        return false;
        }
        //折叠全部的一级节点
        function expandNoderoot() {
            var zTree = $.fn.zTree.getZTreeObj("tree");
            var root  = zTree.getNodeByTId("tree_1");
            var children  = root.children;  //获取所有的一级节点
            if(children && children.length >0){
                for(var i =0,l=children.length;i<l;i++){
                    if(children[i].zAsync){
                        zTree.expandNode(children[i],false,false,false,true);
                    }
                }
                removeflag = false;
            }    
        }
        //获取所用的用户
        function reuserlist(){
            //重新加载UserList
            delete top.UserList.all['group'];
            top.UserList.init();
            //console.log(top.UserList);
        }
        //key获得焦点事件
        function focusKey(e) {
            setTimeout(function(){reuserlist();}, 800);
            if (key.hasClass("empty")) {
                key.removeClass("empty");
            }
            blurflag=false;
            if(key.val() == '输入关键字查找员工') {
                key.val('');
            }
            /* if(key.val() !=''){
                expandNoderoot();
            } */
        }
        //key失去焦点事件
        function blurKey(e) {
            if (key.get(0).value === "") {
                key.addClass("empty");
                key.val('输入关键字查找员工');
                $("#searchuserList").remove();
                $("#tree").show();
            }            
        }
        //避免频繁搜索
        function search_sleep(){
            setTimeout(function(){searchNode();}, 800);
        }
        //搜索框的ajax搜索事件,搜索用户
        function searchNode(){
            var val =key.get(0).value;
            if (key.get(0).value === "" || key.get(0).value === "输入关键字查找员工") {
                key.addClass("empty");
                updateNodes(false);
                return false;
            }
            
            if(val != '') {
                expandNoderoot();
                var uid_ids = '';
                var userList = top.UserList.all;

                $("#tree").hide();
                $("#searchuserList").remove();
                $("#tree").before('<div id="searchuserList"></div>');
                $('#searchuserList').append('<li style="padding-left:20px;"><div class="com_name">查找结果</div><ul id="search_res"></ul></li>');

                for(i in userList['member']) {
                    var m = userList['member'][i];
                    if(m['realname'].indexOf(val) != -1 || m['username'].indexOf(val) != -1 || m['account'].indexOf(val) != -1) {
                        $('#search_res').append('<li onclick="showtree($(this));" deptid="'+m['deptid']+'" name="'+m['realname']+'" account="'+m['account']+'" uid="'+m['uid']+'" eid="'+m['eid']+'"><img width="20" height="20" src="'+m['pic']+'" />'+m['realname']+'('+m['account']+')</li>');
                        uid_ids += m['uid']+',';
                    }
                }
                //成功获取did,eid的标志
                blurflag = true;
                if(uid_ids == ''){
                    $('#search_res').append('<li style="text-align:center">暂无相关搜索结果</li>');
                    blurflag=false;
                }
                $('#search_res').show();
            }

        }
        //展开用户点击搜索到用户的节点数据
        function showtree(obj){
            var s_type = znodes.type;
            //恢复初始
            myExpandNode(false);
            updateNodes(false); 
            $("#searchuserList").remove();
            $("#tree").show();            
            //不再显示员工文字高亮
            eid.splice(0,eid.length);
            //eid.splice(0,eid.length,obj.attr('eid'));
            did.splice(0,did.length);
			var search_parameters =  $('#is_search').val() == '' ? '' : $('#is_search').val();
			$('#type').attr('name','eid').val(obj.attr('eid'));
            //异步请求当前选中用户的相关数据
            if(obj.attr('eid')){
                $.ajax({
                url:'/index.php/Default/Ajax/getUserDepartment/eid/'+obj.attr('eid'),
                success:function(msg) {
                    try {
                        eval(msg);
                        var lidid=member.parentids;
                        did=lidid.split(',');
                        curdid =member.did;
                        //展开节点
                        blurflag=true;
                        onAsyncSuccess();
                        if(s_type == 1){
                            self.employee_iframe.location.href = "/index.php/Attendance/Record/showLogs/account/"+obj.attr('account')+search_parameters;
                        }else{
                            self.employee_iframe.location.href = "/index.php/Attendance/Count/showRecord/aid/"+obj.attr('account')+search_parameters;
                        }

                    } catch(e) {}
                }
                });
                
            }
        }
        
        //用于展开，折叠指定的节点,默认展开
        function myExpandNode(flag){
            isdelete = false;
            zTree = $.fn.zTree.getZTreeObj("tree");
                var nodes = zTree.transformToArray(zTree.getNodes());
                if(nodes.length == 0){
                    return false;
                }
                for (var i=0, l=nodes.length; i<l; i++) {
                    if(nodes[i].isParent){
                        if(isCon(did,nodes[i].did)){
                            zTree.expandNode(nodes[i], flag, null, null);
                        }
                        //折叠时不要执行此代码
                        if(curdid == nodes[i].did && flag ==true){
                            zTree.selectNode(nodes[i],false);
                            if(blurflag == true){//搜索且展开部门节点时,触发点击事件
                                beforeClick(zTree.setting.treeId,nodes[i]);
                                blurflag = false;
                            }
                        }
                    }else{
                        if(isCon(eid,nodes[i].eid)){
                             //nodes[i].highlight = flag;
                            zTree.updateNode(nodes[i]);
                            blurflag=false;
                        }
                    }
                }
        }
        
        function onAsyncSuccess(event, treeId, treeNode, msg){
            //用于搜索后再执行的展开节点
            if(blurflag){
                myExpandNode(true);
            }
        }

        function updateNodes(highlight) {
            var zTree = $.fn.zTree.getZTreeObj("tree");
            var nodeList = zTree.transformToArray(zTree.getNodes());
            for( var i=0, l=nodeList.length; i<l; i++) {
                nodeList[i].highlight = highlight;
                zTree.updateNode(nodeList[i]);
            }
        }
                
        function onAsyncError(){
        }
        var className = "dark", curDragNodes, autoExpandNode;
        //展开节点前事件,修复--拖拽成功后，未加载的节点不能再加载的BUG
        function beforeExpand(treeId, treeNode){
            if(treeNode.havechilren || treeNode.num>0){
                if($("#"+treeNode.tId+"_ul").children('li').length <=0){
                    $("#"+treeNode.tId+"_ul").remove();
                }
            }
        }
        
        //展开节点事件,ajax预加载子节点
        function onExpand(event, treeId, treeNode) {
            if (treeNode === autoExpandNode) {
                className = (className === "dark" ? "":"dark");
            }
            var zTree = $.fn.zTree.getZTreeObj("tree");
            if(!treeNode.zAsync && !treeNode.isAjaxing){
                zTree.reAsyncChildNodes(treeNode,"refresh",true,true);
            }
            if(!treeNode.zAsync && treeNode.isAjaxing){
                $('#'+treeNode.tId+"_ico").attr("class","button ico_loading");
            }
            setTimeout("ajaxonload('"+treeNode.tId+"','2')",500);
            
        }
        //折叠节点事件,删除cookie记录里有关的did
        function onCollapse(event, treeId, treeNode){
            //修复没子节点的节点折叠后无法再次加载显示的BUG
            if(!treeNode.havechilren && treeNode.num==0){
                if($("#"+treeNode.tId+"_ul").children('li').length <=0){
                    $("#"+treeNode.tId+"_ul").remove();
                }
            }
            if(treeNode.isParent && treeNode.num >=30 && treeNode.zAsync && treeNode.did !=-1 && key.val() !='' && key.val() !='输入关键字查找员工'){
                var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.removeChildNodes(treeNode);
                $("#"+treeNode.tId+"_ul").remove();
                treeNode.zAsync = false;
                zTree.updateNode(treeNode);
            }
        }
        //用于初始化展开上次展开的节点
        function expandNodeCookie(cookie){
            //取出cookie的did,并展开节点
        }
        
        //关于节点操作的函数-开始
        //var newCount = 1;
        if($.cookie('newCount')==null || $.cookie('newCount')==''){
            $.cookie('newCount',1);
            var newCount = 1;
        }else{
            var newCount = $.cookie('newCount');
        }
        var di =1;
        
        function addHoverDom(treeId, treeNode) {            
            if(!treeNode.isParent) return;
            if(treeNode.did == -2) return;
            if(dept_edit != 1) return;
            var sObj = $("#" + treeNode.tId + "_a");
            if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
            var addStr = "<span id='addBtn_" + treeNode.tId
                + "' onfocus='this.blur();' title='' style='_zoom:1;z-index:"+(di++)+"'><input type='checkbox'/></span>";
            var disdel = treeNode.num;//部门人数
            var root = treeNode.did;//不允许删除和重命名根节点
            sObj.children(".curSelectedNode_bg").after(addStr);
            $(".edit_action").hide();
            var btn = $("#addBtn_"+treeNode.tId);
            sObj.attr('notitle',sObj.attr('title'));
            if (btn) btn.bind("mouseover", function(){
                sObj.attr('title','');
            });
            if (btn) btn.bind("mouseleave", function(){
                sObj.attr('title',sObj.attr('notitle'));
            });
        }
        function removeHoverDom(treeId, treeNode) {
            $("#addBtn_"+treeNode.tId).unbind().remove();
        }
        var parentnode;
        var subnode;
        function add_select(){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            var parent = zTree.getNodeByTId(parentnode);
            var children = parent.children;
            if(children){
                for(var i=0,l=children.length;i<l;i++){
                    if(children[i].did == subnode){
                        zTree.selectNode(children[i]);
                    }
                }
            }
        }
        //查找同级兄弟节点，查找是否有同名的新的部门,返回新部门的名字
        //var oldname = '';//记录旧名字，避免重复
        function search_brother_node(treeNode,count){
            children = treeNode.children;
            if(children){
                var newname = "新的部门" + (count++);
                flag = true;
                for(var i =0,l=children.length;i<l;i++){
                    if((children[i].isParent && children[i].name == newname)){
                        flag = false;
                        return search_brother_node(treeNode,count);
                        break;
                    }
                }
                if(flag){
                    return newname;
                }
            }else{
                return "新的部门1";
            }
        }

        function updateHoverDom(treeNode){
            removeHoverDom("",treeNode);
            addHoverDom("",treeNode);
            
            if(treeNode.isParent){
                if(treeNode.did == -1 || treeNode.did ==-2 || treeNode.jid ==-1 || treeNode.jid ==-2){
                    title = "";
                }else{
                    if(treeNode.jid){
                        title = "";
                    }else{
                        title = "";
                    }
                }
            }else{
                parent = treeNode.getParentNode();
                if(parent){
                    if(parent.jid){
                        title = "";
                    }else{
                        title = "";
                    }
                }
            }
            if(title){
                $('#'+treeNode.tId+"_a").attr("title",title);
                $('#'+treeNode.tId+"_a").attr("notitle",title);
            }
        }
        
        //关于节点操作的函数-结束
        //添加员工跳转的函数
        function go_location(){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            var nodes = zTree.getSelectedNodes();
            var treeNode = nodes[0];
            var url = "company_manage.php?act=add";
            if(treeNode && treeNode.did != -1 && treeNode.did != -2){
                url = url+"&did="+treeNode.did;
            }
            location.href=url;
        }
        
        //ajax预加载子节点
        function ajaxonload(tId,showloading){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            treenode = zTree.getNodeByTId(tId);
            if(treenode && treenode.did != -2){
                var children = treenode.children;
                if(children){
                    if(showloading == '2'){
                        isshowloading = false;
                    }else{
                        isshowloading = true;
                    }
                    for(var i=0,l=children.length;i<l;i++){
                        //有部门子节点或员工子节点
                        //alert(children[i].name);
                        if(children[i].havechilen || children[i].num > 0){
                            if(!children[i].isAjaxing && !children[i].children && !children[i].zAsync){
                                zTree.reAsyncChildNodes(children[i],"refresh",true,isshowloading);
                            }
                        }
                    }
                }
            }
        }
        //重新刷新树
        function treereload(){
            //$.fn.zTree.destroy();
            var zTree = $.fn.zTree.init($("#tree"), setting);
            setTimeout(function(){
                zTree.selectNode(zTree.getNodeByTId("tree_1"));
                },1000);
            //window.location.reload();
            
        }
        var key;
        $(document).ready(function(){
            var zTree = $.fn.zTree.init($("#tree"), setting,znodes);
            zTree.selectNode(zTree.getNodeByTId("tree_1"));
            //setTimeout("ajaxonload('tree_1','2')",2000);
            key = $("#key");
            key.bind("focus", focusKey)
            .bind("blur", blurKey)
            .bind("keyup", search_sleep);
            $('.Per_sel_Search').click(function(){searchNode();});
            window.scrollTo(0,0);
        });