<template>
	<view :class="['skeleton-avatar',round ? 'round' : '']"></view>
</template>
<script lang="ts" setup>
const props = defineProps({
	round: {// 是否将头像显示为圆角风格
		type: Boolean,
		default: true
	},
	size:{ // 头像占位图大小
		type: String,
		default: '32px'
	}
});
</script>

<style lang="scss" scoped>
	.skeleton-avatar {
		width: v-bind('props.size');
		height: v-bind('props.size');
	}
</style>
