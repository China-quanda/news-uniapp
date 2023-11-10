<template>
	<view class="my-signature">
		<canvas class="mycanvas" canvas-id="mycanvas" disable-scroll @touchstart="touchstart" @touchmove.stop="touchmove" @touchend="touchend"></canvas>
		<view class="operate">
			<my-button shape="circle" @click="clear" :text="clearText" size="normal" />
			<view class="gap" />
			<my-button type="primary" shape="circle" @click="confirm" :text="confirmText" />
		</view>
	</view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
	(e: 'start'): void; // 开始签名时触发
	(e: 'end', event: TouchEvent): any; //结束签名时触发
	(e: 'signing'): void; // 签名过程中触发
	(e: 'confirm', data:object): object; // vant data: { image: string; canvas: HTMLCanvasElement }
	(e: 'clear'): void; // 点击清除按钮时触发
}>();

const props = defineProps({
	// 笔画粗细
	lineWidth: {
		type: [String, Number],
		default: uni.my.props.signature.lineWidth
	},
	// 笔触颜色，默认黑色
	lineColor: {
		type: String,
		default: uni.my.props.signature.lineColor
	},
	// 导出图片类型
	type: {
		type: String,
		default: uni.my.props.signature.type
	},
	// 背景颜色
	bgColor: {
		type: String,
		default: uni.my.props.signature.bgColor
	},
	// 清除按钮文字
	clearText: {
		type: String,
		default: uni.my.props.signature.clearText
	},
	// 确认按钮文字
	confirmText: {
		type: String,
		default: uni.my.props.signature.confirmText
	},
	// 宽度
	width: {
		type: [String, Number],
		default: uni.my.props.signature.width
	},
	// 高度
	height: {
		type: [String, Number],
		default:uni.my.props.signature.height
	}
});

const addUnit = uni.my.addUnit;

let addFlag = ref(true);
let signatureFlag = ref(false);
let ctx = ref(''); //绘图图像
let points = ref<Array>([]); //路径点集合

onMounted(() => {
	init();
});

// 初始化
const init = () => {
	//创建绘图对象
	ctx.value = uni.createCanvasContext('mycanvas');
	//设置画笔样式
	ctx.value.setStrokeStyle(props.lineColor);
	ctx.value.setLineCap('round');
	ctx.value.setLineWidth(props.lineWidth);
};

//触摸开始，获取到起点
const touchstart = e => {
	let startX = e.changedTouches[0].x;
	let startY = e.changedTouches[0].y;
	let startPoint = { X: startX, Y: startY };
	// 由于uni对canvas的实现有所不同，这里需要把起点存起来
	points.value.push(startPoint);
	console.log(e);
	//每次触摸开始，开启新的路径
	ctx.value.beginPath();
	emit('start');
};

//触摸移动，获取到路径点
const touchmove = e => {
	let moveX = e.changedTouches[0].x;
	let moveY = e.changedTouches[0].y;
	let movePoint = { X: moveX, Y: moveY };
	points.value.push(movePoint); //存点
	let len = points.value.length;
	if (len >= 2) {
		draw(); //绘制路径
	}
};

// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
const touchend = (e) => {
	points.value = [];
	signatureFlag.value = true;
	emit('end',e);
};

/* ***********************************************
	#   绘制笔迹
	#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
	#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
	#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
	************************************************ */
const draw = () => {
	let point1 = points.value[0];
	let point2 = points.value[1];
	points.value.shift();
	ctx.value.moveTo(point1.X, point1.Y);
	ctx.value.lineTo(point2.X, point2.Y);
	ctx.value.stroke();
	ctx.value.draw(true);
	emit('signing');
};

//清空画布
const clear = () => {
	const res = uni.my.sys();
	let canvasw = res.windowWidth;
	let canvash = res.windowHeight;
	ctx.value.clearRect(0, 0, canvasw, canvash);
	ctx.value.draw(true);
	signatureFlag.value = false;
	emit('clear');
};

//完成绘画并保存到本地
const finish = () => {
	uni.canvasToTempFilePath({
		canvasId: 'mycanvas',
		success: res => {
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath
			});
		}
	});
};

// 确认
const confirm = () => {
	if (!signatureFlag.value) return uni.my.msg('请完成签名！');
	if (!addFlag.value) return;
	addFlag.value = false;
	uni.canvasToTempFilePath({
		canvasId: 'mycanvas',
		fileType: props.type,
		success(res) {
			// 在H5平台下，res.tempFilePath 为 base64
			// #ifdef APP-PLUS
			const savedFilePath = res.tempFilePath; //相对路径
			const path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
			const fileReader = new plus.io.FileReader();
			fileReader.readAsDataURL(path);
			fileReader.onloadend = res => {
				//读取文件成功完成的回调函数
				// console.log(res.target.result); //输出base64内容
			};
			// #endif
			emit('confirm', {image:res.tempFilePath});
			return {image:res.tempFilePath}
		}
	});
	setTimeout(() => {
		addFlag.value = true;
	}, 3000);
};

defineExpose({
	init,
	confirm,
	finish,
	clear
});
</script>

<style scoped lang="scss">
.my-signature {
	padding: 8px;
}
.mycanvas {
	width: v-bind('addUnit(props.width)');
	height: v-bind('addUnit(props.height)');
	background-color: v-bind('props.bgColor');
	border: 0.5px solid #ececec;
	border-radius: 8px;
	box-sizing: border-box;
}
.operate {
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
	.gap {
		width: 10px;
	}
}
</style>
