<template>
	<view>
		<view
			ref="myBtnRef"
			:class="[
				'button-all',
				buttonType,
				buttonSize,
				plain ? 'button-plain' : '',
				hairline ? 'button-hairline' : '',
				disabled ? 'button-disabled' : '',
				loading ? 'button-loading' : '',
				shape === 'circle' ? 'button-shape' : ''
			]"
			:style="myBtnStyle"
			@tap="tapButton"
		>
			<view v-if="loading" style="display: flex; align-items: center;">
				<view class="loading" />
				<view v-if="loadingText" style="margin-left: 10px;">
					<slot>{{ loadingText }}</slot>
				</view>
			</view>

			<view class="" v-if="icon" style="display: flex; align-items: center;">
				<my-icon :icon="icon" color="#fff"/>
				<view style="margin-left: 10px;">
					<slot>{{ text }}</slot>
				</view>
				<!-- <slot><view style="margin-left: 10px;">{{ text }}</view></slot> -->
			</view>

			<view class="" v-if="!icon && !loading">
				<slot>{{ text }}</slot>
			</view>
		</view>
	</view>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, onMounted, nextTick, watch } from 'vue';
import router from '@/utils/router';
import { isHttp } from '@/utils/validate';
const props = defineProps({
	type: {
		// 按钮类型 ：primary、success、info、warning、danger 默认为 default
		type: String,
		default: 'default'
	},
	size: {
		// 按钮尺寸 :支持 large、normal、small、mini 四种尺寸，默认为 normal。
		type: String,
		default: 'normal'
	},
	plain: {
		// 朴素按钮 通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。
		type: Boolean,
		default: false
	},
	hairline: {
		// 细边框 设置 hairline 属性可以展示 0.5px 的细边框。
		type: Boolean,
		require: false
	},
	disabled: {
		// 禁用状态 通过 disabled 属性来禁用按钮，禁用状态下按钮不可点击。
		type: Boolean,
		require: false
	},
	loading: {
		// 加载状态 通过loading值设置是否开启加载图标，loadingText设置加载中文字
		type: Boolean,
		require: false
	},
	loadingText: {
		// 加载状态 通过loading值设置是否开启加载图标，loadingText设置加载中文字
		type: String,
		require: ''
	},
	shape: {
		// 按钮形状 通过shape值设置按钮形状，circle为圆角
		type: String,
		require: 'shape'
	},
	color: {
		// 自定义颜色 通过color值设置按钮渐变颜色
		type: String,
		default: ''
	},
	text: {
		// 按钮文字
		type: String,
		default: ''
	},
	icon: {
		// 左侧图标名称或图片链接，等同于 Icon 组件的
		type: String,
		default: ''
	},
	url: {
		// 点击后跳转的链接地址
		type: String,
		default: ''
	},
	// 链接跳转的方式
	linkType: {
		type: String,
		default: 'push'
	}
});
const emits = defineEmits(['click']);
const myBtnRef = ref(null);
const buttonType = computed(() => `button-type-${props.type}`);
const buttonSize = computed(() => `button-size-${props.size}`);
const isType = v => {
	const map = {
		primary: '#3c9cff',
		success: '#5ac725',
		default: '#ccc',
		info: '#e2e2e2',
		warning: '#f9ae3d',
		danger: '#f56c6c'
	};
	return map[v];
};
let color = ref('');
let myBtnStyle = reactive({
	color: '',
	background: '',
	border: '',
	'border-color': ''
});
const setMyBtnStyle = () => {
	nextTick(() => {
		if (!props.color) return;
		if (props.plain) {
			myBtnStyle['color'] = props.color;
			myBtnStyle['border-color'] = props.color;
			return;
		}
		myBtnStyle['color'] = 'white';
		myBtnStyle['background'] = props.color;
		const gradient = props.color.search('linear-gradien') != -1;
		if (gradient) {
			myBtnStyle['border'] = 'none';
			return;
		}
		myBtnStyle['border-color'] = props.color;
	});
};
const tapButton = e => {
	if (props.disabled || props.loading) return;
	emits('click', e);
	if (!props.url) return;
	if (isHttp(props.url)) {
		router.push(`/pages/common/webview/index?title=${props.text}&url=${props.url}`);
	} else {
		if (props.linkType === 'push') return router.push(props.url);
		if (props.linkType === 'tab') return router.tab(props.url);
		if (props.linkType === 'redirect') return router.redirect(props.url);
		if (props.linkType === 'reLaunch') return router.reLaunch(props.url);
	}
};
onMounted(() => {
	color.value = isType(props.type);
	setMyBtnStyle();
});
watch(
	() => props.color,
	val => {
		setMyBtnStyle();
	}
);
</script>

<style lang="scss" scoped>
// 按钮类型 ：primary、success、info、warning、error 默认为 default
.button-all {
	border: 1px solid #ccc;
	color: #fff;
	border-radius: 3px;
	cursor: pointer;
	display: inline-block;
	box-sizing: border-box;
	&:active {
		// background-color: v-bind(color);
		opacity: 0.6;
		transform: all 0.5s;
	}
	display: flex;
	align-items: center;
	justify-content: center;
}
.button-type-default {
	background-color: #fff;
	color: #000;
	border-color: #ccc;
}
.button-type-primary {
	background-color: #3c9cff;
	border-color: #3c9cff;
}
.button-type-success {
	background-color: #5ac725;
	border-color: #5ac725;
}
.button-type-info {
	background-color: #e2e2e2;
	border-color: #e2e2e2;
	// color: #000;
}
.button-type-warning {
	background-color: #f9ae3d;
	border-color: #f9ae3d;
}
.button-type-danger {
	background-color: #f56c6c;
	border-color: #f56c6c;
}

// 按钮尺寸 :支持 large、normal、small、mini 四种尺寸，默认为 normal。
.button-size-large {
	width: 100%;
	height: 50px;
	padding: 0 15px;
	font-size: 16px;
}
.button-size-normal {
	height: 40px;
	padding: 0 15px;
	font-size: 14px;
}
.button-size-small {
	height: 30px;
	padding: 0 8px;
	font-size: 12px;
}
.button-size-mini {
	height: 22px;
	font-size: 10px;
	padding: 0 8px;
}

// 朴素按钮 通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。
.button-plain {
	background-color: #fff;
	color: v-bind(color);
	border-color: v-bind(color);
}

// 细边框 设置 hairline 属性可以展示 0.5px 的细边框。
.button-hairline {
	border: 0.5px solid #ccc;
	border-color: v-bind(color);
}

// 禁用状态 通过 disabled 属性来禁用按钮，禁用状态下按钮不可点击。
.button-disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

// 加载状态 通过loading值设置是否开启加载图标，loadingText设置加载中文字
.button-loading {
	cursor: default;
}
// 圆形按钮
.button-shape {
	border-radius: 100px;
}

.loading {
	width: 16px;
	height: 16px;
	border: 2px solid #1890ff;
	border-bottom: 0.8px solid rgba(24, 144, 255, 0.2);
	border-left: 0.8px solid rgba(24, 144, 255, 0.2);
	border-right: 0.8px solid rgba(24, 144, 255, 0.2);
	border-radius: 50%;
	box-sizing: border-box;
	animation: rotate 0.75s linear infinite;
}

@keyframes rotate {
	to {
		transform: rotate(360deg);
	}
}
</style>
