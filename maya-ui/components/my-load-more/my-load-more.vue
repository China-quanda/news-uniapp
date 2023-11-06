<template>
	<view class="load-more">
		<view v-if="showLine" class="line"></view>
		<view class="load-more-content">
			<text v-if="status === 'loadmore'" @tap="handleLoadmore">
				{{loadmoreText}}
			</text>
			<text v-if="status === 'loading'">
				<my-loading v-if="showIcon" :color="iconColor" :type="iconType" :No="iconNo" :text="loadingText"></my-loading>
			</text>
			<text v-if="status === 'nomore'">
				{{nomoreText}}
			</text>
		</view>
		<view v-if="showLine" class="line"></view>
	</view>
</template>
<script lang="ts" setup>
const props = defineProps({
	status: {
		// 组件状态 loadmore、loading、nomore
		type: String,
		default: 'loadmore'
	},
	bgColor: {
		// 背景颜色 transparent(背景透明)
		type: String,
		default: 'transparent'
	},
	loadmoreText: {
		// 加载前的提示语
		type: String,
		default: '加载更多'
	},
	loadingText: {
		// 加载中提示语
		type: String,
		default: '正在加载...'
	},
	nomoreText: {
		// 没有更多的提示语
		type: String,
		default: '没有更多了'
	},
	color: {
		//字体颜色
		type: String,
		default: '#606266'
	},
	showIcon:{
		//加载中时是否显示图标
		type: Boolean,
		default: true
	},
	fontSize: {
		// 字体大小，单位px
		type: String,
		default: '14px'
	},
	// iconSize: {
	// 	// 图标大小，单位px
	// 	type: String,
	// 	default: '16px'
	// },
	iconColor: {
		// 加载中的动画图标的颜色
		type: String,
		default: '#b7b7b7'
	},
	iconNo:{
		// 编号 通过No设置加载动画样式 默认为1 可选1-11
		type:[String,Number],
		default: '3'
	},
	iconType: {
		// 加载中状态的图标 支持classic、spinner、bars、dots、infinity、continuous、progress、wobbling、shapes、pulsing 默认为spinner。
		type: String,
		default: 'spinner'
	},
	showLine:{
		//是否显示左边分割线
		type: Boolean,
		default: false
	},
	lineColor: {
		// 线条颜色
		type: String,
		default: '#E6E8EB'
	},
	lineType:{
		// 线条类型，solid实线，dashed虚线
		type: String,
		default: 'solid'
	},
	height: {
		// 高度
		type: String,
		default: 'auto'
	},
	marginTop: {
		// 与前一个元素的距离，单位px
		type: String,
		default: '10px'
	},
	marginBottom: {
		// 与后一个元素的距离，单位px
		type: String,
		default: '10px'
	},
	
});
const emits = defineEmits(['loadmore']);
const handleLoadmore = ()=>{
	emits('loadmore')
}
</script>

<style lang="scss" scoped>
.load-more {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex: 1;
	margin-top: v-bind('props.marginTop');
	margin-bottom: v-bind('props.marginBottom');
	height: v-bind('props.height');
	background-color: v-bind('props.bgColor');
	.line {
		vertical-align: middle;
		margin: 0px;
		width: 53px;
		border-bottom: 1px v-bind('props.lineType') v-bind('props.lineColor');
	}
	.load-more-content {
		margin: 0 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: v-bind('props.color');
		font-size: v-bind('props.fontSize');
	}
}
</style>
