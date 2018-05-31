/*rem*/
function resize() {
    var html=document.documentElement,
        w = html.clientWidth,
        h = html.clientHeight;
    $(".mocha-ingame").css("opacity", 0);
    setTimeout(function() {
        html.style.fontSize= w > h ? w/667*100+"px" : w/375*100+"px";
        $(".mocha-ingame").css("opacity", 1);
        if($('.mocha-ingame-tab-fixed')&&$('.mocha-ingame-tab-fixed').length>0){
            $('.mocha-ingame-content-wrap').css('paddingTop',$('.mocha-ingame-tab-fixed').height());
        }
    }, 50);
};
resize();
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(evt, resize, false);

//首页导航选中状态
(function setCur(){
    var href = window.location.href;
    // if($("#main_nav li").length>4){
    //     $("#mainNav2").hide();
    // }
    if(/index/.test(href)){
        $("#mainNav1").addClass("current");
        return ;
    }else if(/gl.shtml|34659/.test(href)||/gl_details.shtml/.test(href)||/gl-img-detail.shtml/.test(href)){
        $("#mainNav3").addClass("current");

    }else if(/news.shtml|34748/.test(href)){
        $("#mainNav2").addClass("current");
    }else if(/video.shtml|34670/.test(href)){
        $("#mainNav4").addClass("current");
    }else if(/share.shtml/.test(href)){
        $("#mainNav5").addClass("current");
    }else if(/honour/.test(href)){
        $("#mainNav6").addClass("current");
    }else{
        $("#mainNav1").addClass("current");
    }
})();

//PC点击兼容，PC有限使用click，其他设备使用tap
(function(e){
    var o=navigator.userAgent;if(o.indexOf("iPhone")!=-1||o.indexOf("iPad")!=-1||o.indexOf("iPod")!=-1||o.indexOf("Android")!=-1){
        e.igTap = "tap";
    }else{
        e.igTap = "click";
    }
})(window)

// //分享按钮点击
// $("#shareDialogBtn").on(igTap,function(){
//     $(".mocha-ingame-sharemenu-layer").fadeIn(300);
//     $(".mocha-ingame-sharemenu").css({"height":$(window).height(),"top":$(window).scrollTop()}).removeClass("mocha-ingame-sharemenu-hidden").addClass("mocha-ingame-sharemenu-show");
// });
// $(".mocha-ingame-sharemenu-layer,.mocha-ingame-sharemenu-close").on(igTap,function(){
//     event.preventDefault();
//     event.stopPropagation();
//     $(".mocha-ingame-sharemenu-layer").fadeOut(300);
//     $(".mocha-ingame-sharemenu").removeClass("mocha-ingame-sharemenu-show").addClass("mocha-ingame-sharemenu-hidden")
// }).on("touchmove",function(e){e.preventDefault();});

$(window).on("resize",function(){
    if($(".mocha-ingame-sharemenu").length>0){
        $(".mocha-ingame-sharemenu").css({"top":0}).removeClass("mocha-ingame-sharemenu-show").addClass("mocha-ingame-sharemenu-hidden")
    }
})

//分享浮层
$(".mocha-ingame-sharemenu").on("touchmove",function(e){e.preventDefault()})

//游戏登陆态参数
if(typeof(dataSearch)=="undefined"){
    if(typeof(sessionStorage.dataSearch)=="undefined"){
        dataSearch=window.location.search;
        sessionStorage.dataSearch=window.location.search;
    }else{
        dataSearch = sessionStorage.dataSearch;
    }
}

//白名单检测
function isOnWhiteName(whiteName,myOpenId){
    var i,len = whiteName.length;
    for(i = 0;i < len;i++){
        if(myOpenId.indexOf(whiteName[i])>-1){
            return true;
        }
    }
    return false;
}

//校验登陆态是否是白名单用户，param通常为sessionStorage.dataSearch
function checkWhiteList(param){
    //白名单列表
    var whiteName = ["37D015EB652BAB0E6C97DEC9F5BCC1C0"];
    if(isOnWhiteName(whiteName,param)){
        //命中白名单逻辑
    }else{
        //没命中白名单逻辑
    }
}
