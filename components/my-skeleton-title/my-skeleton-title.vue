<template>
	<view :class="['skeleton-title',round ? 'round' : '']"></view>
</template>
<script lang="ts" setup>
const props = defineProps({
	round: {// 是否将标题显示为圆角风格
		type: Boolean,
		default: false
	},
	width:{ // 标题占位图宽度
		type: String,
		default: '40%'
	},
	height:{ // 标题占位图高度
		type: String,
		default: '15px'
	}
});
</script>

<style lang="scss" scoped>
	.skeleton-title {
		width: v-bind('props.width');
		height: v-bind('props.height');
	}
</style>
