<template>
	<view class="my-notify">
		<my-status-bar></my-status-bar>
		<view class="my-notify-warpper">
			<slot v-if="icon" name="icon">
				<my-icon :icon="icon" :color="color" :size="1.3 * fontSize" :style="{marginRight: '4px'}"></my-icon>
			</slot>
			<text class="my-notify-warpper-text">{{ message }}</text>
		</view>
	</view>
</template>

<script setup lang="ts">

const emit = defineEmits<{
	(e: 'click'): void;
	(e: 'change', id: number): void;
	(e: 'update:show', value: string): void;
}>();

const props = defineProps({
	// 到顶部的距离
	top: {
		type: [String, Number],
		default: 50
	},
	// 是否展示组件
	// show: {
	// 	type: Boolean,
	// 	default: uni.$u.props.notify.show
	// },
	// type主题，primary，success，warning，error
	icon: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'pink'
	},
	// 字体颜色
	color: {
		type: String,
		default: '#ffffff'
	},
	// 背景颜色
	bgColor: {
		type: String,
		default: ''
	},
	// 展示的文字内容
	message: {
		type: String,
		default: ''
	},
	// 展示时长，为0时不消失，单位ms
	duration: {
		type: [String, Number],
		default: 3000
	},
	// 字体大小
	fontSize: {
		type: [String, Number],
		default: '15px'
	},
	// 是否留出顶部安全距离（状态栏高度）
	safeAreaInsetTop: {
		type: Boolean,
		default: false
	}
});

</script>

<style scoped lang="scss">
.my-notify {
	padding: 8px 10px;
	background-color: #ccc;
	.my-notify-warpper {
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		.my-notify-warpper-text {
			text-align: center;
			color: v-bind('props.color');
			font-size: v-bind('props.fontSize');
		}
	}
}
</style>
