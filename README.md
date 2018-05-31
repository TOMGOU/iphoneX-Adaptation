# iphoneX-Adaptation
iphoneX adaptation summary

iphoneX 适配问题总结

基础知识点

1.	适配前提： <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">;

2.	四个变量：env(safe-area-inset-top)/ env(safe-area-inset-right)/ env(safe-area-inset-bottom)/env(safe-area-inset-left);

safe-area-inset-left：安全区左边距
safe-area-inset-right：安全区右边距
safe-area-inset-top：安全区顶部边距
safe-area-inset-bottom：安全区底部边距

3.	constant(safe-area-inset-bottom) 和 env(safe-area-inset-bottom)是为了兼容，现在env(safe-area-inset-bottom)就可以了;

4.	@supports (bottom:constant(safe-area-inset-bottom)) or (bottom:env(safe-area-inset-bottom)) iso11均可见；

5.	@media only screen and(width:375px)and(min-height:690px) 仅iphoneX可见；


第一次适配：

	步骤：

1.	左边适配：将body和html整体向右移动env(safe-area-inset-right)

@supports (bottom:constant(safe-area-inset-bottom)) or (bottom:env(safe-area-inset-bottom)) {
html,body{
            left: constant(safe-area-inset-right);
            left: env(safe-area-inset-right);
        }
}

2.	右边和下边适配：通过改变html的字体整体缩小body和html 的大小

html.style.fontSize= w > h ? w/1490*100+"px" : w/750*100+"px";

	优点：速度快，无需调整内部结构.

	缺点：两边的空白部分取决于浏览器的背景颜色（普通浏览器：黑色；微社区内置浏览器：白色；）
 

第二次适配：

	步骤：

1.	左边的适配：将menu的宽度加大，并且让里面的文字右对齐；

width: calc(1.88rem + env(safe-area-inset-right))!important;
 
2.	右边的适配：通过调整内部结构的宽度改变；

	缺点：

1.	速度慢，需要调整内部结构；

2.	由于跨域问题，不能直接看到数据，很容易忽略细节；

	优点：

1.	两边无空白部分;

2.	无需写js，适配代码全部集中在css;

方法三：（适合提前适配）

	步骤：

1.	4个方向的css样式

@supports (bottom:constant(safe-area-inset-bottom)) or (bottom:env(safe-area-inset-bottom)){
            /* window.orientation == 0时候的样式 */
            .zero{
                background: red!important;
            }
            /* window.orientation == 90时候的样式 */
            .ninty{
                background: blue!important;
            }
            /* window.orientation == -90时候的样式 */
            ._ninty{
                background: green!important;
            }
            /* window.orientation == 180时候的样式 */
            .reverse{
                background: yellow!important;
            }
        }
		【以上样式ios11均可实现，使用env(safe-area-inset-right)后仅iphoneX可以实现，也可以使用@media only screen and(width:375px)and(min-height:690px) 仅iphoneX可以实现】

2.	js控制代码（box为body下面最大的父级元素）

<script>
        var box = document.getElementById("box");
        function orientationChange() {
            switch(window.orientation) {
                case 0: 
                    box.setAttribute("class","zero")
                    break;
                case -90: 
                    box.setAttribute("class","_ninty")
                    break;
                case 90:
                    box.setAttribute("class","ninty")
                    break;
                case 180:
                    box.setAttribute("class","reverse")
                    break;
            }
        }
        window.addEventListener('orientationchange', orientationChange);
    </script>

	缺点：元素的尺寸相对父级来定（百分比）； 
	优点：精准适配，适合各种情况；


