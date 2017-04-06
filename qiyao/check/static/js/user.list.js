// JavaScript Document
var UserList = {
    select_obj : null,
    parent : null,
    liobj : null,
    all : [],
    type:1,
    subs:2,
    len:12,
    right_len:14,
    left_scroll_top:0,
    right_scroll_top:0,
    select_arr:new Array(),
    left_index:new Array(),
    right_index:new Array(),
    right_arr:new Array(),
    init:function() {
        obj = this;
        if(typeof this.all['group']=='undefined') {
            $.ajax({
                url:'/index.php/Default/index/getUserList',
                success:function(msg) {
                    try{
                        eval(msg);
                    } catch(e){console.log(e)}
                }
            });
        }
    },
    reset : function() {
        $('#userlist_group').val('');
        this.add_list();
    },
    left_click:function (obj) {
        var i = obj.attr('count');
        if(obj.hasClass("bg")){
            this.select_arr.splice(obj.attr('select'), 1);
            obj.removeAttr('select');
        }else{
            obj.attr('select', this.select_arr.length);
            this.select_arr.push(i);

        }
        obj.toggleClass("bg");
    },
    left_dbclick:function (obj) {
        var i = obj.attr('count');
        obj.remove();
        this.right_index.push(this.left_index[i]);
        this.left_index.splice(i, 1);
        this.left_scroll();
        this.all_num();
        this.show_right();
        this.select_arr = new Array();
    },
    add_group_list:function(){
        var html = '<li id="dept" val="1" v="-1" onmouseover="$(this).addClass(\'m_out\');" onmouseout="$(this).removeClass(\'m_out\');" onclick="sel_name($(this), 2);">&nbsp;'+this.all['company']+'</li>';
        for(i in this.all['group']){
            if(this.all['group'][i]['id'] != '' && typeof(this.all['group'][i]['id']) !='undefined'){
                html += '<li onmouseover="$(this).addClass(\'m_out\');" onmouseout="$(this).removeClass(\'m_out\');" onclick="sel_name($(this), 2);" v="'+this.all['group'][i]['id']+'">&nbsp;&nbsp;'+this.all['group'][i]['pre']+'-&nbsp;'+this.all['group'][i]['name']+'</li>';
            }

        }
        html += '<li v="0" onmouseover="$(this).addClass(\'m_out\');" onmouseout="$(this).removeClass(\'m_out\');" onclick="sel_name($(this), 2);">&nbsp;&nbsp;-&nbsp;无部门</li>';
        $('#userlist_group').append(html);

    },
    add_left_arr:function(info){
        this.left_index = new Array();
        if(typeof(info)!='undefined' && info['first'] != ''){
            if($('#dept').attr('val') == 1){
                var type = 'deptid';
            }else{
                var type = 'jobid';
            }
        }
        /*var arr = this.right_index;
         arr.sort();*/
        var arr = new Array();
        for(i in this.right_index){
            arr[this.right_index[i]] = this.right_index[i];
        }
        for(i in this.all['member']) {
            var m = this.all['member'][i];
            if(this.subs == 2 || (this.subs && (','+this.subs+',').indexOf(','+m['uid']+',') != -1)) {
                var flag = true;
                if(typeof(info)!='undefined'){
                    var flag1 = false;
                    if(typeof(type)!='undefined'){
                        if(info['first'].indexOf(','+m[type]+',') < 0){
                            flag1 = true;
                        }
                    }

                    if(info['second'] == ''){
                        if(flag1 == true){
                            flag = false;
                        }
                    }else{
                        if(m['realname'].indexOf(info['second']) != -1 || m['username'].indexOf(info['second']) != -1){
                            if(typeof(type)!='undefined'){
                                if(info['first'].indexOf(','+m[type]+',') == -1){
                                    flag = false;
                                }
                            }
                        }else{
                            if(typeof(type)!='undefined'){
                                if(info['first'].indexOf(','+m[type]+',') == -1 || (m['realname'].indexOf(info['second']) == -1 && m['username'].indexOf(info['second']) == -1)){
                                    flag = false;
                                }
                            }else{
                                flag = false;
                            }
                        }
                    }

                }
                /*if(flag == true && arr[0] && typeof(m['uid']) != 'undefined'){
                 var res = binarySearch(arr, m['uid']);
                 if(res != -1){
                 flag = false;
                 }
                 }*/
                if(flag == true && typeof(m['uid']) != 'undefined' && typeof(arr[m['uid']]) == 'undefined'){
                    this.left_index.push(m['uid']);
                }
            }
        }

        this.left_index.sort();
    },
    add_list:function () {
        var html = '';
        var num = 0;

        num = this.left_index.length;
        var count = this.len;
        count = count>num ? num:count;

        for(i=0; i<count; i++){
        	m = this.all['member'][this.left_index[i]];
        	if(typeof(m) != 'undefined'){
				 if(this.mobile == null){
	                html += '<li onDblClick="UserList.left_dbclick($(this));" onclick="UserList.left_click($(this));" right="0" id="'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['account']+')</label></li>';
	            }else{
	                html += '<li onDblClick="UserList.left_dbclick($(this));" onclick="UserList.left_click($(this));" right="0" id="'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['mobile']+')</label></li>';
	            }
			}
        }

        html += '<li id="last_li" style="height:'+(num-count)*22+';"></li>';

        $('#userlist_all_num').text(num);

        $('#userlist_left').html(html);

        $('#addall').prev('a').remove();
        $('#left_scroll').scrollTop(0);
    },
    auto_scroll:false,
    select_scroll:function(type){
        clearTimeout(this.auto_scroll);
        if(type){
            this.auto_scroll = setTimeout(function(){
                UserList.right_scroll();
            }, 100);
        }else{
            this.auto_scroll = setTimeout(function(){
                UserList.left_scroll();
            }, 100);
        }
    },
    left_scroll:function(){
        var scroll_top = $('#left_scroll').scrollTop();
        var i = Math.ceil(scroll_top/22);
        var num = this.left_index.length;
        var lis = $('#left_scroll li[right="0"]').map(function(){
            return $(this).attr('count');
        }).get().length;

        if(num>i && (lis != this.len-1 || typeof($('#first_li').attr('id')) == 'undefined' || scroll_top < this.left_scroll_top)){
            var count = i + this.len;
            count = count>num ? num:count;
            var html = '';
            if(scroll_top != 0){
                html = '<li id="first_li" style="height:'+scroll_top+'; visibility:hidden; display:block;"></li>';
            }
            for(i; i<count; i++){
                m = this.all['member'][this.left_index[i]];
                if(m != '' && typeof(m) != 'undefined'){
                    if(this.mobile == null){
                        html += '<li onDblClick="UserList.left_dbclick($(this));" onclick="UserList.left_click($(this));" right="0" id="'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['account']+')</label></li>';
                    }else{
                        html += '<li onDblClick="UserList.left_dbclick($(this));" onclick="UserList.left_click($(this));" right="0" id="'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['mobile']+')</label></li>';
                    }
                }
            }

            html += '<li id="last_li" style="height:'+(num-count+1)*22+';"></li>';
            $('#userlist_left').html(html);
            this.all_num();
        }

        this.left_scroll_top = scroll_top;
    },
    right_scroll:function(){
        var scroll_top = $('#right_scroll').scrollTop();
        var i = Math.ceil(scroll_top/22);
        var num = this.right_index.length;
        var lis = $('#right_scroll li[right="1"]').map(function(){
            return $(this).attr('count');
        }).get().length;
        if(num>i && (lis != this.right_len-2 || scroll_top < this.right_scroll_top)){
            var count = i + this.right_len;
            count = count>num ? num:count;
            var html = '';
            if(scroll_top != 0){
                html = '<li style="height:'+scroll_top+'; visibility:hidden; display:block;"></li>';
            }
            for(i; i<count; i++){
                m = this.all['member'][this.right_index[i]];
                if(this.mobile == null){
                    html += '<li onclick="UserList.remove($(this))" id="r_'+m['uid']+'" right="1" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['account']+')</label><span title="删除"></span></li>';
                }else{
                    html += '<li onclick="UserList.remove($(this))" id="r_'+m['uid']+'" right="1"  count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['mobile']+')</label><span title="删除"></span></li>';
                }
            }

            html += '<li style="height:'+(num-count+1)*22+';"></li>';
            $('#userlist_right').empty();
            $('#userlist_right').append(html);
        }
        this.right_scroll_top = scroll_top;
    },
    add_list_job:function (type) {
        var html = '<li id="dept" val="2" v="-1" onmouseover="$(this).addClass(\'m_out\');" onmouseout="$(this).removeClass(\'m_out\');" onclick="sel_name($(this), 1);">&nbsp;'+this.all['company']+'</li>';
        for(i in this.all['job']){
            if(this.all['job'][i]['id'] !='' && typeof(this.all['job'][i]['id']) != 'undefined' ){
                html += '<li onmouseover="$(this).addClass(\'m_out\');" onmouseout="$(this).removeClass(\'m_out\');" onclick="sel_name($(this), 1);" v="'+this.all['job'][i]['id']+'">&nbsp;&nbsp;'+this.all['job'][i]['pre']+'-&nbsp;'+this.all['job'][i]['name']+'</li>';
            }
        }
        html += '<li v="0" onmouseover="$(this).addClass(\'m_out\');" onmouseout="$(this).removeClass(\'m_out\');" onclick="sel_name($(this), 1);">&nbsp;&nbsp;-&nbsp;无岗位</li>';

        $('#userlist_group').append(html);

        this.add_list();
    },
    get_m:function(i){
        var m = this.all['member'][i];
        if(typeof(m) == 'undefined' && typeof(this.all['leave_member'][i]) != 'undefined'){
            m = this.all['leave_member'][i];
        }
        return m;
    },
    show_right:function(){
        var html = '';
        var num = 0;

        num = this.right_index.length;
        var count = this.right_len;
        count = count>num ? num:count;

        for(i=0; i<count; i++){
            m = this.all['member'][this.right_index[i]];
            /*if(typeof(m) == 'undefined'){
             m = this.all['leave_member'][this.right_index[i]];
             }*/
            if(typeof(m) != 'undefined'){
                if(this.mobile == null){
                    html += '<li onclick="UserList.remove($(this))" id="r_'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['account']+')</label><span title="删除"></span></li>';
                }else{
                    html += '<li onclick="UserList.remove($(this))" id="r_'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['mobile']+')</label><span title="删除"></span></li>';
                }
            }
        }

        html += '<li style="height:'+(num-count+1)*22+';"></li>';

        $('#userlist_right').html(html);

        this.select_num();

        $('#right_scroll').bind('scroll', function(){
            UserList.select_scroll(1);
        });
        $('#right_scroll').scrollTop(0);
    },
    seletedToRight:function() {
//        this.select_arr =  this.select_arr.unique();
        this.select_arr =  arr_unique(this.select_arr);
        var len = this.select_arr.length;
        if(len>0){
            var arr = new Array();
            for(i=0; i<len; i++){
                var id = this.left_index[this.select_arr[i]];
                arr.push(id);
                this.right_index.push(id);
                var obj = $('#'+id);
                obj.remove();
            }

            for(i=0; i<len; i++){
                this.left_index.splice(binarySearch(this.left_index, arr[i]), 1);
            }
            this.select_arr = new Array();
            this.left_scroll();
            this.show_right();
        }
    },
    allToRight:function() {
        document.getElementById('if_content').contentWindow.onunload_check = false;
        $('#userlist_left').empty();
        $('#userlist_all_num').text('0');
        this.right_index = this.right_index.concat(this.left_index);
        this.left_index = new Array();
        this.show_right();
        this.add_list();
        setTimeout("document.getElementById('if_content').contentWindow.onunload_check = true;", 1);
    },
    toLeft:function() {
        $('#userlist_right li').each(function(){
            if($(this).hasClass('bg')){
                UserList.remove($(this).attr('id').substr(2));
            }
        });
    },
    allToLeft:function() {
        document.getElementById('if_content').contentWindow.onunload_check = false;
        $('#userlist_right').empty();
        $('#userlist_selected_num').text('0');
        this.left_index = this.left_index.concat(this.right_index);
        this.right_index = new Array();
        this.add_list();
        this.show_right();
        setTimeout("document.getElementById('if_content').contentWindow.onunload_check = true;", 1);
    },
    toRight:function(obj) {
        if(obj) {
            if(obj.length < 1) return false;	//处理离职后
            var id = obj.attr('id');
            if($('#r_'+id).length == 0) {
                var html = '<li onclick="UserList.remove(\''+id+'\')" id="r_'+id+'" v="'+obj.attr('v')+')">'+obj.html()+'<span title="删除"></span></li>';
                $('#userlist_right').append(html);
                $('#userlist_selected_num').text(parseInt($('#userlist_selected_num').text())+1);
            }
            obj.attr('right','1');
            obj.removeClass('bg');
            obj.hide();
        }else return false;
    },
    remove:function (obj) {
        var i = obj.attr('count');
        this.left_index.push(this.right_index[i]);
        obj.remove();
        this.right_index.splice(i, 1);
        this.left_scroll();
        this.all_num();
        this.select_num();
        this.right_scroll();
    },
    all_num:function(){
        $('#userlist_all_num').text(this.left_index.length);
    },
    select_num:function(){
        $('#userlist_selected_num').text(this.right_index.length);
    },
    sms_content:null,
    submit : function () {
        var id_str = '';
        if(this.right_index[0]){
            id_str = this.right_index.join(',');
        }

        this.select_obj.val(id_str);

        closefloathint();
        if(this.parent) {
            showfloathint(this.parent);
        }

        if(this.sms != null) {
            this.sms_content = $('#sms_content').val();
            setCookie('s_userlist',id_str.substr(1));
            setCookie('s_content',this.sms_content);
        }
        this.mobile = null;
        top.ifr_callback('userlist_callback('+this.type+','+this.sms+')');
    },
    cance:function () {
        this.sms = null;
        this.sms_content = null;
        this.mobile = null;
        closefloathint();
        if(this.parent) {
            showfloathint(this.parent);
        }
    },
    sms:null,
    mobile:null,
    show:function (obj,type,parent,sms,mobile,subs) {
        this.right_index = new Array();
        this.type = type;
        //this.reset();	
        this.select_obj = $(obj).next('input');
        this.parent = parent;
        if(mobile != null) {
            this.mobile = mobile;
        }
        if(typeof(subs) != 'undefined') {
            if(subs != null){
                subs = subs.replace(/^,*|,*$/, '');
            }

            if(subs != null){
                this.subs = subs;
            }
        }
        if(sms != null) {
            var suserlist = getCookie('s_userlist');
            if(suserlist != null){
                var ids = suserlist;
            }else{
                var ids = this.select_obj.val();
            }
        }else{
            var ids = this.select_obj.val();
        }
        var uid = '';

        $('#hint_Persel_List').remove();
        if($('#hint_Persel_List').length == 0 ){
            var html = '<div id="hint_Persel_List" class="Per_sel" style="display:none;">';
            html += $('#hint_Persel_List',get_main_win()).html();
            html += '</div>';
            $('#float_warp').append(html);
            //this.add_list();
            var pp = $('#hint_Persel_List',top.document);
            $('#hint_Persel_List',top.document).jqDrag($('#Per_sel_title',pp)); //拖动

        }

        if(sms != null) {
            this.sms = sms;
            var scontent = getCookie('s_content');
            $('#hint_Persel_List').attr('style', 'width:670px;');
            $('#tr1').append('<td class="td_editmegg" rowspan="2"><textarea name="sms_content" id="sms_content" cols="" rows="" class="textarea1" onpropertychange="wordCount(this, 480)" onfocus="showCount(this, 480)" onblur="hiddenCount()">'+scontent+'</textarea><div id="wordcount">0/480</div></td>');
        }

        $('#userlist_right').empty();
        var falseid = 0;
        var temp_str = '';
        if(ids != '') {
            uid = ids.split(',');
            for(i in uid) {
                var n = this.all['member'][uid[i]];
                if(typeof(n) != 'undefined') {
                    temp_str += uid[i]+','
                }
            }
        }
        var right_ids = temp_str.substr(0,temp_str.length-1);
        if(right_ids != '') {
            this.right_index = right_ids.split(',');
        }
        this.add_group_list();
        this.add_left_arr();
        this.add_list();
        this.show_right();

        $('div[id^=userlist_box]').mousedown(
            function(e){
                UserList.groupSelect(e);
            });
        $(top.document).mouseup(
            function(e){
                $('ul[id^=userlist_] li').unbind('mousemove');
                $('ul[id^=userlist_] li').removeAttr('drag');
            });
        $('#userlist_search').bind('keyup', function(){
            UserList.sleep(1);
        });
        $('#userlist_search').bind('keydown', function(){
            UserList.sleep_cancel();
        });
        $('#left_scroll').bind('scroll', function(){
            UserList.select_scroll();
        });
        showfloathint('hint_Persel_List');
    },
    groupSelect:function(e) {
        UserList.liobj = 0;
        $('ul[id^=userlist_] li').mousemove(
            function(e){
                if($(this).hasClass('bg') && $(this).attr('drag') != 1) {
                    //$(this).removeAttr('drag');
                } else {
                    if(UserList.liobj == 0) {
                        UserList.liobj = e.pageY;
                    }

                    $(this).addClass('bg');
                    $(this).attr('drag',1);
                    if(UserList.liobj > e.pageY) {
                        $(this).prevAll('[drag=1]').each(function() {
                            $(this).removeAttr('drag');
                            $(this).removeClass('bg');
                        });
                    } else {
                        $(this).nextAll('[drag=1]').each(function() {
                            $(this).removeAttr('drag');
                            $(this).removeClass('bg');
                        });
                    }
                }
            });
    },
    group_ids:null,
    get_group:function (gid) {
        var all_group = this.all['group'];
        for(i in all_group){
            if(all_group[i]['pid'] == gid){
                this.group_ids += ','+all_group[i]['id']
                this.get_group(all_group[i]['id']);
            }
        }
    },
    auto_id:null,
    sleep:function(type){
        if(type ==1 ){
            this.auto_id = setTimeout(function(){
                UserList.search();
            }, 500);
        }else if(type == 2){
            this.auto_id = setTimeout(function(){
                UserList.search_job();
            }, 500);
        }else{
            this.auto_id = setTimeout(function(){
                UserList.search_right();
            }, 500);
        }
    },
    sleep_cancel:function(){
        clearTimeout(this.auto_id);
    },
    search:function () {
        this.mode = 1;
        var val = $('#userlist_search').val().replace('姓名关键字搜索','');
        var group = $('#userlist_group li[icon="1"]').attr('v');
        if(group != '' && typeof(group) != 'undefined'){
            this.group_ids = '';
            var str = '';
            if(group == '-1'){
                this.get_group(0);
                str = ',0,'+this.group_ids+',';
            }else if(group == '0'){
                str = ',0,';
            }else{
                this.get_group(group);
                str = ','+group+this.group_ids+',';
            }
        }else{
            var str = '';
        }

        this.add_left_arr({
            'first':str,
            'second':val
        });
        this.add_list();
    },
    search_job:function () {
        var is_null = false;
        this.mode = 1;
        //$('#userlist_left li').removeClass('bg');
        var val = $('#userlist_search').val().replace('姓名关键字搜索','');
        var job =$('#userlist_group li[icon="1"]').attr('v');
        job = typeof(job) == 'undefined' ? -1 : job;
        var str = '';
        if(job == '-1'){
            all_job = this.all['job'];
            for(i in all_job){
                str += all_job[i]['id']+',';
            }
            str = ',0,'+str;
        }else{
            str = ','+job+',';
        }

        this.add_left_arr({
            'first':str,
            'second':val
        });
        this.add_list();
    },
    search_right:function () {
        this.mode = 1;
        if(this.right_index.length != 0){
            var val = $('#userlist_search_right').val();
            if(val){
                var num = this.right_index.length;
                var search_str = '';
                for(var i=0; i<num; i++){
                    var m = this.get_m(this.right_index[i]);
                    try{
                        if(m['realname'].indexOf(val) != -1 || m['username'].indexOf(val) != -1){
                            if(this.mobile == null){
                                search_str += '<li onclick="UserList.remove($(this))" id="r_'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['account']+')</label><span title="删除"></span></li>';
                            }else{
                                search_str += '<li onclick="UserList.remove($(this))" id="r_'+m['uid']+'" count="'+i+'"><label class="sex_'+m['sex']%2+'">'+m['realname']+'('+m['mobile']+')</label><span title="删除"></span></li>';
                            }
                        }
                    }catch(e){}
                }

                if(search_str == '') {
                    search_str = '<li><label>无符合条件的用户</label></li>';
                }

                $('#Per_sel_ul_2').html(search_str);
                $('#float_bg_001').show();
                $('#Per_sel_list1_1').show();
                $('#gb_botton').show();
            }else{
                $('#Per_sel_ul_2').html('<li><label>无符合条件的用户</label></li>');
            }
        }

    },
    close_search:function(){
        $('#float_bg_001, #Per_sel_list1_1, #gb_botton').hide();
        $('#userlist_search_right').val('姓名关键字搜索');
        this.show_right();
        this.add_list();
    },
    input:function(obj) {
        if(obj.val()=='姓名关键字搜索') {
            obj.val('');
        }
        if(obj.attr('sright') == 1){
            this.right_arr = this.right_index;
        }
    }
};

function setCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    document.cookie = name + "="+ escape (value);
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]);
    return '';
}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function wordCount(_obj, _max){
    var _total = _obj.value.length;
    if(_total > _max) {
        _obj.value = _obj.value.substr(0, _max);
    } else {
        document.getElementById("wordcount").innerHTML = _total + "/" + _max;
    }
}

//显示统计字数
function showCount(_obj, _max) {
    if(document.getElementById("wordcount").value == "" || document.getElementById("wordcount").value == undefined) {
        document.getElementById("wordcount").innerHTML = _obj.value.length + "/" + _max;
    }
    document.getElementById("wordcount").style.left = getAbs(_obj).x + _obj.clientWidth - 50;
    document.getElementById("wordcount").style.top = getAbs(_obj).y + _obj.clientHeight - 14;
}

//隐藏统计字数
function hiddenCount() {
//document.getElementById("wordcount").style.display = "none";
}

//获取元素坐标
function getAbs(_obj) {
    var abs = {
        x:0,
        y:0
    };
    while(_obj != document.body){
        abs.x += _obj.offsetLeft;
        abs.y += _obj.offsetTop;
        _obj = _obj.offsetParent;
    }
    return abs;
}


//延迟执行
//setTimeout(function(){UserList.init();},2000);