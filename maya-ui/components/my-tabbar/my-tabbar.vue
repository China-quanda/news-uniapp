<template>
	<view class="tabbar">
		<view class="tabbar-content" :class="{ 'tabbar-border': border, 'tabbar-fixed': fixed }">
			<view class="tabbar-content-wrapper"><slot></slot></view>
		</view>
		<view v-if="fixed" class="tabbar-placeholder"></view>
	</view>
</template>

<script setup lang="ts">
import { provide } from 'vue';
const props = defineProps({
	modelValue:{ // 当前tabbar索引
		type: [Number, String],
		default: ''
	},
	activeColor: {
		// 选中标签的颜色
		type: String,
		default: '#3c9cff'
	},
	inactiveColor: {
		// 未选中标签的颜色
		type: String,
		default: '#606266'
	},
	bgColor: {
		// 背景颜色
		type: String,
		default: '#fff'
	},
	fixed: {
		//是否固定在底部
		type: Boolean,
		default: true
	},
	route: {
		//是否开启路由模式
		type: Boolean,
		default: false
	},
	border: {
		//是否显示上方边框
		type: Boolean,
		default: true
	},
	zIndex: {
		// 设置组件的 z-index 层级
		type: Number,
		default: 100
	}
});
provide('tabbar', props);

interface EmitsType {
	(e: 'change', e): void;
	(e: 'update:modelValue', e): void;
}
const emit = defineEmits<EmitsType>();

uni.$on('clickTabbarItem', data => {
	emit('update:modelValue',data.name)
	emit('change', data);
});
</script>

<style scoped lang="scss">
.tabbar {
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	z-index: v-bind('props.zIndex');
	.tabbar-content {
		display: flex;
		flex-direction: column;
		background-color: v-bind('props.bgColor');
		box-sizing: border-box;
		.tabbar-content-wrapper {
			height: 50px;
			display: flex;
			flex-direction: row;
		}
	}
	.tabbar-border {
		border-top: 1px solid #e6e8ed;
	}
	.tabbar-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.tabbar-placeholder {
		height: 50px;
	}
}
</style>
