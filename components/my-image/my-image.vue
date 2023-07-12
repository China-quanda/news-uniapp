<template>
	<view class="my-image">
		<image
			ref="imageRef"
			:class="['my-image-img', shape == 'circle' ? 'circle' : '']"
			:mode="mode"
			:src="src"
			:lazy-load="lazyLoad"
			:show-menu-by-longpress="showMenuByLongpress"
			:fade-show="fadeShow"
			:draggable="draggable"
			@load="imageLoad"
			@error="imageError"
		/>
		<view class="icon" v-if="isLoad || isError">
			<view class="icon-slot" v-if="isLoad && showLoading">
				<my-icon :icon="loadingIcon" :size="iconSize" color="#dcdee0" />
				<text class="icon-slot-text">{{ loadingText }}</text>
			</view>
			<view class="icon-slot" v-if="isError && showError">
				<my-icon :icon="errorIcon" :size="iconSize" color="#dcdee0" />
				<text class="icon-slot-text">{{ errorText }}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
	src: {
		// 图片资源地址
		type: String,
		default: ''
	},
	mode: {
		// 图片裁剪、缩放的模式
		type: String,
		default: 'aspectFill'
	},
	width: {
		//宽度，单位任意，如果为数值，默认单位px
		type: String,
		default: '120px'
	},
	height: {
		//高度，单位任意，如果为数值，默认单位px
		type: String,
		default: '120px'
	},
	bgColor: {
		type: String,
		default: '#f7f8fa'
	},
	radius: {
		// 圆角，默认单位px
		type: String,
		default: '0px'
	},
	shape: {
		// 图片形状，circle-圆形，square-方形
		type: String,
		default: 'square'
	},
	showLoading: {
		// 是否展示图片加载中提示
		type: Boolean,
		default: true
	},
	showError: {
		// 是否展示图片加载失败提示
		type: Boolean,
		default: true
	},
	loadingIcon: {
		// 加载中的图标，或者小图片
		type: String,
		default: 'icon-24gf-pictures'
	},
	loadingText: {
		// 加载中的文字
		type: String,
		default: '加载中'
	},
	errorIcon: {
		// 加载失败的图标，或者小图片
		type: String,
		default: 'icon-24gf-pictureSplit'
	},
	errorText: {
		// 加载失败文字
		type: String,
		default: '加载失败'
	},
	iconSize: {
		//加载图标和失败图标的大小
		type: [String, Number],
		default: 22
	},
	textSize: {
		//加载字体和失败字体的大小
		type: String,
		default: '12px'
	},
	fadeShow: {
		// 图片显示动画效果  仅App-nvue 2.3.4+ Android有效 ======(未实现)
		type: Boolean,
		default: true
	},
	lazyLoad: {
		//图片懒加载。只针对page与scroll-view下的image有效 微信小程序、百度小程序、抖音小程序、飞书小程序 ======(未实现)
		type: Boolean,
		default: false
	},
	showMenuByLongpress: {
		// 开启长按图片显示识别小程序码菜单 ======(未实现)
		type: Boolean,
		default: false
	},
	draggable: {
		// 是否能拖动图片 ======(未实现)
		type: Boolean,
		default: false
	},
	fade: {
		// 是否需要淡入效果  ======(未实现)
		type: Boolean,
		default: true
	},
	duration: {
		// 搭配fade参数的过渡时间，单位ms  ======(未实现)
		type: [String, Number],
		default: 500
	}
});
let imageRef = ref(null);
let isLoad = ref(true);
let isError = ref(false);

const imageLoad = e => {
	console.log(e);
	isLoad.value = false;
};

const imageError = e => {
	console.log(e);
	isError.value = true;
	isLoad.value = false;
};
</script>

<style lang="scss" scoped>
.my-image {
	display: inline-block;
	position: relative;
}
.my-image-img {
	width: v-bind('props.width');
	height: v-bind('props.height');
	border-radius: v-bind('props.radius');
	background-color: v-bind('props.bgColor');
}
.circle {
	border-radius: 50%;
}
.icon {
	position: absolute;
	z-index: 9999;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	.icon-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		.icon-slot-text {
			margin-top: 5px;
			font-size: v-bind('props.textSize');
			color: #cccdd2;
		}
	}
}
</style>
