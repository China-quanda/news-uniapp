<template>
	<view class="my-progress-circle">
		<canvas :canvas-id="'progress' + id" :style="{ width: sizeNum + 'px', height: sizeNum + 'px' }"/>
		<view class="centre" :style="centreStyle">
			<slot>{{progress}}%</slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
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
	},
	data() {
		return {
			sizeNum: this.size, //最终的整体尺寸
			strokeWidthNum: this.strokeWidth //最终的轨道宽度数值
		};
	},
	mounted() {
		this.drawProgress();
	},
	methods: {
		drawProgress() {
			//尺寸与轨道宽度自适应处理
			const screenWidth = uni.getSystemInfoSync().screenWidth;
			this.sizeNum = (this.size / 750) * screenWidth;
			this.strokeWidthNum = (this.strokeWidth / 750) * screenWidth;

			const ctx = uni.createCanvasContext(`progress${this.id}`, this);
			const centerX = this.sizeNum / 2;
			const centerY = this.sizeNum / 2;
			const radius = (this.sizeNum - this.strokeWidthNum) / 2;
			const startAngle = -Math.PI / 2;
			const endAngle = startAngle + (this.progress / 100) * 2 * Math.PI;
			// 绘制背景圆
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			ctx.setFillStyle('#FFFFFF');
			ctx.fill();
			// 绘制轨道圆环
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			ctx.setLineWidth(this.strokeWidthNum);
			ctx.setStrokeStyle(this.bgColor);
			ctx.setLineCap('round');
			ctx.stroke();
			// 绘制进度圆环
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.setLineWidth(this.strokeWidthNum);
			let progressColor = this.progress > 0 ? this.progressColor : this.bgColor
			ctx.setStrokeStyle(progressColor);
			ctx.setLineCap(this.shape);
			ctx.stroke();
			ctx.draw(true);
		}
	},
	watch: {
		progress() {
			this.drawProgress();
		}
	}
};
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
