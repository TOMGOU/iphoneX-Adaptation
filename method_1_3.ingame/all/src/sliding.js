    var gets={
        id: function (o){return(typeof o=='object')?o:document.getElementById(o)},
        tag: function(p, o) {
            return p.getElementsByTagName(o);
        },
        elem: function(o) {
            return document.createElement(o)
        }

    }
     //�ƶ��������б�������ؿ�ʼ
    var scrollNews = function(obj){
        this.contID = obj.contID; //����� id
        this.attribute = obj.attribute; //������Զ������ԣ��������б�url
        this.classnameUL = obj.classnameUL;//����������ul��classname
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
        if(mark.innerHTML!="����ʾȫ������"){
            if(pagenext&&pagenow<10) {
                mark.innerHTML = "���ڼ�����...";
                gets.id("load-text").innerHTML = "���ڼ�����...";
                setTimeout(function () {
                    var strReplace = mark.outerHTML;
                    strResultHtml = gets.id(self.contID).innerHTML.replace(strReplace, self.loadXMLDoc(pagenext));
                    gets.id(self.contID).innerHTML = strResultHtml;
                    gets.id("load-text").innerHTML = "�����ʾ����";
                }, 400);
            }
        }else {
            /*mark.innerHTML = "����ʾȫ������";*/
            document.getElementById("load-text").innerHTML = "����ʾȫ������";
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
      	   document.getElementById("load-text").innerHTML = "����ʾȫ������";
        }
        //ҳ���ö�
        scroll(0,0);
    }

    scrollNews.prototype.WriteHtml = function() {
        var self = this,
                surl = gets.id(self.contID).getAttribute(self.attribute);
        gets.id(self.contID).getElementsByTagName("ul")[0].innerHTML =self.loadXMLDoc(surl);
    };
    //�ƶ��������б�������ؽ���
    //��ʼ����
	/*
    window.onload = function () {

        window.JSMscrollNews = new scrollNews({
            contID:"menuNews_List1",
            attribute:"data-url"//�Զ����������
        });
        JSMscrollNews.WriteHtml();
        $("#load-text").on(igTap,function(){JSMscrollNews.LoadNext()});
        $(".menu li").on(igTap, function () {
            $(".menu li").removeClass("current");
            $(this).addClass("current");
            if ($(this).find("a").attr("data-url")) {
                $("#load-text").html("�����ʾ����");
                JSMscrollNews.LoadUrl($(this).find("a").attr("data-url"));

            }
        })
    }
	*/
