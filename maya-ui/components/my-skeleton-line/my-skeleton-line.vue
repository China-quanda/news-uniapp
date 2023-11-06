<template>
	<view :class="['skeleton-line',round ? 'round' : '']"></view>
</template>
<script lang="ts" setup>
const props = defineProps({
	round: {// 是否将段落显示为圆角风格
		type: Boolean,
		default: false
	},
	width:{ // 段落占位图宽度
		type: String,
		default: '100%'
	},
	height:{ // 段落占位图高度
		type: String,
		default: '15px'
	}
});
</script>

<style lang="scss" scoped>
	.skeleton-line {
		width: v-bind('props.width');
		height: v-bind('props.height');
	}
</style>
