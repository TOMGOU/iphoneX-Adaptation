(function(e){
    var o=navigator.userAgent;if(o.indexOf("iPhone")!=-1||o.indexOf("iPad")!=-1||o.indexOf("iPod")!=-1||o.indexOf("Android")!=-1){
        e.igTap = "tap";
    }else{
        e.igTap = "click";
    }
})(window)



var dataSearch = window.location.search;

if (dataSearch.indexOf("appid") != -1 && dataSearch) {
    sessionStorage.dataSearch = window.location.search;
}
if (sessionStorage.dataSearch) {
    var appid = getUrlParam(sessionStorage['dataSearch'], "appid");
    console.log(appid, "appid")
    if (appid&&appid.indexOf("wx") > -1) {
        //游戏圈
        if ($("#m_wxq")) {
            //var blLink = $("#m_wxq a");
            //$("#m_wxq").addClass("show")
            //blLink.attr("href", blLink.attr("href") + sessionStorage.dataSearch.replace("?", "&"))
        }
    } else {
        //部落
        if ($("#m_bl")) {
            //var blLink = $("#m_bl a");
            //$("#m_bl").addClass("show")
            //blLink.attr("href", blLink.attr("href") + sessionStorage.dataSearch.replace("?", "&"))
        }
    }
}

window.pttReport = (a, b, c) => {
    if (typeof(PTTSendClick)=='function') PTTSendClick(a,b,c);
}

window.igUtil = {
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    handleFullScreen: function(isFull) {
        console.log(isFull, "handleFullScreen")
        if (isFull) {
            $(".menu").css("display", "none");
        } else {
            $(".menu").css("display", "block");
        }
    },
}

function getUrlParam(url, parm) {
    var reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)");
    var r = url.substr(url.indexOf("\?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// if(Vue){
//     // if($("#search-template")){
//     Vue.component('search-view', {
//         props: {
//             p0:Number,
//             order:{default:"sIdxTime"},
//             pagesize:{default:12},
//             ndetail:{default:'detail.shtml'},
//             vdetail:{default:'vdetail.shtml'},
//         },
//         template: '#search-template',
//         data: function () {
//             return {
//                 searchText: "",
//                 timer:null,
//                 focusStatus:true,
//                 searchResult:{
//                     news:{page:1,max:1,list:[]},
//                     video:{page:1,max:1,list:[]}
//                 },
//                 cateType:"news",
//                 scrollDisable:false
//             }
//         },
//         methods:{
//             handleSearch:function(value){
//                 var that = this;
//                 var formattedValue = value.trim();
//                 // 如果值尚不合规，则手动覆盖为合规的值
//                 if (formattedValue !== value) {
//                     that.searchText = formattedValue
//                 }
//                 clearTimeout(that.timer);
//                 that.timer = setTimeout(function(){
//                     that.search();
//                 },300)
//             },
//             handleCancle:function(){
//                 this.$emit('close');
//             },
//             searchType:function(typeid){
//                 this.cateType = typeid;
//                 if(this.searchResult[this.cateType].list.length<1){this.search();}
//             },
//             search:function(){
//                 var that = this;
//                 // if(that.searchText.length>0){
//                 iuLoader.loadList({
//                     params:{
//                         p0:that.p0,page:that.searchResult[that.cateType].page,pagesize:that.pagesize,p1:"searchIso",p2:encodeURIComponent(encodeURIComponent(that.searchText)),p3:that.cateType=="news"?"NEWS":"VIDEO",order:that.order
//                     },
//                     success:function(data){
//                         var dataList = that.searchResult[that.cateType];
//                         if(dataList.page>1){
//                             var temArr = dataList.list;
//                             dataList.list = temArr.concat(data.msg.result);
//                         }else{
//                             dataList.list = data.msg.result;
//                         }
//                         dataList.page = Number(data.msg.page);
//                         dataList.max = Number(data.msg.totalpage);
//                         console.log(that.searchResult[that.cateType],"haha")
//                         that.scrollDisable = false;
//                     },
//                     failure:function(){
//                         that.searchResult[that.cateType].list=[];
//                     }
//                 })
//                 // }

//             },
//             loadNextPage:function(scrolTop){
//                 this.scrollDisable = true;
//                 if(this.searchResult[this.cateType].page<this.searchResult[this.cateType].max){
//                     this.searchResult[this.cateType].page++;
//                     //翻页操作
//                     this.search();
//                 }
//             },
//         },
//         directives: {
//             scroll: {
//                 bind: function (el, binding,vnode){
//                     var that = this;
//                     $(el).scroll(function(){
//                         console.log("scroll,that.scrollDisable:"+vnode.context.scrollDisable);
//                         if (typeof timer === 'number') {
//                             clearTimeout(timer);
//                         }
//                         timer = setTimeout(function () {
//                             var contentHeight =  $(el)[0].scrollHeight;  //内容高度
//                             var areaHeight = $(el).height(); //滚动区域高度
//                             var scrolTop = $(el)[0].scrollTop;
//                             if(scrolTop + areaHeight >= contentHeight-150){
//                                 var func = binding.value;
//                                 if(typeof(PTTSendClick)=='function')PTTSendClick('status','IsSearchBottom','滚动到底');
//                                 console.log("到底,that.scrollDisable:"+vnode.context.scrollDisable);
//                                 if(!vnode.context.scrollDisable) {
//                                     func(scrolTop);
//                                 }
//                             }
//                         },300);
//                     })
//                 }
//             }
//         }
//     })
//     // }
//     var mixin = {
//         methods: {
//             closeSearch:function(){
//                 this.isSearch = false;
//             },
//             //开关灯按钮触发逻辑
//             lampTrigger:function(){
//                 var body = $(document.body);
//                 if( body.hasClass("ig-light-on")){
//                     this.lampSwitcher("off")
//                     if(typeof(PTTSendClick)=='function')PTTSendClick('lamper','off','开关灯-关灯');
//                 }else{
//                     this.lampSwitcher("on");
//                     if(typeof(PTTSendClick)=='function')PTTSendClick('lamper','on','开关灯-开灯');
//                 }
//             },
//             //控制开关灯逻辑
//             lampSwitcher:function(type){
//                 var body = $(document.body);
//                 if(type=="on"){
//                     sessionStorage.isLampOn = "on";
//                     body.addClass("ig-light-on");
//                     $(".ig-light-trigger").addClass("on");
//                 }else if(type=="off"){
//                     sessionStorage.isLampOn = "off";
//                     body.removeClass("ig-light-on");
//                     $(".ig-light-trigger").removeClass("on");
//                 }
//             },
//             // 判断是否有开灯
//             lampDetect:function(){
//                 //默认开灯
//                 if(typeof(sessionStorage.isLampOn)!="undefined"&&sessionStorage.isLampOn=="on"){
//                     this.lampSwitcher("on")
//                 }
//             }
//         }
//     }
//     Vue.directive('tap',{
//         bind:function(el,binding){
//             var startTx, startTy,endTx,endTy;
//             el.addEventListener("touchstart",function(e){
//                 var touch=e.touches[0];
//                 startTx = touch.clientX;
//                 startTy = touch.clientY;
//                 el.addEventListener("touchend",function(e){
//                     var touch = e.changedTouches[0];
//                     endTx = touch.clientX;
//                     endTy = touch.clientY;
//                     endTy = touch.clientY;
//                     if( Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6){
//                         var method = binding.value.method;
//                         var params = binding.value.params;
//                         method(params);
//                     }
//                 },false);
//             },false );
//         }
//     })
//     Vue.filter('dateShorter', function(v) {
//         if (v) {
//             var sTime = new Date(Date.parse(v.replace(/-/g, "/")));
//             return (sTime.getMonth() + 1) + "/" + sTime.getDate();
//         }
//         return v;
//     })
//     Vue.filter('linkLoginInfo', function(o) {
//         o = o.replace("http://","//");
//         var eParam = "",url=o;
//         //处理链接有#的情况，分离再追加
//         if(o.indexOf("#")>-1){url=o.split("#")[0];eParam = "#"+o.split("#")[1]}
//         return  url+(url.indexOf("?")>-1?'&':"?")+(typeof(sessionStorage.dataSearch)!="undefined"?sessionStorage.dataSearch.replace("?",""):"")+eParam;
//     })
//     Vue.filter('attachTopicTag', function(o) {
//         return o+(o.indexOf("?")>-1?"&":"?")+"cmtype=topics";
//     })
//     Vue.filter('imgToHttps', function (value) {
//         if(value.indexOf("itea-cdn.qq.com")>-1){
//             var suffix = value.replace(/.+\./, "").toLowerCase();
//             value = value.replace("."+suffix,".200."+suffix)
//         }
//         if(!value){return 'https://ossweb-img.qq.com/upload/adw/image/201712/1513295121642518791.jpg';}
//         return value.replace("http://","//");
//     })
//     //date count
//     Vue.filter('dateCount', function (publishTime) { if (publishTime) { var pDate = new Date(Date.parse(publishTime.replace(/-/g,   "/"))).getTime()/1000; var d_minutes,d_hours,d_days; var timeNow = parseInt(new Date().getTime()/1000); var d; d = timeNow - pDate; d_days = parseInt(d/86400); d_hours = parseInt(d/3600); d_minutes = parseInt(d/60); if (d_days > 0 && d_days<4){ return d_days + "天前"; } else if (d_days<=0 && d_hours>0){ return d_hours +"小时前"; } else if (d_hours<=0 && d_minutes>0){ return d_minutes+"分钟前"; } else { var s = new Date(pDate*1000); /* s.getFullYear()+"年";*/ return (s.getMonth()+1)+"月"+s.getDate()+"日"; } } return publishTime; })

// }

function nloadScript(url, callback,charset) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    charset?(script.charset = charset):{};
    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback && callback();
            }
        };
    } else {
        script.onload = function() {
            callback && callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function nloadCss(url,callback){
    var url = url;
    window.loadedStyles || (window.loadedStyles = [])
    if(loadedStyles.indexOf(url) < 0){
        var style = document.createElement("link");
        style.rel = "stylesheet";
        if (style.readyState) {
            style.onreadystatechange = function() {
                if (style.readyState == "loaded" || style.readyState == "compvare") {
                    style.onreadystatechange = null;
                    callback && callback();
                    loadedStyles.push(url);
                }
            }
        } else {
            style.onload = function() {
                callback && callback();
                loadedStyles.push(url);
            }
        }
        style.href = url;
        document.getElementsByTagName("head")[0].appendChild(style);
    }else{
        callback && callback();
    }
}




var iuLoader = {
    extendParam:function(source){
        var target={
            p1:"searchNewsKeywordsList",
            r0:"cors",
            r1:"userObj",
            order:"sIdxTime",
            pagesize:10,
            page:1,
            type:"iType",
            source:"client_circle_detail",
        }
        for(var p in source){
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    },
    trimJSON : function(str){
        var e = /\s*var.+?({.+});\s*/;
        var result = e.exec(str);
        if(result && result[1]) {
            return result[1];
        }else{
            return str;
        }
    },
    loadList:function(data,isSingle){
        var that = this;
        if(data&&data.params){
            var urlParam="",temp,x;
            var params =that.extendParam(data.params);
            for(x in params){
                temp = "&"+x+"="+params[x];
                urlParam += temp;
            }
            urlParam=urlParam.substring(1);
            var ajaxUrl = isSingle&&isSingle==1?"//apps.game.qq.com/wmp/v3.1/public/search.php?": isSingle&&isSingle==2?"//apps.game.qq.com/wmp/v3.1/public/searchNews.php?":"//apps.game.qq.com/wmp/v3.1/?";
            // console.log(ajaxUrl+urlParam,"ajax url")

            $.ajax({
                type: 'GET',
                url: ajaxUrl+urlParam,
                dataType: 'json',
                async:typeof(data.async)!="undefined"?data.async:true,
                success: function(json){
                    // var jsonStr = that.trimJSON(json);
                    // var result = JSON.parse(jsonStr);
                    var result = json;
                    if(result&&result.status==0){
                        var listData = result.msg.result;
                        if(listData&&listData.length>0){
                            for(var i =0;i<listData.length;i++){
                                if(listData[i].sExt){
                                    listData[i].sExt = listData[i].sExt?JSON.parse(decodeURIComponent(listData[i].sExt)):'';
                                }
                            }
                        }
                        data.success&&data.success(result);
                    }else{
                        data.failure&&data.failure(result);
                    }
                },
                error: function(xhr, type){

                }
            })
        }
    }
}
var landPorDetect = function () {
    var updateOrientation = function (action) {
        var orientation = window.orientation;
        switch (orientation) {
            case 90:
            case -90:
                if(action=="change"){
                    if (typeof (PTTSendClick) == 'function') PTTSendClick('orientation', 'toLandscape', '用户从竖屏到横屏');
                    if (typeof (PTTSendClick) == 'function') PTTSendClick('orientation', 'change', '用户旋转屏幕');
                }else{
                    if (typeof (PTTSendClick) == 'function') PTTSendClick('orientation', 'defaultLandscape', '用户默认横屏');
                }
                break;
            default:
                if(action=="change"){
                    if (typeof (PTTSendClick) == 'function') PTTSendClick('orientation', 'toPortrait', '用户从横屏到竖屏');
                    if (typeof (PTTSendClick) == 'function') PTTSendClick('orientation', 'change', '用户旋转屏幕');
                }else{
                    if (typeof (PTTSendClick) == 'function') PTTSendClick('orientation', 'defaultPortrait', '用户默认竖屏');
                }
                break;
        }
    };
    // 每次旋转，调用这个事件。
    window.addEventListener('orientationchange', function(){updateOrientation("change")}, false);
    updateOrientation();
};
window.addEventListener('DOMContentLoaded', landPorDetect, false);
// iphoneX
// var displayStr="";
// var orientationDetect= function(){
//     if(displayStr.length>0){$(document.body).removeClass(displayStr);}
//     switch(window.orientation) {
//         case 0:
//             displayStr= "direction_por";
//             break;
//         case -90:
//             displayStr= "direction_land_ops";
//             break;
//         case 90:
//             displayStr= "direction_land";
//             break;
//         case 180:
//             displayStr= "direction_por_ops";
//             break;
//     }
//     $(document.body).addClass(displayStr);
// }
// var u = navigator.userAgent;
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// if(isiOS){
//     window.addEventListener('DOMContentLoaded', orientationDetect, false);
//     window.addEventListener('orientationchange', orientationDetect, false);
// }



function bindLinkClick(){
    $('body').on('click','.a-tgax',function(){
        pageControl && pageControl.uninit && pageControl.uninit();
        var staticUrl = $(this).attr('href');
        $('body').off('click','.a-tgax');
        var a = document.createElement('A');
        a.href = staticUrl;
        staticUrl = a.href;
        if(staticUrl != window.location.href){
            $.pjax({
                url: staticUrl,
                container: "#PCont",
                fragment: "#PCont",
                timeout : 10000
            });
            a = null;
        }
        return false;
    })
}

function setMenuCurrent() {
    var href = window.location.href;
    $('.menu-list .current').removeClass('current');
    if (/index.shtml|in201801.shtml/.test(href)) {
        $("#m_index").addClass("current");
        return
    } else {
        if (/video.shtml|vdetail.shtml|vid/.test(href)) {
            $("#m_video").addClass("current")
        } else {
            if (/gl.shtml|gl-in.shtml|ptype=gl/.test(href)) {
                $("#m_gl").addClass("current")
            } else {
                $("#m_index").addClass("current");
                return
            }
        }
    }
}
// setMenuCurrent();

//操作手势上报
function reportDirection(){
    function directionReport(way,page){
        var direction = way.toLowerCase();
        var pageName = page || "guesture"
        switch (direction) {
            case "up": if (typeof (PTTSendClick) == 'function') PTTSendClick(pageName, 'swipeUp', '向上滑动');break;
            case "down": if (typeof (PTTSendClick) == 'function') PTTSendClick(pageName, 'swipeDown', '向下滑动');break;
            case "left": if (typeof (PTTSendClick) == 'function') PTTSendClick(pageName, 'swipeLeft', '向左滑动');break;
            case "right": if (typeof (PTTSendClick) == 'function') PTTSendClick(pageName, 'swipeRight', '向右滑动');break;
        }
    }
    function handleGuesture(){
        new AlloyFinger(document.getElementById("app"), {
            swipe: function (evt) {
                directionReport(evt.direction)
            }
        });
        var scrollLeftObj = document.getElementsByClassName("index-rcm");
        var scrollRightObj = document.getElementsByClassName("index-ogc");
        if(scrollLeftObj&&scrollLeftObj.length>0){
            new AlloyFinger(scrollLeftObj[0], {
                swipe: function (evt) {
                    directionReport(evt.direction,"pageLeft");
                }
            });
        }
        if(scrollRightObj&&scrollRightObj.length>0){
            new AlloyFinger(scrollRightObj[0], {
                swipe: function (evt) {
                    directionReport(evt.direction,"pageRight");
                }
            });
        }
    }
    if(typeof (AlloyFinger)!="undefined"){handleGuesture()}else{
        nloadScript("//ossweb-img.qq.com/images/js/bsCommonFiles/js/alloy_finger.js",function(){
            handleGuesture();
        })
    }
}

if($.support.pjax){
    bindLinkClick();
    $(document).on("pjax:end", function(data) {
        var staticUrl = window.location.href;
        console.log('%c[pjax done]:','background:#F0A513;color:#fff',staticUrl);
        (typeof $loaded === 'function') && setTimeout(function(){$loaded();setMenuCurrent();reportDirection()},10)
        bindLinkClick();
        if (typeof pgvMain === 'function') {
            if(staticUrl.indexOf('detail') > 0){
                pgvMain({ repeatApplay: 'true'});
                var type = igUtil.getUrlParam("vid") ? 'vdetail' : 'detail',
                    did = igUtil.getUrlParam("nid")||igUtil.getUrlParam("vid");
                did && pgvMain({ repeatApplay: 'true',virtualURL: "/ingame/all/web201712/"+type+"/"+did+".shtml"})
                MtaH5&&MtaH5.pgv&&MtaH5.pgv(); // mta report
            }else{
                pgvMain({ repeatApplay: 'true'});
                MtaH5&&MtaH5.pgv&&MtaH5.pgv(); // mta report
            }
        }
    });
    $(document).on("pjax:timeout",function(data){
        console.log('timeout',data);
    })
    $(document).on('pjax:send', function() {
        $('#loading').show()
    })
    $(document).on('pjax:complete', function() {
        $('#loading').hide()
    })
}
//mta report
var _mtac = {"autoReport":0,"performanceMonitor":1};
(function() {
    var mta = document.createElement("script");
    mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500600988");
    mta.setAttribute("cid", "500600992");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
})();

//  页面加载
$(window).on("load", function() {
    (typeof $loaded === 'function') && setTimeout(function() {
        $loaded();
        MtaH5&&MtaH5.pgv&&MtaH5.pgv(); // mta report
        reportDirection();
    }, 0)
});




