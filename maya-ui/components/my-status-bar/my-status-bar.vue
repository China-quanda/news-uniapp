<template>
	<view class="status-bar" :style="[style]"></view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	// 背景颜色
	bgColor: {
		type: String,
		default: uni.my.props.statusBar.bgColor
	}
});

let style = computed(() => {
	let style = {};
	style.height = `${uni.my.sys().statusBarHeight}px`;
	style.backgroundColor = props.bgColor;
	return style;
});
</script>
<style scoped lang="scss">
.status-bar {
	// nvue会默认100%，如果nvue下，显式写100%的话，会导致宽度不为100%而异常
	/* #ifndef APP-NVUE */
	width: 100%;
	/* #endif */
}
</style>
