<template>
	<view class="grid-item" :style="gridItem"><slot></slot></view>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
const props = defineProps({
	backgroundColor: {
		type: String,
		default: '#fff'
	},
	radius: {
		type: [String, Number],
		default: 0
	}
});
let gridItem = reactive({
	'border-radius': '0px',
	'background-color': '#fff'
});
watch(() => {
	gridItem['background-color'] = props.backgroundColor;
	gridItem['grid-gap'] = props.radius + 'px';
});
</script>

<style lang="scss">
.grid-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5px;
}
</style>
