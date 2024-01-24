<template>
	<view class="grid-item" @tap="handleTap">
		<slot>
			<my-badge 
			v-if="badgeValue || badgeDot" 
			:customStyle="badgeStyle" 
			:value="badgeValue" 
			:max="badgeMax" 
			:isDot="badgeDot" />
			<slot name="icon">
				<my-icon class="grid-item-icon" :icon="icon" :color="iconColor" :size="iconSize" />
			</slot>
			<slot name="text">
				<text class="grid-item-text">{{ text }}</text>
			</slot>
		</slot>
	</view>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { isHttp } from '@/utils/validate';
import router from '@/utils/router';
let badgeStyle = reactive({
	fontSize: '12px',
	transform: '',
	// top:'-8px',
	// right:'-8px',
	zIndex: '999'
});
interface PorpsType {
	bgColor?: string; // 背景
	radius?: string; // 圆角
	text?: string; // 文字
	icon?: string; //图标
	iconColor?: string; // 图标颜色
	iconSize?: string; // 图标大小
	url?: string; // 点击后跳转的URL地址
	linkType?: string; // 链接跳转的方式
	badgeValue?: number | string; // 徽标显示值
	badgeMax?: number; // 最大值，超过最大值会显示 '{max}+'
	badgeDot?: boolean; // 不展示数字，只有一个小点
}
const props = withDefaults(defineProps<PorpsType>(), {
	bgColor: '#fff',
	radius: '0px',
	url: '',
	linkType: 'push' || 'tab' || 'redirect' || 'reLaunch'
});
interface EmitsType {
	(e: 'click'): void;
}
const emit = defineEmits<EmitsType>();

const handleTap = () => {
	emit('click');
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
</script>

<style lang="scss">
.grid-item {
	align-items: center;
	// justify-content: center;
	padding: 5px;
	position: relative;
	box-sizing: border-box;
	font-size: 14px;
	// overflow: hidden;
	border-radius: v-bind('props.radius');
	background-color: v-bind('props.bgColor');
}
</style>
