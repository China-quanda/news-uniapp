<template>
	<view :class="[ 'link', showUnderLine ? 'link-underline' : '' ]" @tap="handleClick">
		<slot>{{ text }}</slot>
	</view>
</template>
<script lang="ts" setup>
import { isHttp } from '@/utils/validate';
const props = defineProps({
	openType:{ // 打开链接类型
		type: String,
		default: 'open',
		validator(value) {
			return ['webview', 'open'].includes(value);
		}
	},
	href: {
		// 链接地址
		type: String,
		default: '',
		validator(value) {
			return isHttp(value)
		}
	},
	text: {
		// 显示文字
		type:String,
		default: ''
	},
	fontSize: {
		// 链接文字大小，单位px
		type: String,
		default: '14px'
	},
	color: {
		// 链接文字颜色
		type: String,
		default: '#999999' 
	},
	showUnderLine: {
		// 是否显示下划线
		type: Boolean,
		default: false
	}
});
const emits = defineEmits(['click']);
const handleClick = ()=>{
	emits('click');
	if(!props.href) return
	if(props.openType === 'webview'){
		uni.navigateTo({ url:`/pages/common/webview/index?title=${props.text}&url=${props.href}` })
	}
	if(props.openType === 'open'){
		// #ifdef H5
		console.log(props.href);
		window.open(props.href)
		// #endif
		// #ifdef APP-PLUS
		plus.runtime.openURL(props.href);
		// #endif
	}
}
</script>

<style lang="scss" scoped>
.link {
	display: inline-block;
	font-size: v-bind('props.fontSize');
	color: v-bind('props.color');
}
.link-underline{
	text-decoration: underline;
}
</style>
