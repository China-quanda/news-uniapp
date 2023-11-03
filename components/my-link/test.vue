<template>
	<view class="">
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
	</view>
</template>

<script setup lang="ts">
</script>

<style>
</style>