<template>
	<view class="avatar">
		<my-image
			:width="width"
			:height="height"
			:src="text ? 'xx' : src"
			:mode="mode"
			:shape="shape"
			:bgColor="isRandomColor ? randomColor : bgColor"
			:radius="radius"
			:showLoading="showLoading"
			:showError="showError"
			:loadingIcon="loadingIcon"
			loadingText=""
			:errorIcon="errorIcon"
			errorText=""
			:iconSize="iconSize"
			:textSize="textSize"
			@load="imageLoad"
			@error="imageError"
		>
			<block v-slot:loading><my-icon :icon="loadingIcon" :size="iconSize" color="rgb(243 234 234)" /></block>
			<block v-slot:error>
				<view v-if="text" class="avator-text-box"><view class="avator" :alt="text" /></view>
				<my-icon v-else :icon="errorIcon" :size="iconSize" color="rgb(243 234 234)" />
			</block>
		</my-image>
		<view class="badge" v-if="showBadge"></view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
const props = defineProps({
	text: {
		// 用文字替代图片，级别优先于src
		type: String,
		default: ''
	},
	color: {
		// 文字头像字体颜色
		type: String,
		default: '#fff'
	},
	randomBgColor: {
		// 是否开启随机背景颜色，在text文字头像下有效
		type: Boolean,
		default: false
	},
	showBadge: {
		// 是否开启badge
		type: Boolean,
		default: false
	},
	badgeColor: {
		// badge颜色
		type: String,
		default: 'red'
	},
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
		default: '40px'
	},
	height: {
		//高度，单位任意，如果为数值，默认单位px
		type: String,
		default: '40px'
	},
	bgColor: {
		type: String,
		default: '#f7f8fa'
	},
	radius: {
		// 圆角，默认单位px
		type: String,
		default: '4px'
	},
	shape: {
		// 图片形状，circle-圆形，square-方形
		type: String,
		default: 'circle'
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
		default: 'icon-touxiang'
	},
	errorIcon: {
		// 加载失败的图标，或者小图片
		type: String,
		default: 'icon-touxiang'
	},
	iconSize: {
		//加载图标和失败图标的大小
		type: String,
		default: '26px'
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
const emits = defineEmits(['load', 'error']);
// 生产随机颜色
let randomColor = ref(
	`#${Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padEnd(6, '0')}`
);

const isRandomColor = computed(() => {
	return props.text && props.randomBgColor;
});

const imageLoad = (e) => {
	emits('load', e);
};
const imageError = (e) => {
	emits('error', e);
};

onMounted(() => {
	// randomBgColor()
});
</script>

<style lang="scss" scoped>
.avatar {
	display: inline-block;
	position: relative;
	width: v-bind('props.width');
	height: v-bind('props.height');
	.badge {
		position: absolute;
		width: 7px;
		height: 7px;
		background-color: v-bind('props.badgeColor');
		border-radius: 50%;
		bottom: 8px;
		right: -4px;
		border: 1.5px solid #fff;
	}
	.avator-text-box {
		display: flex;
		align-items: center;
		gap: 15px;
		font-size: v-bind('props.textSize');
		.avator {
			width: v-bind('props.width');
			height: v-bind('props.height');
			overflow: hidden;
		}
		& ::before {
			content: attr(alt);
			display: flex;
			width: 100%;
			height: 100%;
			text-transform: uppercase;
			line-height: v-bind('props.height');
			letter-spacing: v-bind('props.height');
			text-indent: v-bind('props.height');
			justify-content: center;
			text-align: center;
			// word-break: break-all;
			line-break: anywhere;
			color: v-bind('props.color');
		}
	}
}
</style>
