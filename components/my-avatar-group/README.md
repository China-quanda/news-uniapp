#avatar-group 头像组

**介绍**
本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。

**使用**

```

基本使用
过urls属性设置头像图片组
<my-avatar-group :urls="[
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg'
]">
</my-avatar-group>


最多展示的头像数量 
可通过maxCount属性设置最多展示的头像数量 默认为5
<my-avatar-group maxCount="3" :urls="[
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg'
]">
</my-avatar-group>


头像之间的遮挡像素
可通过gap属性设置头像之间的遮挡像素
<my-avatar-group gap="-15px" :urls="[
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg'
]">
</my-avatar-group>


超出时是否显示查看更多的提示
可通过maxCount属性设置超出时是否显示查看更多的提示
<my-avatar-group maxCount gap="-15px" :urls="[
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg'
]">
</my-avatar-group>


头像大小
可通过size属性设置头像大小
<my-avatar-group size="30px" :urls="[
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg'
]">
</my-avatar-group>


头像形状
可通过shape属性设置头像形状
可通过radius属性设置圆角
<my-avatar-group shape="circle" :urls="[
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg'
]">
</my-avatar-group>

my-avatar-group shape="square" radius="8px" :urls="[
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg'
]">
</my-avatar-group>


```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填 
| ----- | ----------------- | ------ | ------ |------ |
| urls | 头像图片组 | array | '-' | 是 |
| maxCount | 最多展示的头像数量| string , number | '5' | 否 |
| gap | 头像之间的遮挡像素| string | '-15px' | 否 |
| showMore | 超出maxCount时是否显示查看更多的提示 | boolean | 'true' | 否 |
| size | 头像大小 | string | '40px' | 否 |
| shape |头像形状，circle-圆形，square-方形 | string | 'circle' | 否 |
| radius | 圆角，默认单位px | string | '4px' | 否 |
