<template>
	<view class="my-progress-circle">
		<canvas :canvas-id="'progress' + id" :style="{ width: sizeNum + 'px', height: sizeNum + 'px' }"/>
		<view class="centre" :style="centreStyle">
			<slot>{{progress}}%</slot>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref,onMounted,watch} from 'vue'
	import { onLoad } from "@dcloudio/uni-app";
	const props = defineProps({
		id: {
			type: String
		},
		progressColor: {
			//进度颜色
			type: String,
			default: '#409EFF'
		},
		bgColor: {
			//轨道颜色
			type: String,
			default: '#F9FAFB'
		},
		shape: {
			// round圆形，square方形
			type: String,
			default: 'round'
		},
		centreStyle:{
			// 内容样式
			type:Object,
			default:()=>{}
		},
		size: {
			//整体大小
			type: Number,
			default: 120
		},
		strokeWidth: {
			//轨道宽度
			type: Number,
			default: 10
		},
		progress: {
			//进度百分比
			type: Number,
			default: 0
		}
	})
	let sizeNum = ref(0)
	let strokeWidthNum = ref(0)
	onLoad(()=>{
		sizeNum.value = props.size
		strokeWidthNum.value = props.strokeWidth
	})
	const drawProgress =()=> {
			//尺寸与轨道宽度自适应处理
			const screenWidth = uni.getSystemInfoSync().screenWidth;
			sizeNum.value = (props.size / 750) * screenWidth;
			strokeWidthNum.value = (props.strokeWidth / 750) * screenWidth;

			const ctx = uni.createCanvasContext(`progress${props.id}`);
			const centerX = sizeNum.value / 2;
			const centerY = sizeNum.value / 2;
			const radius = (sizeNum.value - strokeWidthNum.value) / 2;
			const startAngle = -Math.PI / 2;
			const endAngle = startAngle + (props.progress / 100) * 2 * Math.PI;
			// 绘制背景圆
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			ctx.setFillStyle('#FFFFFF');
			ctx.fill();
			// 绘制轨道圆环
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			ctx.setLineWidth(strokeWidthNum.value);
			ctx.setStrokeStyle(props.bgColor);
			ctx.setLineCap('round');
			ctx.stroke();
			// 绘制进度圆环
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.setLineWidth(strokeWidthNum.value);
			let progressColor = props.progress > 0 ? props.progressColor : props.bgColor
			ctx.setStrokeStyle(progressColor);
			ctx.setLineCap(props.shape);
			ctx.stroke();
			ctx.draw(true);
		}
		onMounted(()=>{
			drawProgress()
		})
		watch(
		  () => props.progress,
		  (val) => {
				console.log(val);
		    drawProgress()
		  }
		);
</script>
<style lang="scss">
.my-progress-circle {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	.centre {
		position: absolute;
		font-weight: 500;
		font-size: 14px;
	}
}
</style>
