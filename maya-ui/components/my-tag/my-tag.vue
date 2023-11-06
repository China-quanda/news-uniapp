<template>
	<view>
		<my-badge 
		:value="closable ? 'X' : 0" 
		:customStyle="badgeStyle"
		@click="close">
			<view
				ref="myTagRef"
				:class="[
					'tag',
					tagType,
					tagSize,
					plain ? 'tag-plain' : '',
					hairline ? 'tag-hairline' : '',
					disabled ? 'tag-disabled' : '',
					loading ? 'tag-loading' : '',
					shape === 'circle' ? 'tag-shape' : ''
				]"
				:style="myTagStyle"
				@tap="taptag"
			>
			
				<view v-if="loading" style="display: flex; align-items: center;">
					<view class="loading"/>
					<view style="margin-left: 10px;">
						<text v-if="loadingText">
							{{ loadingText }}
						</text>
						<text v-else>
							<slot>{{ loadingText }}</slot>
						</text>
					</view>
				</view>
			
				<view v-if="icon" style="display: flex; align-items: center;">
					<my-icon :icon="icon" :color="iconColor"/>
					<view style="margin-left: 10px;">
						<text v-if="text">
							{{ text }}
						</text>
						<text v-else>
							<slot></slot>
						</text>
					</view>
					<!-- <slot><view style="margin-left: 10px;">{{ text }}</view></slot> -->
				</view>
			
				<view v-if="!icon && !loading">
					<slot>{{ text }}</slot>
				</view>
			</view>
		</my-badge>
		
	</view>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, onMounted, nextTick, watch } from 'vue';
import router from '@/utils/router';
import { isHttp } from '@/utils/validate';
const props = defineProps({
	type: {
		// 标签类型 ：primary、success、info、warning、danger 默认为 default
		type: String,
		default: 'default',
		validator(value) {
			return ['primary', 'success', 'info','warning','danger'].includes(value);
		}
	},
	size: {
		// 标签尺寸 :支持 large、normal、small、mini 四种尺寸，默认为 normal。
		type: String,
		default: 'small',
		validator(value) {
			return ['large', 'normal', 'small','mini'].includes(value);
		}
	},
	plain: {
		// 朴素标签 通过 plain 属性将标签设置为朴素标签，朴素标签的文字为标签颜色，背景为白色。
		type: Boolean,
		default: false
	},
	hairline: {
		// 细边框 设置 hairline 属性可以展示 0.5px 的细边框。
		type: Boolean,
		require: false
	},
	disabled: {
		// 禁用状态 通过 disabled 属性来禁用标签，禁用状态下标签不可点击。
		type: Boolean,
		require: false
	},
	closable: {
		// 是否可关闭，设置为true，文字右边会出现一个关闭图标
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
		// 标签形状 通过shape值设置标签形状，circle为圆角
		type: String,
		require: 'shape',
		validator(value) {
			return ['shape', 'circle'].includes(value);
		}
	},
	color: {
		// 自定义颜色 通过color值设置标签渐变颜色
		type: String,
		default: ''
	},
	text: {
		// 标签文字
		type: String,
		default: ''
	},
	icon: {
		// 左侧图标名称或图片链接，等同于 Icon 组件的
		type: String,
		default: ''
	},
	iconColor:{
		// 自定义图标颜色
		type: String,
		default: '#ccc'
	},
	url: {
		// 点击后跳转的链接地址
		type: String,
		default: ''
	},
	// 链接跳转的方式
	linkType: {
		type: String,
		default: 'push',
		validator(value) {
			return ['push', 'tab', 'redirect','reLaunch'].includes(value);
		}
	}
});
const emits = defineEmits(['click','close']);
const myTagRef = ref(null);
const tagType = computed(() => `tag-type-${props.type}`);
const tagSize = computed(() => `tag-size-${props.size}`);
let badgeStyle = reactive({
	fontSize :'12px',
	backgroundColor:'#c6c7cb',
	transform: '',
	top:'-8px',
	right:'-8px'
})
const setBadgeStyle = ()=>{
	if(props.size === 'large') badgeStyle.transform = 'scale(0.95)'
	if(props.size === 'normal') badgeStyle.transform = 'scale(0.9)'
	if(props.size === 'small') badgeStyle.transform = 'scale(0.8)'
	if(props.size === 'mini') badgeStyle.transform = 'scale(0.7)'
}
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
let myTagStyle = reactive({
	color: '',
	background: '',
	border: '',
	borderColor: ''
});
const setMyTagStyle = () => {
	nextTick(() => {
		if (!props.color) return;
		if (props.plain) {
			myTagStyle.color = props.color;
			myTagStyle.borderColor = props.color;
			return;
		}
		myTagStyle.color = 'white';
		myTagStyle.background = props.color;
		const gradient = props.color.search('linear-gradien') != -1;
		if (gradient) {
			myTagStyle.border = 'none';
			myTagStyle.background = props.color;
			return;
		}
		myTagStyle.borderColor = props.color;
	});
};
const close = ()=>{
	if(props.closable) emits('close');
}
const taptag = e => {
	if (props.disabled || props.loading || props.closable) return;
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
	setMyTagStyle();
	setBadgeStyle()
});

watch(
	() => props,
	val => {
		if(props.color) setMyTagStyle();
		if(props.size) setBadgeStyle()
	}
);
</script>

<style lang="scss" scoped>
	::v-deep(.badge-content){
		// background-color: #000;
		color: #000;
	}
	// ::v-deep(.badge-content ){
	// 	background-color: #000;
	// }
// 标签类型 ：primary、success、info、warning、error 默认为 default
.tag {
	border: 1px solid #ccc;
	color: #fff;
	border-radius: 3px;
	cursor: pointer;
	display: inline-block;
	text-align: center;
	box-sizing: border-box;
	&:active {
		// background-color: v-bind(color);
		opacity: 0.6;
		transform: all 0.5s;
	}
}
.tag-type-default {
	background-color: #fff;
	color: #000;
	border-color: #ccc;
}
.tag-type-primary {
	background-color: #3c9cff;
	border-color: #3c9cff;
}
.tag-type-success {
	background-color: #5ac725;
	border-color: #5ac725;
}
.tag-type-info {
	background-color: #e2e2e2;
	border-color: #e2e2e2;
	// color: #000;
}
.tag-type-warning {
	background-color: #f9ae3d;
	border-color: #f9ae3d;
}
.tag-type-danger {
	background-color: #f56c6c;
	border-color: #f56c6c;
}

// 标签尺寸 :支持 large、normal、small、mini 四种尺寸，默认为 normal。
.tag-size-large {
	width: 100%;
	height: 50px;
	line-height: 50px;
	padding: 0 15px;
	font-size: 16px;
}
.tag-size-normal {
	height: 40px;
	line-height: 40px;
	padding: 0 15px;
	font-size: 14px;
}
.tag-size-small {
	height: 30px;
	line-height: 30px;
	padding: 0 8px;
	font-size: 12px;
}
.tag-size-mini {
	height: 22px;
	line-height: 22px;
	font-size: 10px;
	padding: 0 8px;
}

// 朴素标签 通过 plain 属性将标签设置为朴素标签，朴素标签的文字为标签颜色，背景为白色。
.tag-plain {
	background-color: #fff;
	color: v-bind(color);
	border-color: v-bind(color);
}

// 细边框 设置 hairline 属性可以展示 0.5px 的细边框。
.tag-hairline {
	border: 0.5px solid #ccc;
	border-color: v-bind(color);
}

// 禁用状态 通过 disabled 属性来禁用标签，禁用状态下标签不可点击。
.tag-disabled {
	opacity: 0.5;
	cursor: not-allowed;
	&:active {
		opacity: 0.5;
	}
}

// 加载状态 通过loading值设置是否开启加载图标，loadingText设置加载中文字
.tag-loading {
	cursor: default;
	opacity: 0.9;
	&:active {
		opacity: 0.9;
	}
}
// 圆形标签
.tag-shape {
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
