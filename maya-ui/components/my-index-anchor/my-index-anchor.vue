<template>
	<view class="index-anchor" :id="`anchor-${index}-qd`">
		<view class="index-anchor-text" :class="isSticky"><slot>{{ index }}</slot></view>
	</view>
</template>
<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
const indexBarData = inject('indexBar');
const props = defineProps({
	index: {
		// 索引字符
		type: [String, Number],
		required: true
	},
	bgColor: {
		// 列表锚点背景颜色
		type: String,
		default: '#f7f7f7'
	},
	height: {
		// 列表锚点高度，单位默认px
		type: String,
		default: '30px'
	}
});

let active = ref('');
let indexBar = {};
let systemInfo = {};

uni.$on('active', e => {
	active.value = e.active;
	indexBar = e.indexBar;
	systemInfo = e.systemInfo;
});

const isSticky = computed(() => {
	if (!indexBarData.sticky || `anchor-${props.index}-qd` !== active.value.id) return '';
	return indexBar.height - active.value.top >= systemInfo.screenHeight ? 'index-anchor-sticky index-anchor-active' : 'index-anchor-active';
});
</script>

<style lang="scss" scoped>
.index-anchor {
	// padding:0px 10px;
	// padding-left: 10px;
	
	// height: v-bind('props.height');
}
.index-anchor-text {
	// padding: 5px 10px;
	display: flex;
	align-items: center;
	padding-left: 10px;
	height: v-bind('props.height');
	font-size: 14px;
	font-weight: 600;
	box-sizing: border-box;
	color: #323233;
	background-color: v-bind('props.bgColor');
}
.index-anchor-active {
	color: v-bind('indexBarData.activeColor');
}
.index-anchor-sticky {
	position: fixed;
	top: v-bind('indexBarData.stickyOffsetTop');
	right: 0;
	left: 0;
	background-color: v-bind('props.bgColor');
}
</style>
