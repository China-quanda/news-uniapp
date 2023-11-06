<template>
	<view class="">
		基础用法
		通过 copyright 属性设置版权信息。
		<my-footer copyright="Copyright © 2013-2023 i6i8.cn.cn"/>
		
		设置导航链接
		通过 navigate 属性设置导航链接。
		<my-footer :navigate="navigate" copyright="Copyright © 2013-2023 i6i8.cn.cn"/>
		
		固定于底部
		通过 fixed 属性设置页脚是否固定于底部。
		<my-footer copyright="Copyright © 2013-2023 i6i8.cn.cn" fixed/>
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
			// color:'String', //文本字体颜色
			// size:'String'  //文本字体大小，单位rpx
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
