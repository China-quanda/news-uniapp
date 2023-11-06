<template>
	<view class="skeleton-image">
		<i class="iconfont icon-24gl-pictures"></i>
	</view>
</template>
<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
	width:{ // 图片占位图宽度
		type: String,
		default: '45px'
	},
	height:{ // 图片占位图高度
		type: String,
		default: '45px'
	}
});
const iconSize = computed(()=>{
	let width = props.width.substr(0,props.width.length-2)
	let size = Number(width) / 2.3
	return `${size}px`
})
console.log(iconSize);
</script>

<style lang="scss" scoped>
	.skeleton-image {
		width: v-bind('props.width');
		height: v-bind('props.height');
		.iconfont{
			font-size: v-bind(iconSize);
			color: #dadada;
		}
	}
</style>
