<template>
	<my-overlay :show="show" :tapClose="tapClose" :className="overlayClass" :customStyle="overlayStyle" :lockScroll="lockScroll" @click="clickOverlay" @update:show="closed">
		<view :class="['dialog', show ? 'show' : '', hide ? 'hide' : '']" @tap.stop="() => {}">
			<view v-if="showTitle" class="dialog-title">
				<slot name="title">{{ title }}</slot>
			</view>
			<view v-if="showContent" class="dialog-content">
				<slot>
					<template v-if="allowHtml">
						<rich-text :nodes="content"></rich-text>
					</template>
					<template v-else>
						<view class="dialog-content-image"></view>
						<view class="dialog-content-text">{{ content }}</view>
					</template>
				</slot>
			</view>

			<view class="dialog-line"></view>
			<view class="dialog-button-group" :class="{ reverse: buttonReverse }">
				<slot name="button">
					<my-button v-if="showCancelButton" class="dialog-button-group-cancel" :disabled="cancelButtonDisabled" @tap="emit('cancel')">{{ cancelText }}</my-button>

					<view v-if="showCancelButton" class="dialog-button-group-line"></view>

					<my-button v-if="showConfirmButton" class="dialog-button-group-confirm" :disabled="confirmButtonDisabled" @tap="emit('confirm')">{{ confirmText }}</my-button>
				</slot>
			</view>
		</view>
	</my-overlay>
</template>
<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue';
// import {onBackPress } from '@dcloudio/uni-app';
// onBackPress(e => {// 监听返回上一页功能
// 	console.log('e', onBackPress);
// });
const slots = useSlots();
const props = defineProps({
	show: {
		// 是否显示弹出框
		type: Boolean,
		default: false
	},
	title: {
		// 标题内容
		type: String,
		default: ''
	},
	content: {
		// 弹出框内容，如传入slot内容，则此参数无效
		type: String,
		default: ''
	},
	contentAlign: {
		// 内容水平对齐方式，可选值为 left right justify center
		type: String,
		default: 'justify',
		validator(value) {
			return ['left', 'right', 'justify', 'center'].includes(value);
		}
	},
	confirmText: {
		// 确认按钮的文字
		type: String,
		default: '确认'
	},
	cancelText: {
		// 取消按钮的文字
		type: String,
		default: '取消'
	},
	showConfirmButton: {
		//是否显示确认按钮
		type: Boolean,
		default: true
	},
	showCancelButton: {
		//是否显示取消按钮
		type: Boolean,
		default: false
	},
	confirmButtonDisabled: {
		//是否禁用确认按钮
		type: Boolean,
		default: false
	},
	cancelButtonDisabled: {
		//是否禁用取消按钮
		type: Boolean,
		default: false
	},
	confirmColor: {
		// 确认按钮的颜色
		type: String,
		default: '#2979ff'
	},
	cancelColor: {
		// 取消按钮的颜色
		type: String,
		default: '#606266'
	},
	buttonReverse: {
		//对调确认和取消的位置
		type: Boolean,
		default: false
	},
	tapClose: {
		//是否允许点击遮罩关闭dialog（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调）
		type: Boolean,
		default: false
	},
	zIndex: {
		// 自定义弹窗的 z-index 层级
		type: Number,
		default: 8
	},
	lockScroll: {
		//是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动
		type: Boolean,
		default: false
	},
	width: {
		// 弹窗宽度，默认单位为 px
		type: String,
		default: '320px'
	},
	overlayClass: {
		// 自定义遮罩层类名
		type: String,
		default: ''
	},
	overlayStyle: {
		// 自定义遮罩层样式
		type: Object,
		default: () => {}
	},
	allowHtml: {
		// 是否允许 content 内容中渲染 HTML
		type: Boolean,
		default: false
	},
	//  未实现功能==========
	closeOnPopstate: {
		// 是否在页面回退时自动关闭
		type: Boolean,
		default: true
	},
	round: {
		// 按钮是否为圆角
		type: Boolean,
		default: true
	},
	zoom: {
		//是否开启缩放模式
		type: Boolean,
		default: true
	},
	overlay: {
		//是否展示遮罩层
		type: Boolean,
		default: true
	}
});
interface EmitsType {
	(e: 'close'): void;
	(e: 'closed'): void;
	(e: 'confirm'): void;
	(e: 'cancel'): void;
}
const emit = defineEmits<EmitsType>();

let hide = ref(false);
const clickOverlay = () => {
	if (!props.tapClose) return false;
	hide.value = true;
	emit('close');
};
const closed = e => {
	hide.value = false;
	emit('closed');
};
const showTitle = computed(() => (!!slots.title || props.title ? true : false));
const showContent = computed(() => (!!slots.default || props.content ? true : false));
</script>

<style lang="scss" scoped>
.dialog {
	display: flex;
	flex-direction: column;
	// align-items: center;
	justify-content: center;
	border-radius: 6px;
	width: v-bind('props.width');
	z-index: v-bind('props.zIndex');
	// position: fixed;
	// left: 50%;
	// top: 50%;
	// transform: translate(-50%,-50%);
	padding-top: 25px;
	margin: 0 auto;
	margin-top: calc(50vh - 25%);
	background-color: #fff;
	.dialog-title {
		font-size: 16px;
		font-weight: 700;
		color: #606266;
		text-align: center;
		// padding-top: 25px;
	}
	.dialog-content {
		padding: 12px 25px 25px 25px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		text-align: v-bind('props.contentAlign');
		font-size: 15px;
		color: #606266;
	}
	.dialog-line {
		margin: 0px;
		border-bottom: 1px solid rgb(214, 215, 217);
		width: 100%;
		transform: scaleY(0.5);
		border-top-color: rgb(214, 215, 217);
		border-right-color: rgb(214, 215, 217);
		border-left-color: rgb(214, 215, 217);
	}
	.dialog-button-group {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.dialog-button-group-line {
			vertical-align: middle;
			margin: 0px;
			border-left: 1px solid rgb(214, 215, 217);
			height: 100%;
			height: 48px;
			transform: scaleX(0.5);
			border-top-color: rgb(214, 215, 217);
			border-right-color: rgb(214, 215, 217);
			border-bottom-color: rgb(214, 215, 217);
		}
		.dialog-button-group-confirm,
		.dialog-button-group-cancel {
			border: none;
			width: 100%;
			// width: v-bind('props.width');
			height: 48px;
			line-height: 48px;
			&:active {
				opacity: 1;
				background-color: #f3f4f6;
			}
		}
		.dialog-button-group-confirm {
			color: v-bind('props.confirmColor');
		}
		.dialog-button-group-cancel {
			color: v-bind('props.cancelColor');
		}
	}
	.reverse {
		flex-direction: row-reverse;
	}
}

// 添加动画后会有未知闪屏
.show {
	// -webkit-animation: 300ms show ease-out ;
	// animation: 300ms show ease-out;
}
.hide {
	// -webkit-animation: 300ms hide ease-out ;
	// animation: 300ms hide ease-out;
}

@keyframes show {
	0% {
		transform: scale(0);
		opacity: 0;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}

@keyframes hide {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	100% {
		opacity: 0;
		transform: scale(0);
	}
}
</style>
