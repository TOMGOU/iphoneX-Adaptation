    var gets={
        id: function (o){return(typeof o=='object')?o:document.getElementById(o)},
        tag: function(p, o) {
            return p.getElementsByTagName(o);
        },
        elem: function(o) {
            return document.createElement(o)
        }

    }
     //移动端新闻列表滚动加载开始
    var scrollNews = function(obj){
        this.contID = obj.contID; //分类块 id
        this.attribute = obj.attribute; //分类块自定义属性，用来放列表url
        this.classnameUL = obj.classnameUL;//分类块里面的ul的classname
        this.startY = null;
        this.endY = null;
        this.records = false;
    };
    scrollNews.prototype.loadXMLDoc = function(thisURL) {
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",thisURL,false);
        xmlhttp.overrideMimeType && xmlhttp.overrideMimeType( "text/html;charset=gbk");
        xmlhttp.send();
        return xmlhttp.responseText;
    };
    scrollNews.prototype.LoadNext = function() {

        var self = this,
                markStr = gets.tag(gets.id(self.contID),"div"),
                mark = markStr[markStr.length-1];
        pagenow = mark.getAttribute("data-pagenow"),
                pagetotal = mark.getAttribute("data-pagetotal"),
                pageprev = mark.getAttribute("data-pageprev"),
                pagenext = mark.getAttribute("data-pagenext");
        if(mark.innerHTML!="已显示全部内容"){
            if(pagenext&&pagenow<10) {
                mark.innerHTML = "正在加载中...";
                gets.id("load-text").innerHTML = "正在加载中...";
                setTimeout(function () {
                    var strReplace = mark.outerHTML;
                    strResultHtml = gets.id(self.contID).innerHTML.replace(strReplace, self.loadXMLDoc(pagenext));
                    gets.id(self.contID).innerHTML = strResultHtml;
                    gets.id("load-text").innerHTML = "点击显示更多";
                }, 400);
            }
        }else {
            /*mark.innerHTML = "已显示全部内容";*/
            document.getElementById("load-text").innerHTML = "已显示全部内容";
        }
    };

    scrollNews.prototype.LoadUrl = function(url){
        var self = this;
        gets.id(self.contID).getElementsByTagName("ul")[0].innerHTML =""+ self.loadXMLDoc(url)+"";
        var markStr = gets.tag(gets.id(self.contID),"li"),
        mark = markStr[markStr.length-1];
        var markStr = gets.tag(gets.id(self.contID),"li"),
        mark = markStr[markStr.length-1],
        pagetotal = mark.getAttribute("data-pagetotal");
        if(pagetotal&&pagetotal==1){
      	   document.getElementById("load-text").innerHTML = "已显示全部内容";
        }
        //页面置顶
        scroll(0,0);
    }

    scrollNews.prototype.WriteHtml = function() {
        var self = this,
                surl = gets.id(self.contID).getAttribute(self.attribute);
        gets.id(self.contID).getElementsByTagName("ul")[0].innerHTML =self.loadXMLDoc(surl);
    };
    //移动端新闻列表滚动加载结束
    //开始调用
	/*
    window.onload = function () {

        window.JSMscrollNews = new scrollNews({
            contID:"menuNews_List1",
            attribute:"data-url"//自定义的属性名
        });
        JSMscrollNews.WriteHtml();
        $("#load-text").on(igTap,function(){JSMscrollNews.LoadNext()});
        $(".menu li").on(igTap, function () {
            $(".menu li").removeClass("current");
            $(this).addClass("current");
            if ($(this).find("a").attr("data-url")) {
                $("#load-text").html("点击显示更多");
                JSMscrollNews.LoadUrl($(this).find("a").attr("data-url"));

            }
        })
    }
	*/
