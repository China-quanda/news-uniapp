<script setup lang="ts">
	const props = defineProps({
		icon: {
			type: String,
			default: 'icon-liebiao'
		},
		iconSize: {
			type: [String, Number],
			default: '60'
		},
		iconColor: {
			type: String,
			default: '#c0c4cc'
		},
		textSize: {
			type: [String, Number],
			default: '14'
		},
		textColor: {
			type: String,
			default: '#c0c4cc'
		},
		text: {
			type: String,
			default: '暂无数据'
		},
		marginTop: {
			type: String,
			default: '35vh'
		}
	});
</script>

<template>
	<view class="empty">
		<my-icon :icon="icon" :size="iconSize" :color="iconColor" />
		<text class="my-text">{{text}}</text>
	</view>
</template>
<style scoped lang="scss">
	.empty {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: v-bind('props.marginTop');
	}

	.my-text {
		margin-top: 10px;
		fontSize: v-bind('props.textSize');
		color: v-bind('props.textColor');
	}
</style>