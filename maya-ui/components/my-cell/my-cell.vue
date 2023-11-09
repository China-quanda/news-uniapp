<template>
	<view :class="[clickable || isLink ? 'clickable' : '', border ? 'border' : '', 'my-cell', disabled ? 'cell-disabled' : '']" @tap="handleTap">
		<view class="my-cell-left">
			<view class="title">
				<slot name="icon"><my-icon v-if="icon" class="icon" :icon="icon" size="16" color="#969799" /></slot>
				<slot name="title">{{ title }}</slot>
			</view>
			<view class="label">
				<slot name="label">{{ label }}</slot>
			</view>
		</view>
		<view class="my-cell-right">
			<view class="value">
				<slot name="value">{{ value }}</slot>
			</view>
			<view class="rightIcon" v-if="isLink">
				<slot name="rightIcon"><my-icon :icon="rightIcon" size="14" color="#969799" /></slot>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, onUpdated } from 'vue';
import router from '@/utils/router';
import { isHttp } from '@/utils/validate';
// const props = defineProps({
// 	// 左侧标题
// 	title: {
// 		type: String,
// 		default: ''
// 	},
// 	// 标题下方的描述信息
// 	label: {
// 		type: String,
// 		default: ''
// 	},
// 	// 右侧的内容
// 	value: {
// 		type: String,
// 		default: ''
// 	},
// 	// 是否显示下边框
// 	border: {
// 		type: Boolean,
// 		default: true
// 	},
// 	// 点击后跳转的URL地址
// 	url: {
// 		type: String,
// 		default: ''
// 	},
// 	// 链接跳转的方式
// 	linkType: {
// 		type: String,
// 		default: 'push',
// 		validator(value) {
// 			return ['push', 'tab', 'redirect', 'reLaunch'].includes(value);
// 		}
// 	},
// 	// 是否开启点击反馈(表现为点击时加上灰色背景)
// 	clickable: {
// 		type: Boolean,
// 		default: false
// 	},
// 	// 是否展示右侧箭头并开启点击反馈
// 	isLink: {
// 		type: Boolean,
// 		default: false
// 	},
// 	// 是否显示表单必填星号
// 	// required:{
// 	// 	type: Boolean,
// 	// 	default: false
// 	// },
// 	// 右侧的图标箭头
// 	rightIcon: {
// 		type: String,
// 		default: 'icon-xiangyoujiantou'
// 	},
// 	// 在标题左侧展示图标。
// 	icon: {
// 		type: String,
// 		default: ''
// 	},
// 	// 对齐方式
// 	align: {
// 		type: String,
// 		default: 'center',
// 		validator(value) {
// 			return ['flex-start', 'flex-end', 'center'].includes(value);
// 		}
// 	}
// });
interface PorpsType {
	title?: string; // 左侧标题
	label?: string; // 标题下方的描述信息
	value?: string; // 右侧的内容
	border?: boolean; // 是否显示下边框
	url?: string; // 点击后跳转的URL地址
	linkType?: string; // 链接跳转的方式
	clickable?: boolean; // 是否开启点击反馈(表现为点击时加上灰色背景)
	isLink?: boolean; // 是否展示右侧箭头并开启点击反馈
	disabled?: boolean; // 是否禁用单元格
	icon?: string; // 在标题左侧展示图标。
	rightIcon?: string; // 右侧的图标箭头
	align?: string; //对齐方式
}
// required:boolean// 是否显示表单必填星号
const props = withDefaults(defineProps<PorpsType>(), {
	title: '',
	label: '',
	value: '',
	border: true,
	url: '',
	linkType: 'push' || 'tab' || 'redirect' || 'reLaunch',
	align: 'center' || 'flex-start' || 'flex-end',
	clickable: false,
	isLink: false,
	disabled: false,
	icon: '',
	rightIcon: 'icon-xiangyoujiantou'
});

interface EmitsType {
	(e: 'click'): void;
}
const emit = defineEmits<EmitsType>();

const handleTap = () => {
	if (props.disabled) return;
	emit('click');
	if (!props.url || !props.isLink) return;
	if (isHttp(props.url)) {
		router.push(`/pages/common/webview/index?title=${props.title}&url=${props.url}`);
	} else {
		if (props.linkType === 'push') return router.push(props.url);
		if (props.linkType === 'tab') return router.tab(props.url);
		if (props.linkType === 'redirect') return router.redirect(props.url);
		if (props.linkType === 'reLaunch') return router.reLaunch(props.url);
	}
};
</script>

<style lang="scss" scoped>
.my-cell {
	display: flex;
	justify-content: space-between;
	align-items: v-bind('props.align');
	box-sizing: border-box;
	padding: 10px 15px;
	background-color: #fff;
	color: #323233;
	line-height: 22px;
	font-size: 14px;
	.my-cell-left {
		.icon {
			margin-right: 2px;
		}
		.label {
			font-size: 12px;
			color: #909193;
			line-height: 18px;
		}
	}
	.my-cell-right {
		display: flex;
		align-items: center;
		.value {
			text-align: right;
			font-size: 13px;
			line-height: 24px;
			color: #606266;
		}
	}
}
.clickable {
	&:active {
		background-color: #fafcff;
		transform: background-color 0.5s;
	}
}
.cell-disabled {
	opacity: 0.6;
	cursor: not-allowed;
	&:active {
		background-color: transparent;
		transform: background-color 0s;
	}
}
.border {
	border-bottom: 0.5px solid #ebedf0;
}
</style>
