#footer 页脚

**介绍**
Footer 页脚：支持基本样式设置，可设置是否固定在底部。


**基本使用**
通过 copyright 属性设置版权信息。

```
<template>
	<view class="">
	
		<my-footer copyright="Copyright © 2013-2023 i6i8.cn.cn"/>
		
	</view>
</template>

<script setup lang="ts">
	import {ref} from 'vue';
	let navigate = ref([
		{
			url: 'String', //应用内的跳转链接，值为相对路径或绝对路径
			openType: 'String', //跳转方式，可取值：navigate、redirect、reLaunch、switchTab、navigateBack等
			delta:'Number', //当 openType 为 'navigateBack' 时有效，表示回退的层数
			text:'String', //链接文本
			color:'String', //文本字体颜色
			size:'String'  //文本字体大小，单位rpx
		},
		{
			url: '/pages/index/index', 
			openType: 'navigate', 
			text:'返回首页', 
		},
		{
			url: '/pages/user/user',
			openType: 'navigate', 
			text:'用户中心', 
		},
	])
</script>

```

**设置导航链接**
通过 navigate 属性设置导航链接。
```
<my-footer :navigate="navigate" copyright="Copyright © 2013-2023 i6i8.cn.cn"/>

```


**固定于底部**
通过 fixed 属性设置页脚是否固定于底部。
```
<my-footer copyright="Copyright © 2013-2023 i6i8.cn.cn" fixed/>
```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| copyright |底部版权文本 | string | 'All Rights Reserved.' | 否 |
| color | copyright 字体颜色| string | '#A7A7A7' | 否 |
| size |字体大小 | string | '13px' | 否 |
| navigate |导航链接设置| arrar | '[]' | 否 |
| bgColor | footer背景颜色| string | 'transparent' | 否 |
| linkColor | 链接文本颜色，navigate 属性中未传color值时有效 | string | '#586c94' | 否 |
| fixed | 是否固定在底部| boolean | 'true' | 否 |
| z-index | 设置组件的 z-index 层级 | number | '100' | 否 |

