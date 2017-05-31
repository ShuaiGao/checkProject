function referer_url( url, target ){
    if( target=='blank' ){
        window.open(url);
    }else if( target=='top' ){
        top.document.location.href = url;
    }else{
        top.document.getElementById('if_content').contentWindow.location.href = url;
    }	
    return false;
}

$(document).ready(function(){
    $(window).scroll(function(){
        var sclTop = document.documentElement.scrollTop==0 ? document.body.scrollTop : document.documentElement.scrollTop;
        //setTimeout("top.qyTips.scrollEvt("+sclTop+")",200);
    });

    $(".js_link").click(function(){
        var url = $(this).attr('data');
        top.document.getElementById('if_content').contentWindow.location.href = url;
        return false;
    })
})