<template>
	<view :class="['scrollList']">
		<scroll-view :scroll-x="true" class="scrollCon">
			<view class="monthItem">1月</view>
			<view class="monthItem">2月</view>
			<view class="monthItem">3月</view>
			<view class="monthItem">4月</view>
			<view class="monthItem">5月</view>
			<view class="monthItem">6月</view>
			<view class="monthItem">7月</view>
			<view class="monthItem">8月</view>
			<view class="monthItem">9月</view>
			<view class="monthItem">10月</view>
			<view class="monthItem">11月</view>
			<view class="monthItem">12月</view>
		</scroll-view>
		<view class="indicator">
			<view class="indicator-line">
				<view class="indicator-line-bar"></view>
			</view>
		</view>
		<!-- <slot></slot> -->
	</view>
</template>
<script lang="ts" setup>
const props = defineProps({
	stickyTop: {// 吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px	H5:44，其他:0
		type:String,
		default: '0px',
	},
	stickyBottom: {// 吸底时与底部的距离，支持 px vw vh rem 单位，默认 px
		type:String,
		default: '0px',
	},
	bgColor: {// 组件背景颜色
		type: String,
		default: 'transparent' 
	},
	disabled: {// 是否禁用吸顶功能
		type:Boolean,
		default:false
	},
	zIndex: {// 设置组件的 z-index 层级
		type:Number,
		default: 100
	},
	position:{//吸附位置，可选值为 bottom top
		type: String,
		default: 'top' 
	},
});
</script>

<style lang="scss" scoped>
.scrollList{
	padding-bottom: 10px;
	.indicator{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 15px;
		.indicator-line{
			width: 60px;
			height: 4px;
			border-radius: 100px;
			overflow: hidden;
			
			idth: 50px;
			background-color: rgb(242, 242, 242);
			.indicator-line-bar{
				width: 20px;
				height: 4px;
				border-radius: 100px;
				width: 20px;
				background-color: rgb(60, 156, 255);
				transform: translateX(10.8368px);
			}
		}
	}
}
.scrollCon{
	white-space: nowrap;
	display: flex;
	align-items: center;
}
	
.monthItem{
	display: inline-block;
	width: calc(100% / 6);
	font-size: 26rpx;
	color: #3D3D3D;
	text-align: center;
}
</style>
