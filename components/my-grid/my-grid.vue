<template>
	<view class="grid" :style="grid"><slot></slot></view>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
const props = defineProps({
	backgroundColor: {
		type: String,
		default: '#f8f8f8'
	},
	gap: {
		type: [String, Number],
		default: '5'
	},
	columns: {
		type: [String, Number],
		default: 4
	},
	rows: {
		type: [String, Number],
		default: ''
	},
	width: {
		type: String,
		default: '1fr'
	},
	height: {
		type: String,
		default: ''
	}
});
let grid = reactive({
	'grid-template-columns': 'repeat(4,1fr)',
	'grid-gap': '5px',
	'grid-template-rows': 'repeat(1fr)',
	'background-color': '#f8f8f8'
});
onMounted(() => {
	grid['background-color'] = props.backgroundColor;
	grid['grid-gap'] = props.gap + 'px';
	grid['grid-template-columns'] = `repeat(${props.columns},${props.width})`;
	grid['grid-template-rows'] = `repeat(${props.rows},${props.height})`;
});
</script>

<style lang="scss">
.grid {
	display: grid;
	padding: 12px;
	text-align: center;
	box-sizing: border-box;
}
</style>
