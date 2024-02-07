#Example 示例

**介绍**
示例介绍

**使用**

```

基本用法
<my-link href="http://www.example.com" text="http://www.example.com"></my-link>

打开链接类型
通过openType属性设置打开链接方式
<my-link href="http://www.example.com" text="http://www.example.com" openType="webview"></my-link>

链接文字大小
通过fontSize属性设置链接文字大小，单位px
<my-link href="http://www.example.com" text="http://www.example.com" fontSize="18px"></my-link>

链接文字颜色
通过color属性设置链接文字颜色
<my-link href="http://www.example.com" text="http://www.example.com" color="red"></my-link>

是否显示下划线
通过showUnderLine属性设置是否显示下划线
<my-link href="http://www.example.com" text="http://www.example.com" showUnderLine></my-link>


```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| openType | 打开链接类型 webview、open| string | 'open' | 否 |
| href | 链接地址| string | '-' | 否 |
| text | 显示文字| string | '-' | 否 |
| fontSize | 链接文字大小，单位px | string | '14px' | 否 |
| color | 链接文字颜色 | string | '#999999' | 否 |
| showUnderLine | 是否显示下划线 | boolean | 'false' | 否 |

**Slots**
| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，使用插槽则href与text失效，|

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击的回调函数 | - |
