<template>
	<view class="grid" :style="grid">
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';

interface PorpsType {
	bgColor: string // 背景颜色
	gap: string // 间距
	columns: string|number // 每列显示个数
	rows: string|number //
	width: string // 
	height: string // 
	border:boolean // 是否显示宫格的边框
	direction:string // 内容横排
	reverse:boolean // 是否调换图标和文本的位置
	clickable:boolean // 是否开启格子点击反馈
}
const props = withDefaults(defineProps<PorpsType>(), {
	bgColor: '#fff',
	gap: '5px',
	columns: 4,
	rows:'',
	width:'1fr',
	height:'',
	border:true,
	direction:'column'||'row',
	reverse:false,
	clickable:false,
});
const showBorder = computed(()=>{
	return props.border ? '0.5px solid #ccc' : 'none'
})
const isReverse = computed(()=>{
	return props.reverse ? `${props.direction}-reverse` : props.direction
})
const isClickable = computed(()=>{
	return props.clickable ? '#ccc' : '#fff'
})
let grid = reactive({
	'grid-template-columns': 'repeat(4,1fr)',
	'grid-template-rows': 'repeat(1fr)',
});
watchEffect(()=>{
	grid['grid-template-columns'] = `repeat(${props.columns},${props.width})`;
	grid['grid-template-rows'] = `repeat(${props.rows},${props.height})`;
})
</script>

<style lang="scss">
.grid {
	display: grid;
	grid-gap:v-bind('props.gap');
	padding: 5px;
	text-align: center;
	background-color: v-bind('props.bgColor');
	box-sizing: border-box;
	:deep(.grid-item){
		display: flex;
		flex-direction: v-bind(isReverse);
		border: v-bind(showBorder);
		&:active {
			background-color: v-bind(isClickable) !important;
			transform: background-color 0.9s;
		}
	}
}
</style>
