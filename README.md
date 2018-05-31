# iphoneX-Adaptation
iphoneX adaptation summary

iphoneX 适配问题总结

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



