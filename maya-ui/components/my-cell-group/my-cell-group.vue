<template>
	<view :class="['cell-group']">
		<view class="cell-group-title">
			<slot name="title">{{ title }}</slot>
		</view>
		<view :class="[border ? 'border' : '',inset ? 'inset' : '']"><slot></slot></view>
	</view>
</template>

<script setup lang="ts">
import { reactive, onUpdated } from 'vue';
interface PorpsType {
	title: string; // 分组标题
	inset: boolean; // 是否展示为圆角卡片风格
	border: boolean; // 是否显示外边框
}
const props = withDefaults(defineProps<PorpsType>(), {
	title: '',
	inset: false,
	border: true
});
</script>

<style lang="scss" scoped>
.cell-group {
	// background-color: pink;
	.cell-group-title {
		padding: 15px;
		color: #969799;
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
	}
}
.border {
	// border: 0.5px solid #ebedf0;
	border-top:  1px solid #ebedf0;
	border-left:  1px solid #ebedf0;
	border-right:  1px solid #ebedf0;
}
.inset {
	margin: 0px 15px 15px 15px;
	border-radius: 8px;
	overflow: hidden;
}
</style>
