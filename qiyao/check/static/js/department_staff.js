  
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
                otherParam:{"act":"62"},
                dataFilter: filter //异步获取数据时的数据预处理
            },
            edit: {
                drag: {
                    autoExpandTrigger: false,
                    prev: dropPrev,
                    inner: dropInner,
                    next: dropNext,
                    autoOpenTime: 200
                },
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            callback: {
                beforeClick: beforeClick,  //单击预处理回调函数
                onAsyncError: onAsyncError,
                onAsyncSuccess: onAsyncSuccess,
                beforeDrag: beforeDrag,  //拖拽预处理方法
                beforeDrop: beforeDrop,  //删除预处理方法
                beforeDragOpen: beforeDragOpen,
                onDrag: onDrag, //拖拽回调方法
                onDrop: onDrop,  //删除回调方法
                beforeExpand:beforeExpand, //展开节点回调方法
                onExpand: onExpand, //展开节点回调方法
                onCollapse:onCollapse, //折叠节点回调方法
                beforeRename: beforeRename, //重命名预处理方法
                onRename:onRename, //重命名回调方法
                beforeRemove: beforeRemove  //删除节点预处理方法
            }
        };
        //数据预处理方法
        function filter(treeId, parentNode, childNodes) {
            if (!childNodes) return null;
            for (var i=0, l=childNodes.length; i<l; i++) {
                childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
            }
            return childNodes;
        }
        var isdelete = true;//是否单击展开，折叠
        function beforeClick(treeId, treeNode) {
            if(treeNode.isParent){
                //alert(treeNode.tId);
                //新增子部门不允许访问员工--废弃
                if(treeNode.did == -1000){
                    return;
                }
                if(isdelete){
                    if(treeNode.did == -1){
                        //显示所有员工列表
                        self.employee_iframe.location.href = "staffView/deptid/"+treeNode.did;
                    }else{
                        //显示当前选中的节点的用户列表
                        self.employee_iframe.location.href = "staffView/deptid/"+treeNode.did;
                    }
                }
                if(isdelete && treeNode.did != -1){
                    $("#"+treeNode.tId+"_switch").click();
                }
                isdelete = true;
                
            }else{
                if(treeNode.eid){
                    //显示当前节点中选中员工的详细信息
                    self.employee_iframe.location.href = "staffView/userid/"+treeNode.eid;
                }
            }
            return true;
        }
        //用于拖拽成功后，更新右侧
        function reload(treeNodes){
            if(treeNodes.length > 0){
                for(var i=0,l=treeNodes.length;i<l;i++){
                    if(!treeNodes[i].isParent){
                        self.employee_iframe.location.reload();
                    }
                }
            }
            
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
                $("#tree").before('<div id="searchuserList" style="font-size: 12px;"></div>');
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
            //恢复初始
            myExpandNode(false);
            updateNodes(false); 
            $("#searchuserList").remove();
            $("#tree").show();            
            //不再显示员工文字高亮
            eid.splice(0,eid.length);
            //eid.splice(0,eid.length,obj.attr('eid'));
            did.splice(0,did.length);
            //用于ajax搜索记录
            /* var lidid=obj.attr('did');
            did=lidid.split(',');
            curdid = obj.attr('deptid'); */

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
						self.employee_iframe.location.href = "staffView/userid/"+obj.attr('eid');
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
                            //zTree.updateNode(nodes[i]);
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
        /*drag的有关函数*/
        function checknode(nodes,targetNode,movetype){
            //不允许员工节点拖拽到根节点下
            var pnode = targetNode.getParentNode();
            for(var i=0,l=nodes.length;i<l;i++){                
                if(targetNode.did ==-1 && !nodes[i].isParent){
                        return false;
                }
                if(movetype == "inner"){
                    
                }
                if(movetype =="prev" || movetype =="next"){                    
                    if(pnode && pnode.did==-1 && !nodes[i].isParent){
                        return false;
                    }
                }
                //员工节点不允许放在部门节点之间
                if(!nodes[i].isParent){
                    if(movetype == 'prev'){
                        if(!targetNode.isFirstNode){
                            prevnode = targetNode.getPreNode();
                            if(prevnode.isParent){
                                return false;
                            }
                        }
                    }
                    if(movetype =="next" && targetNode.isParent){
                        return false;
                    }
                }
                //部门节点不允许放在员工节点之间
                if(nodes[i].isParent){
                    if(movetype =="prev" && !targetNode.isParent){
                        return false;
                    }
                    if(movetype == "next"){
                        if(!targetNode.isLastNode){
                            nextnode = targetNode.getNextNode();
                            if(!nextnode.isParent){
                                return false;
                            }
                        }
                    }
                }
                
            }
            return true;
        }
        function dropPrev(treeId, nodes, targetNode) {
            var pNode = targetNode.getParentNode();
            if (pNode && pNode.dropInner === false) {
                return false;
            } else {
                for (var i=0,l=curDragNodes.length; i<l; i++) {
                    var curPNode = curDragNodes[i].getParentNode();
                    if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false && targetNode.isParent===false && !targetNode.isFirstNode) {
                        return false;
                    }
                }
            }
            if(!checknode(nodes,targetNode,"prev")){
                return false;
            }
            return true;
        }
        function dropInner(treeId, nodes, targetNode) {
            if(!targetNode)  return false;
            if (targetNode && targetNode.dropInner === false) {
                return false;
            } else {
                for (var i=0,l=curDragNodes.length; i<l; i++) {
                    if (!targetNode && curDragNodes[i].dropRoot === false) {
                        return false;
                    } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && targetNode.dropInner === false) {
                       
                        return false;
                    }
                }
            }
            if(!checknode(nodes,targetNode,"inner")){
                return false;
            }
            return true;
        }
        function dropNext(treeId, nodes, targetNode) {
            var pNode = targetNode.getParentNode();
            if (pNode && pNode.dropInner === false) {
                return false;
            } else {
                for (var i=0,l=curDragNodes.length; i<l; i++) {
                    var curPNode = curDragNodes[i].getParentNode();
                    if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false && targetNode.isParent===false) {
                        
                        return false;
                    }
                }
            }
            if(!checknode(nodes,targetNode,'next')){
                return false;
            }
            return true;
        }

        var className = "dark", curDragNodes, autoExpandNode;
        function beforeDrag(treeId, treeNodes) {
            return false;
            className = (className === "dark" ? "":"dark");
            for (var i=0,l=treeNodes.length; i<l; i++) {
                //未划分部门不允许拖拽
                if (treeNodes[i].did === -2) {
                    curDragNodes = null;
                    return false;
                }
                if (treeNodes[i].drag === false) {
                    curDragNodes = null;
                    return false;
                } else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
                    curDragNodes = null;
                    return false;
                }
            }
            curDragNodes = treeNodes;
            return true;
        }
        function beforeDragOpen(treeId, treeNode) {
            autoExpandNode = treeNode;
            return true;
        }
        function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
            if(!targetNode)  return false;
            //不允许部门节点拖拽到未划分部门节点下
            if(targetNode.did == -2){
                for(var i=0,l=treeNodes.length;i<l;i++){
                    if(treeNodes[i].isParent){
                        return false;
                    }
                }
            }
            //同一个父级部门不允许有同名的部门
            for(var g=0,gl=treeNodes.length;g<gl;g++){
                if(treeNodes[g].isParent){
                    var flag = true;
                    if(moveType == 'inner'){
                        var parent = targetNode;
                    }else{
                        var parent = targetNode.getParentNode();
                        if(targetNode.pid == treeNodes[g].pid){
                            flag = false;
                        }
                    }
                    if(parent.havechilren && flag){
                        var sub = parent.showsub;
                        if(sub){
                            for(var s=0,l=sub.length;s<l;s++){
                                if(sub[s].name == treeNodes[g].name && sub[s].id != treeNodes[g].did ){
                                    showinfo_tips("同级不允许有重名的部门");
                                    return false;
                                }
                            }
                        }
                    }
                    
                }
            }
            className = (className === "dark" ? "":"dark");
            return true;
        }
        //var parent= [];
        var single1;
        var single2;
        var moveNum=0;//移动的人数
        function onDrag(event, treeId, treeNodes) {
            //parent =[];
            moveNum = 0;
            className = (className === "dark" ? "":"dark");
            for(var i=0,l=treeNodes.length;i<l;i++){      
                //记录移动前的所有父结点(不包括根结点)用于更新部门人数                
                var p = treeNodes[i].getParentNode();
                single1=treeNodes[i];
                single2=p;
                if(treeNodes[i].isParent){
                    moveNum =moveNum*1+treeNodes[i].num;
                }else{
                    moveNum =moveNum*1+1;
                }
                /* while(p && p.did !=-1){
                    parent.push(p);
                    p = p.getParentNode();
                } */
                
            }
        }
        //批量更新父结点的人数
        function updateparentNum(parentnode,mnum,type){
            if(parentnode && parentnode.isParent && parentnode.did != -1){
                if(type=="add"){
                    var len = mnum * 1 + parentnode.num * 1;
                }else{
                    var len = parentnode.num * 1-mnum * 1;
                }
                if(len < 0){
                    len = 0;
                }
                parentnode.num = len;
                zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.updateNode(parentnode);
                var parent2 = parentnode.getParentNode();
                if(parent2){
                    updateparentNum(parent2,mnum,type);
                }
                
            }
        }
        //用于拖拽后的部门更新人数
        function updateNum(targetNode,moveType){
            zTree = $.fn.zTree.getZTreeObj("tree");
            updateparentNum(single2,moveNum,'remove')
            /* for(var j=0,ll=parent.length;j<ll;j++){
                var len = parent[j].num * 1-moveNum * 1;
                if(len<0){
                    len = 0;
                }
                parent[j].num=len;
                zTree.updateNode(parent[j]);
                //$("#"+parent[j].tId+"_span").text(parent[j].name+"("+len+")");
            } */
            if(targetNode.isParent && moveType=='inner'){
                var n = moveNum * 1 + targetNode.num * 1;
                targetNode.num=n;
                zTree.updateNode(targetNode);
                //$("#"+targetNode.tId+"_span").text(targetNode.name+"("+n+")");
            }
            var p=targetNode.getParentNode();
            updateparentNum(p,moveNum,"add");
            /* while(p && p.did !='-1'){
                //var children = zTree.getNodesByParam("isParent",false,p);
                
                var len2 = moveNum * 1+p.num * 1;
                if(len2<0){
                    len2 = 0;
                }
                p.num=len2;
                zTree.updateNode(p);
                //$("#"+p.tId+"_span").text(p.name+"("+len2+")");
                p = p.getParentNode();
            } */
            moveNum=0;
        }
        //用于拖拽后的部门更新子部门
        function updatesub(treeNodes,targetNode,moveType){
            zTree = $.fn.zTree.getZTreeObj("tree");
            var tparent = single2;
            for(var i=0,l=treeNodes.length;i<l;i++){
                if(!treeNodes[i].isParent) return;
                if(moveType == 'inner'){
                    var gparent = targetNode;
                }else{
                    var gparent = targetNode.getParentNode();
                }
                
                if(tparent){
                    var sub = tparent.showsub;
                    if(sub){
                        for(var s=0,l=sub.length;s<l;s++){
                            if(sub[s].name == treeNodes[i].name){
                                sub.splice(s,1);
                            }
                        }
                        
                        tparent.showsub = sub;
                        if(sub.length == 0){
                            tparent.havechilren = false;
                        }
                    }else{
                        tparent.havechilren = false;
                    }
                    zTree.updateNode(tparent);
                }
                if(gparent){
                    gparent.havechilren = true;
                    var gsub = gparent.showsub;
                    var newsub = new Object;
                    newsub.id = treeNodes[i].did;
                    newsub.name = treeNodes[i].name;
                    gsub.push(newsub);
                    gparent.showsub= gsub;
                    zTree.updateNode(gparent);
                }
                
            }
        }
        //更新排序值(部门与员工节点在树中的位置改变都需要调用此方法)
        function updateSort(treeNodes){
            for(var i=0,l=treeNodes.length;i<l;i++){
                if(!treeNodes[i]){
                    continue;
                }
                var treeNode = treeNodes[i];
                if(treeNode.did ==-1) return false;
                children = treeNode.getParentNode().children;
                var jsonstr = '';
                //[{"id":"1","sort":"2"},{"id":"3","sort":"4"},{"id":"4","sort":"5"}] 
                if(children){
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    var currentindex = zTree.getNodeIndex(treeNode);
                    jsonstr = jsonstr+'[';
                    for(var ci=0,cl=children.length;ci<cl;ci++){
                        if(children[ci].did != -2 && children[ci].isParent == treeNode.isParent){
                            if(children[ci].isParent){
                                id = children[ci].did;
                                jsonstr =jsonstr+'{"id":"'+id+'","pindex":"'+zTree.getNodeIndex(children[ci])+'"},';
                            }else{
                                id = children[ci].eid;
                                eparent = children[ci].getParentNode();
                                jsonstr =jsonstr+'{"id":"'+id+'","plevel":"'+eparent.level+'","pindex":"'+zTree.getNodeIndex(eparent)+'","elevel":"'+children[ci].level+'","eindex":"'+zTree.getNodeIndex(children[ci])+'"},';
                            }
                            
                        }
                    }
                    jsonstr = jsonstr.substr(0,jsonstr.length-1)+']';
                    if(treeNode.isParent){
                        var isparent = 1;
                        var pdid = 0;
                    }else{
                        var isparent = 2;
                        var pdid = treeNode.getParentNode().did;
                    }                    
                    /*$.ajax({
                    type:'post',
                    url:'ajax.request.php?act=214&isparent='+isparent+'&currentparent='+treeNode.did+'&currentlevel='+treeNode.level+'&pdid='+pdid,
                    data:'sort='+jsonstr,
                    timeout:20000
                    });*/
                }
            }
        }
        /* function moveright(treeNodes,moveType){
            if(moveType == 'inner'){
                for(var i =0,l=treeNodes.length;i<l;i++){
                    treenode = treeNodes[i];
                    if(treenode.isParent && treenode.isLastNode){
                        var prenode = treenode.getPreNode();
                        if(!prenode.isParent && prenode.level == treenode.level){
                            var children = treenode.getParentNode().children;
                            if(children){
                                var zTree = $.fn.zTree.getZTreeObj("tree");
                                for(var ci=children.length;ci>=0;ci--){
                                    if(!children[ci]){
                                        continue;
                                    }
                                    if(children[ci].isParent && children[ci].did !=-2 && children[ci].tId != treenode.tId){
                                        zTree.moveNode(children[ci],treenode,"next");
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } */

        //拖拽成功的事件处理
        function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
            className = (className === "dark" ? "":"dark");
            if(targetNode){
                if(targetNode.pid==-1){
                    //目标节点是根节点
                    var pdid='-3';
                }else{
                    var pdid=targetNode.getParentNode().did;
                }
                for(var i=0,l=treeNodes.length;i<l;i++){
                    if(single1.did == treeNodes[i].did){
                        var tpdid = single2.did;
                    } 
                    $.ajax({
                    url:'ajax.request.php?act=64&tdid='+treeNodes[i].did+'&teid='+treeNodes[i].eid+'&ttop='+treeNodes[i].top+'&tpdid='+tpdid+'&gdid='+targetNode.did+'&geid='+targetNode.eid+'&gtop='+targetNode.top+'&gpdid='+pdid+'&movetype='+moveType,
                    timeout:20000,
                    success:function(msg) {
                        try {
                            updateNum(targetNode,moveType);
                            updateSort(treeNodes);
                            updatesub(treeNodes,targetNode,moveType);
                            reload(treeNodes);
                        } catch(e) {}
                    },
                    error : function() {  
                        try {
                            updateNum(targetNode,moveType);
                        } catch(e) {}
                    }
                    });
                    
                }
            }
        }
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
            var addStr = "<span class='edit_node' id='addBtn_" + treeNode.tId
                + "' onfocus='this.blur();' title='' style='_zoom:1;z-index:"+(di++)+"'>操作<ul class='edit_action' id='edit_action_"+treeNode.tId+"' style='display:none;'>";
            var disdel = treeNode.num;//部门人数
            var root = treeNode.did;//不允许删除和重命名根节点
            var addstrli = '';
            var flag = false;
            if(varadd ==1){
                addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='add(\""+treeNode.tId+"\");' title=''>添加子部门</a></li>";
                flag = true;
            }
            if(root !=-1 && varedit ==1){
                addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='edit(\""+treeNode.tId+"\");' title=''>重命名</a></li>";
                flag = true;
            }
            /*if(root != -1 && varedit ==1){
                //prenode = treeNode.getPreNode();
                nextnode = treeNode.getNextNode();                
                if(!treeNode.isFirstNode && treeNode.isParent){
                    prevnode = treeNode.getPreNode();
                    if(prevnode.isParent){
                        addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='up(\""+treeNode.tId+"\");' title=''>同级上移</a></li>";
                    }else{
                        addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='noup(\""+treeNode.tId+"\");' title='' style='color:#aaa;cursor:default;'>同级上移</a></li>";
                    }
                }
                if(treeNode.isFirstNode && treeNode.isParent){
                    addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='noup(\""+treeNode.tId+"\");' title='' style='color:#aaa;cursor:default;'>同级上移</a></li>";
                }
                if(nextnode && nextnode.isParent && treeNode.isParent && !treeNode.isLastNode  && nextnode.did != -2){
                    addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='down(\""+treeNode.tId+"\");' title=''>同级下移</a></li>";
                }else{
                    addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='nodown(\""+treeNode.tId+"\");' title='' style='color:#aaa;cursor:default;'>同级下移</a></li>";
                }
            }*/
            if(disdel == 0 && root !=-1 && vardel == 1){
                addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='myremove(\""+treeNode.tId+"\");' title=''>删除</a></li>";
                flag = true;
            }
            if(disdel > 0 && root !=-1 && vardel == 1){
                addstrli =addstrli + "<li><a href='javascript:void(0)' onclick='return noremove(\""+treeNode.tId+"\");' title='该部门有员工，请先移除员工' style='color:#aaa;cursor:default;'>删除</a></li>";
                flag = true;
            }
            
            addStr = addStr + addstrli + "</ul></span>"
            if(flag){
                sObj.children(".curSelectedNode_bg").after(addStr);
            }
            $(".edit_action").hide();
            var btn = $("#addBtn_"+treeNode.tId);
            var editli = $("#edit_action_"+treeNode.tId);
            sObj.attr('notitle',sObj.attr('title'));
            if (btn) btn.bind("mouseover", function(){
                editli.show();
                sObj.attr('title','');
            });
            if (btn) btn.bind("mouseleave", function(){
                sObj.attr('title',sObj.attr('notitle'));
                editli.hide();
            });
            if (editli) editli.bind("mouseover", function(){
                editli.show();
                sObj.attr('title','');
            });
            if (editli) editli.bind("mouseleave", function(){
                sObj.attr('title',sObj.attr('notitle'));
                editli.hide();
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
        //增加子部门节点
        function add(tid){
            isdelete = false;
            var zTree = $.fn.zTree.getZTreeObj("tree");
            if(tid == "root"){
                var nodes = zTree.getSelectedNodes();
                treeNode = nodes[0];
                if(!treeNode){
                    treeNode = zTree.getNodeByTId("tree_1");
                }
            }else{
                treeNode = zTree.getNodeByTId(tid);
            }    
            zTree.selectNode(treeNode,false);    
            //nodes = zTree.getSelectedNodes();
            //treeNode = nodes[0];
            
            if(!treeNode || !treeNode.isParent){
                //没有选中节点,则默认为根节点
                //treeNode = zTree.getNodeByTId("tree_1");
                showinfo_tips("请先选一个部门");
                return;
            }
            var ddname =search_brother_node(treeNode,1);
            var ddid = 1000 + newCount;
            newCount++;
            $.cookie('newCount',newCount);
            var children = treeNode.children;
            var flag =true;
            var sort =0;
            if(children){
                for(var i =0,l=children.length;i<l;i++){
                    if(children[i].did == -1000){
                        flag =false;
                    }
                    //记录同级部门最小的排序值
                    if(children[i].isParent && children[i].did != -2){
                        if(children[i].top < sort){
                            sort = children[i].top;
                        }
                    }
                }
            }
            sort = sort - 1;
            if(sort < 0){
                sort = 0;
            }

            var str = 'dept='+encodeURIComponent(ddname)+'&pid='+treeNode.did+'&top='+sort;


            parentnode = treeNode.tId;//记录父结点
            //ajax增加部门节点 
            $.ajax({
                url:'/index.php/Default/ajax/addDepartment/dept/'+encodeURIComponent(ddname)+'/pid/'+treeNode.did+'/top/'+sort,
                timeout:20000,
                success:function(msg) {
                    try {
                        eval(msg);
                        subnode =obj.did//记录ajax生成的did
                        if(obj.status == 1){
                            showinfo_tips("添加部门成功",1);
                            if(typeof(obj.newname) !=='undefined' && ddname != obj.newname){
                                ddname = obj.newname;
                            }
                            var children = treeNode.children
                            if(children && children.length >0){
                                zTree.addNodes(treeNode, {id:ddid,isParent:true, pid:treeNode.did,did:subnode,num:0,drag:true,top:sort, name:ddname},false);
                            }else{
                                
                                zTree.reAsyncChildNodes(treeNode,"refresh");
                            }
                            if(children){
                                var treeNodes =[];
                                treeNodes.push(children[0])
                                updateSort(treeNodes);
                            }
                            //更新父结点的子部门信息
                            addupdelsub(subnode,ddname,parentnode,'add');
                            //因为是异步加载成功后才增加节点,所以需要延时加载此函数
                            setTimeout("add_select()",500);
                        }else{
                            go_type=false;
                            if(!treeNode.open){
                                zTree.reAsyncChildNodes(treeNode,"refresh");
                            }
                            zTree.selectNode(treeNode);
                            if(obj.status !=3){
                                showinfo_tips(obj.info,3);
                            }
                        }
                        
                    } catch(e) {}
                },
                error : function(msg) {  
                    showinfo_tips("添加部门失败",3);
                }
            });           
            
        }
        
        //编辑节点
        function edit(tid){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            treeNode = zTree.getNodeByTId(tid);
            zTree.selectNode(treeNode,false);
            
            //nodes = zTree.getSelectedNodes(),
            //treeNode = nodes[0];
            if (treeNode.length == 0) {
                showinfo_tips("请先选择一个部门");
                return;
            }
            //进入编辑状态
            zTree.editName(treeNode);
        }
        function beforeRename(treeId, treeNode, newName, isCancel){
            if (newName.length == 0) {
                showinfo_tips("请输入部门名称");
                var zTree = $.fn.zTree.getZTreeObj("tree");
                setTimeout(function(){zTree.editName(treeNode)}, 10);
                return false;
            }
            if(treeNode.name == newName){
                return true;
            }
            //检测类型
            var reg1 = new RegExp("^[`~%!@#^=''?~！@#￥……&——‘”“'？*()（），,。.、+-\/]{1}");
            var re = reg1.test(newName);
            if(/\s/.test(newName.charAt(0)) || re){
                showinfo_tips("1-50个字符，非符号或数字开头");
                return false;
            }
            var checkname = '';
            var checkname = newName.replace(/\s/g,'');
            checkname = checkname.replace(/[`~%!@#^=''?~！@#￥……&——‘”“'？*()（），,。.、+-\/]/g,'');
            var reg = new RegExp("^[a-zA-Z\u4e00-\u9fa5]{1}[a-zA-z0-9\u4e00-\u9fa5]{0,49}$");
            var rs = reg.test(checkname);
            if(!rs){
                showinfo_tips("1-50个字符，非符号或数字开头");
                return false;
            }
            //同级部门不能有重命名
            var parent = treeNode.getParentNode();
            if(parent){
                var children = parent.children;
                for(var i=0,l=children.length;i<l;i++){
                    if(children[i].name == newName){
                        showinfo_tips("该部门已存在");
                        var zTree = $.fn.zTree.getZTreeObj("tree");
                        setTimeout(function(){zTree.editName(treeNode)}, 10);
                        return false;
                    }
                }
                var pid =parent.did;
                var ptid =parent.tId;
            }else{
                var pid =-1;
                var ptid ='tree_1';
            }
            if(isCancel == false){
                $.ajax({
                        url:'/index.php/Default/ajax/renameDepartment/dept/'+encodeURIComponent(newName)+'/did/'+treeNode.did+'/pid/'+pid,
                        timeout:20000,
                        success:function(msg) {
                            try {
                                eval(msg);
                                if(obj.status ==1){
                                    //更新父结点的子部门信息
                                    addupdelsub(treeNode.did,newName,ptid,'rename');
                                    showinfo_tips("修改部门成功",1);
                                    return true;
                                }else{
                                    showinfo_tips("修改部门失败",3);
                                    return false;
                                }
                                
                            } catch(e) {}
                        },
                        error : function(msg) {
                            showinfo_tips("修改部门失败",3);
                            return false;
                        }
                    });
                return true;
            }
            return ture;
            
        }
        function onRename(){
            return false;
        }
        
        //删除节点
        function myremove(tid){
            var zTree = $.fn.zTree.getZTreeObj("tree")
            treeNode = zTree.getNodeByTId(tid);
            zTree.selectNode(treeNode,false);
            //nodes = zTree.getSelectedNodes();
            //treeNode = nodes[0];
            if (treeNode.length == 0) {
                showinfo_tips("请先选择部门");
                return;
            }
            if(treeNode.num > 0){
                showinfo_tips("该部门有所属员工，请先移除员工");
                return;
            } 
            oldname = '';
            zTree.removeNode(treeNode,true);
        }
        //不能删除节点的提示语
        function noremove(){
            isdelete = false;
            //showinfo_tips("该部门有员工，请先移除员工");
            return false;
        }
        //不能上移节点的提示语
        function noup(){
            isdelete = false;
            //showinfo_tips("已经是同级的第一位");
            return false;
        }
        function nodown(){
            isdelete = false;
            //showinfo_tips("已经是同级的最后一位");
            return false;
        }
        //调用removeNode删除之前的函数
        function beforeRemove(treeId, treeNode) {
            className = (className === "dark" ? "":"dark");
            var zTree = $.fn.zTree.getZTreeObj("tree");
            zTree.selectNode(treeNode);
            if(confirm("确定删除该部门？")){
                $.ajax({
                    url:'/index.php/Default/ajax/removeDepartment/did/'+treeNode.did,
                    timeout:20000,
                    success:function(msg) {
                        try {
                            eval(msg);
                            var zTree = $.fn.zTree.getZTreeObj("tree");
                            var parent = treeNode.getParentNode();
                            if(obj.status ==1){
                                showinfo_tips("删除部门成功",1);
                                if(parent){
                                    zTree.selectNode(parent);
                                    addupdelsub(treeNode.did,'',parent.tId,'remove');
                                }
                                return true;
                            }else{
                                showinfo_tips("删除部门失败",3);
                                return false;
                            }
                            
                        } catch(e) {}
                    },
                    error : function(msg) {
                        showinfo_tips("删除部门失败",3);
                        return false;
                    }
                });
            }else{
                return false;
            }
        }
        
        //用于增、改、删、移后的部门更新子部门
        function addupdelsub(id,name,ptid,type){
            if(!id) return;
            var zTree = $.fn.zTree.getZTreeObj("tree");
            var tparent = zTree.getNodeByTId(ptid);
            if(!tparent || !tparent.isParent) return;
            var sub = tparent.showsub;
            if(type == 'add'){
                var newitem = new Object;
                newitem.id = id;
                newitem.name = name;
                if(sub){
                    sub.push(newitem);
                }else{
                    sub = newitem;
                }
                tparent.havechilren = true;
            }
            
            if(type == 'rename'){
               
                if(sub){
                    for(var s=0,l=sub.length;s<l;s++){
                        if(sub[s].id == id){
                            sub[s].name = name;
                        }
                    }
                }
            }
            if(type == 'remove'){
                if(sub){
                    for(var s=0,l=sub.length;s<l;s++){
                        if(sub[s].id == id){
                            sub.splice(s,1);
                        }
                    }
                    if(sub.length == 0){
                        tparent.havechilren = false;
                    }
                    
                }
                
            }
            
            tparent.showsub= sub;
            zTree.updateNode(tparent);
            
        }
        
        //上移节点
        function up(tid){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            if(tid =='up'){
                nodes = zTree.getSelectedNodes();
            }else{
                treeNode = zTree.getNodeByTId(tid);
                zTree.selectNode(treeNode,false);
                var nodes =[];
                nodes.push(treeNode);
            }
            if (nodes.length == 0) {
                showinfo_tips("请先选择部门");
                return;
            }
            for(var i=0,l=nodes.length;i<l;i++){
                if(!nodes[i]){
                    continue;
                }
                treeNode = nodes[i];                
                if(treeNode.did == -1 || treeNode.did == -2 || !treeNode.isParent){
                    showinfo_tips("请先选择部门");
                    continue;
                }
                if(treeNode.isFirstNode){
                    showinfo_tips("已经在同级的第一位");
                    continue;
                }
                if(!treeNode.isFirstNode){
                    prevnode = treeNode.getPreNode();
                    if(!prevnode.isParent){
                        showinfo_tips("已经在同级的第一位");
                        continue;
                    }
                }
                prenode = treeNode.getPreNode();
                if(prenode){
                    moveType="prev";
                    if(prenode && prenode.isParent){
                        var targentnode = prenode;
                    }else{
                        children = treeNode.getParentNode().children;
                        if(children){
                            for(var ci = children.length;ci>=0;ci--){
                                    if(!children[ci]){
                                        continue;
                                    }
                                    if(children[ci].isParent && children[ci].did !=-2 && children[ci].tId != treeNode.tId){
                                        targentnode = children[ci];
                                        moveType="next";
                                        break;
                                    }
                            }
                        }
                    }
                    //有上级兄弟节点且是部门节点
                    if(targentnode){
                        zTree.moveNode(targentnode,treeNode,moveType,true);
                        //移动后更新右侧的操作区和a的title
                        updateHoverDom(treeNode);
                        //更新tree的排序值
                        var treeNodes =[];
                        treeNodes.push(treeNode);
                        updateSort(treeNodes);
                    }
                }
            }
            
        }
        //置顶或置底 type 1为顶  2为底
        function topbottom(type){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            nodes = zTree.getSelectedNodes();
            if(nodes){
                for(var i=0,l=nodes.length;i<l;i++){
                    //不允许操作根节点和未划分部门节点
                    if(!nodes[i]){
                        continue;
                    }
                    if(!nodes[i].isParent || nodes[i].did == -1 || nodes[i].did == -2){
                        showinfo_tips("请先选择部门");
                        continue;
                    }
                    if(type != 2){
                        if(nodes[i].isFirstNode){
                            showinfo_tips("已经在同级的第一位");
                            continue;
                        }
                        if(!nodes[i].isFirstNode){
                            prevnode = nodes[i].getPreNode();
                            if(!prevnode.isParent){
                                showinfo_tips("已经在同级的第一位");
                                continue;
                            }
                        }
                    }else{
                        if(nodes[i].isLastNode){
                            showinfo_tips("已经在同级的最后一位");
                            continue;
                        }
                        nextnode = nodes[i].getNextNode();
                        if(nextnode && !nextnode.isParent){
                            showinfo_tips("已经在同级的最后一位");
                            continue;
                        }
                    }
                    var children = nodes[i].getParentNode().children;
                    if(children){
                        if(type != 2){
                            for(var ci=0,l=children.length;ci<l;ci++){
                                if(!children[ci]){
                                    continue;
                                }
                                if(children[ci].isParent && children[ci].did !=-2){
                                    targentnode = children[ci];
                                    break;
                                }
                            }
                            moveType = 'prev';
                        }else{
                            for(var ci = children.length;ci>=0;ci--){
                                if(!children[ci]){
                                    continue;
                                }
                                if(children[ci].isParent && children[ci].did !=-2){
                                    targentnode = children[ci];
                                    break;
                                }
                            }
                            moveType = 'next';
                        }
                        if(targentnode.tId == nodes[i].tId){
                            showinfo_tips("已经在同级的第一位");
                            continue;
                        }
                        zTree.moveNode(targentnode,nodes[i],moveType,true);
                        //移动后更新右侧的操作区和a的title
                        updateHoverDom(nodes[i]);
                        //更新tree的排序值
                        var treeNodes =[];
                        treeNodes.push(nodes[i]);
                        updateSort(treeNodes);
                    }
                    
                }
            }else{
                showinfo_tips("请先选择部门");
                return false;
            }
        }
        //下移节点
        function down(tid){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            if(tid == 'down'){
                nodes = zTree.getSelectedNodes();
            }else{
                treeNode1 = zTree.getNodeByTId(tid);
                zTree.selectNode(treeNode1,false);
                var nodes =[];
                nodes.push(treeNode1);
            }
            if (nodes.length == 0) {
                showinfo_tips("请先选择部门");
                return;
            }
            for(var i=0,l=nodes.length;i<l;i++){
                treeNode = nodes[i];
                if(!treeNode){
                    continue;
                }
                if(treeNode.did == -1 || treeNode.did == -2 || !treeNode.isParent){
                    showinfo_tips("请先选择部门");
                    continue;
                }
                if(treeNode.isLastNode){
                    showinfo_tips("已经在同级的最后一位");
                    continue;
                }
                nextnode = treeNode.getNextNode();
                if(nextnode && !nextnode.isParent){
                    showinfo_tips("已经在同级的最后一位");
                    continue;
                }
                if(nextnode && nextnode.did ==-2){
                    showinfo_tips("已经在同级的最后一位");
                    continue;
                }
                if(nextnode && nextnode.isParent && !treeNode.isLastNode){
                    zTree.moveNode(nextnode,treeNode,'next',true);
                    //移动后更新右侧的操作区和a的title
                    updateHoverDom(treeNode);
                    //更新tree的排序值
                    var treeNodes =[];
                    treeNodes.push(treeNode);
                    updateSort(treeNodes);
                }
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
                        title = "鼠标选中岗位即可拖拽，修改岗位排序";
                    }else{
                        title = "鼠标选中部门即可拖拽，修改部门排序";
                    }
                }
            }else{
                parent = treeNode.getParentNode();
                if(parent){
                    if(parent.jid){
                        title = "鼠标选中员工即可拖拽，修改其所在岗位";
                    }else{
                        title = "鼠标选中员工即可拖拽，修改其所在部门";
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
            var url = "/index.php/Personnel/employee/index";
            if(treeNode && treeNode.did != -1 && treeNode.did != -2){
                url = url+"/did/"+treeNode.did;
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