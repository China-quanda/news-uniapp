<template>
	<view class="gap"></view>
</template>
<script lang="ts" setup>
const props = defineProps({
	height: {
		// 间隔槽高度，单位px
		type: [String, Number],
		default: '20px'
	},
	marginTop: {
		// 与前一个元素的距离，单位px
		type: [String, Number],
		default: 0
	},
	marginBottom: {
		// 与后一个元素的距离，单位px
		type: [String, Number],
		default: 0
	},
	bgColor: {
		// 背景颜色 transparent(背景透明)
		type: String,
		default: 'transparent' 
	}
});
</script>

<style lang="scss" scoped>
.gap {
	height: v-bind('props.height');
	margin-top: v-bind('props.marginTop');
	margin-bottom: v-bind('props.marginBottom');
	background-color: v-bind('props.bgColor');
}
</style>
