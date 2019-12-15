# 文字超出范围省略号显示

## 效果预览

![](preview.png)

## 主要代码

[index.wxss](index/index.wxss)

``` css
/* 单行省略号 */

.single-line {
  width: 600rpx;
  white-space: nowrap; /*强制不换行*/
  overflow-x: hidden; /*超出文字自动隐藏 */
  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
}

/* 多行省略号 */

.multi-line {
  width: 600rpx;
  display: -webkit-box;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis;
  word-wrap: break-word; /*全部换号*/
  white-space: normal !important; /*强制换行*/
  -webkit-line-clamp: 2; /*要显示行数*/
  -webkit-box-orient: vertical; /*从上向下垂直排列子元素*/
}
```
