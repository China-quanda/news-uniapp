<template>
	<view class="grid-item" :style="gridItem"><slot></slot></view>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
const props = defineProps({
	backgroundColor: {
		type: String,
		default: '#fff'
	},
	radius: {
		type: [String, Number],
		default: 0
	},
	border: {
		type: Boolean,
		default: false
	}
});
let gridItem = reactive({
	'border-radius': '0px',
	border: '0px solid #ccc',
	'background-color': '#fff'
});
onMounted(() => {
	gridItem['background-color'] = props.backgroundColor;
	gridItem['border-radius'] = props.radius + 'px';
	if (props.border) {
		gridItem['border'] = '0.5px solid #ccc';
	}
});
</script>

<style lang="scss">
.grid-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5px;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
}
</style>
