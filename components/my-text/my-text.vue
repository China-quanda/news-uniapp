<template>
	<view v-if="show" @tap="tapClick" :class="['my-text', suffixIcon ? 'my-text-suffixIcon' : '']">
		<my-icon v-if="prefixIcon || suffixIcon" :icon="prefixIcon || suffixIcon"></my-icon>
		<text :class="['my-text-all', textType, bold ? 'my-text-bold' : '']" :style="{ color: color, fontSize: `${size}px`, lineHeight: `${lineHeight}px`, textAlign: align }">
			<slot>{{ myText }}</slot>
		</text>
	</view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import router from '@/utils/router';
import { isHttp } from '@/utils/validate';
import { desensitization } from '@/utils/sensitive';
const props = defineProps({
	type: {
		// 主题颜色 ：primary、success、info、warning、error 默认为 default
		type: String,
		default: 'default'
	},
	show: {
		// 是否显示
		type: Boolean,
		default: true
	},
	text: {
		// 显示的值
		type: [String, Number],
		default: ''
	},
	color: {
		// 自定义颜色 通过color值设置按钮渐变颜色
		type: String,
		default: ''
	},
	mode: {
		// 文本处理的匹配模式text-普通文本，price-价格，phone-手机号，emall-邮箱，idCard-身份证，bankCard-银行卡，name-姓名，date-日期，link-超链接
		type: String,
		default: 'text'
	},
	desensitization: {
		// 信息脱敏
		type: Boolean,
		default: false
	},
	align: {
		// 文本对齐方式 center right 默认 left
		type: String,
		default: 'left'
	},
	lineHeight: {
		// 文本行高
		type: [String, Number],
		default: ''
	},
	bold: {
		// 是否粗体，默认false
		type: Boolean,
		default: false
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
	},
	prefixIcon: {
		// 前置图标
		type: String,
		default: ''
	},
	suffixIcon: {
		// 后置图标
		type: String,
		default: ''
	},
	size: {
		// 字体大小
		type: [String, Number],
		default: 14
	},
	lines: {
		// 文本显示的行数，如果设置，超出此行数，将会显示省略号
		type: String,
		default: ''
	}
});
const myText = ref(props.text);
const textType = computed(() => `my-text-type-${props.type}`);
const emits = defineEmits(['click']);
const tapClick = e => {
	emits('click', e);
	if (!props.desensitization && props.mode === 'phone') {
		console.log(11);
		uni.makePhoneCall({
			phoneNumber: textType.value
		});
	}
	if (!props.url || props.mode !== 'link') return;
	if (isHttp(props.url)) {
		router.push(`/pages/common/webview/index?title=${props.text}&url=${props.url}`);
	} else {
		if (props.linkType === 'push') return router.push(props.url);
		if (props.linkType === 'tab') return router.tab(props.url);
		if (props.linkType === 'redirect') return router.redirect(props.url);
		if (props.linkType === 'reLaunch') return router.reLaunch(props.url);
	}
};
const isMode = () => {
	if (props.mode === 'price') return (myText.value = `￥${myText.value}`);
	if (props.desensitization) {
		if (props.mode === 'phone') return (myText.value = desensitization(props.mode, myText.value));
		if (props.mode === 'emall') return (myText.value = desensitization(props.mode, myText.value));
		if (props.mode === 'idCard') return (myText.value = desensitization(props.mode, myText.value));
		if (props.mode === 'bankCard') return (myText.value = desensitization(props.mode, myText.value));
		if (props.mode === 'name') return (myText.value = desensitization(props.mode, myText.value));
	}
};
onMounted(() => {
	isMode();
});
watch(
	() => props.mode,
	val => {
		isMode();
	}
);
</script>

<style lang="scss" scoped>
.my-text {
	display: flex;
	align-items: center;
}
.my-text-suffixIcon {
	flex-direction: row-reverse;
}
// 主题颜色 ：primary、success、info、warning、error 默认为 default
.my-text-all {
	// cursor: pointer;
	display: inline-block;
	box-sizing: border-box;
	overflow: hidden; //溢出内容隐藏
	text-overflow: ellipsis; //文本溢出部分用省略号表示
	display: -webkit-box; //特别显示模式
	-webkit-line-clamp: v-bind('props.lines'); //行数
	-webkit-box-orient: vertical; //盒子中内容竖直排列
	&:active {
		opacity: 0.6;
		transform: all 0.5s;
	}
	// display: flex;
	// align-items: center;
	// justify-content: center;
}
.my-text-type-default {
	color: #141414;
}
.my-text-type-primary {
	color: #3c9cff;
}
.my-text-type-success {
	color: #5ac725;
}
.my-text-type-info {
	color: #e2e2e2;
}
.my-text-type-warning {
	color: #f9ae3d;
}
.my-text-type-danger {
	color: #f56c6c;
}
.my-text-bold {
	font-weight: 500;
}
</style>
