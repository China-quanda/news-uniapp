<template>
	<view class="">
		<my-cell-group title="标题1" inset>
			<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
			<my-cell title="标题" value="value"></my-cell>
			<my-cell title="标题" value="value" label="label"></my-cell>
		</my-cell-group>
		<my-cell-group title="标题2" inset>
			<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
			<my-cell title="标题" value="value"></my-cell>
			<my-cell title="标题" value="value" label="label"></my-cell>
		</my-cell-group>

		Cell 单元格 cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。 基本用法
		<my-cell title="标题" value="value"></my-cell>
		<my-cell title="标题" value="value" label="label"></my-cell>

		展示图标 通过 icon 属性在标题左侧展示图标。
		<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>

		展示右箭头 设置isLink为true，将会显示右侧的箭头,通过rightIcon属性设置箭头方向 上箭头icon-xiangshang，下箭头icon-xiala，左箭头icon-xiangzuojiantou，右箭头icon-xiangyoujiantou
		<my-cell title="标题" value="value" isLink></my-cell>
		<my-cell title="标题" value="value" isLink rightIcon="icon-xiala"></my-cell>

		不显示下边框
		<my-cell title="标题" value="value" :border="false"></my-cell>

		页面导航 设置isLink为true，单元格点击可跳转页面,传入url设置跳转地址 通过linkType属性设置跳转的类型'push', 'tab', 'redirect','reLaunch'
		<my-cell title="标题" value="value" isLink url="/pages/index/index"></my-cell>
		<my-cell title="标题" value="value" isLink url="/pages/index/index"></my-cell>

		开启点击反馈 通过clickable属性开启点击反馈
		<my-cell title="标题" value="value" isLink clickable></my-cell>

		对齐方式 通过align属性设置对齐方式
		<my-cell title="标题" value="value" label="label" align="flex-start"></my-cell>
		<my-cell title="标题" value="value" label="label" align="center"></my-cell>
		<my-cell title="标题" value="value" label="label" align="flex-end"></my-cell>

		自定义插槽内容 title 自定义左侧标题部分的内容，如需使用，请勿定义title参数，或赋值null即可 value 自定义右侧标题部分的内容，如需使用，请勿定义value参数，或赋值null即可 icon
		自定义左侧的图标 right-icon 自定义右侧图标内容 label 自定义label内容
		<my-cell isLink>
			<block v-slot:icon><i class="iconfont icon-weixiao"></i></block>
			<block v-slot:title>自定义title</block>
			<block v-slot:value>自定义value</block>
			<block v-slot:label>自定义label</block>
			<block v-slot:rightIcon><i class="iconfont icon-xiangyoujiantou"></i></block>
		</my-cell>
	</view>
</template>

<script setup lang="ts"></script>

<style></style>
