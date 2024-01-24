<template>
	<view class="scraping-happy" id="container">
		<canvas canvas-id="scraping-happy" class="scraping__canvas" :disable-scroll="true" />
		<!-- <cover-view class="scraping__view" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">恭喜你，中了40万</cover-view> -->
	</view>
</template>

<script lang="ts" setup>
import {onMounted,ref ,onBeforeUnmount,computed, reactive} from 'vue';
import { onLoad, onHide } from "@dcloudio/uni-app";
let ctx = ref(null);
/** @name 容错值，解决部分机型涂层没有覆盖满，出现边框的情况，主要原因是由于像素尺寸不同导致的，应尽可能让width与height保持整数 **/
const TOLERANT = 3;
/**
 * @name 涂层配置默认值
 * @property { string } color 涂层颜色
 * @property { number } drawSize 清除涂层的画笔大小
 */
const MASK = reactive({
	color: '#DDDDDD',
	drawSize: 20
})

/** @name 水印配置默认值 **/
const WATERMARK = reactive({
	text: '刮一刮',
	fontSize: 14,
	color: '#C5C5C5'
})

/** @name 标题配置默认值 **/
const TITLE =reactive({
	text: '刮一刮',
	fontSize: 26,
	color: '#888888'
})

let mask = ''
let watermark = ''
let title = ''
let percentage = 50

let touchX = ref<number>(0)
let touchY = ref<number>(0)
// let width = ref<number>(0)
// let height = ref<number>(0)
let width = 0
let height = 0
// let maskSetting = computed(()=>{ ...MASK, ...(typeof mask === 'object' ? mask : { color: mask })})
// let watermarkSetting = computed(()=>{
// 	...WATERMARK,
// 	...(typeof watermark === 'object' ? watermark : { text: watermark }),
// })
// let titleSetting = computed(()=>{
// 	...TITLE,
// 	...(typeof title === 'object' ? title : { text: title }),
// })
onMounted(()=>{
	// 获取canvas画布实例
	ctx.value = uni.createCanvasContext('scraping-happy');
	init();
})


const init = ()=> {
  const query = uni.createSelectorQuery();
    query.select('#container').boundingClientRect(({ width, height }) => {
      width = Number(width);
      height = height;
      initCanvas();
    }).exec();
}

const initCanvas = ()=> {
// 清空矩形内容
ctx.value.clearRect(0, 0, width, height);
		  // 设置画笔颜色
		  ctx.value.setFillStyle('#db4f28');
		  // 绘制矩形
		  ctx.value.fillRect(0, 0, width + 3, height + 3);
			// 绘制水印
			drawWatermark();
			// 绘制提示文字
			drawTitle();
		  // 绘制到canvas身上
		  ctx.value.draw();
		}

const drawWatermark = ()=>{
	// if (!watermarkSetting.text) return;
	      // 保存当前的绘图上下文
	      ctx.value.save();
	      // 旋转
	      ctx.value.rotate((-10 * Math.PI) / 180);
	      // 水印具体绘制过程
	      const watermarkWidth = '刮一刮'.length * 14;
	      let x = 0;
	      let y = 0;
	      let i = 0;
	      while ((x <= width.value * 5 || y <= height.value * 5) && i < 300) {
	        ctx.value.setFillStyle(watermarkSetting.color);
	        ctx.value.setFontSize(14);
	        ctx.value.fillText('刮一刮', x, y);
	        x += watermarkWidth + watermarkWidth * 1.6;
	        if (x > width && y <= height) {
	          x = -Math.random() * 100;
	          y += 14 * 3;
	        }
	        i++;
	      }
	      ctx.value.restore();

}


   const drawTitle=()=> {
      // if (!titleSetting.text) return;
      ctx.value.setTextAlign('center');
      ctx.value.setTextBaseline('middle');
      ctx.value.setFillStyle('#888888');
      ctx.value.setFontSize(26);
      ctx.value.fillText('刮一刮', width / 2, height / 2);
    }


		    const touchstart=(e)=> {
		      touchX.value = e.touches[0].x;
		      touchY.value = e.touches[0].y;
		    }

		   const touchmove=(e)=> {
		      // 把画笔到画布中的指定点
		      ctx.value.moveTo(touchX.value, touchY.value);
		      // 清除涂层
		      ctx.value.clearRect(touchX.value, touchY.value, 20, 20);
		      ctx.value.draw(true);
		      // 记录移动点位
		      touchX.value = e.touches[0].x;
		      touchY.value = e.touches[0].y;
		    }

		   const touchend =() =>{

		    }
</script>

<style lang="scss">
.scraping-happy {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
.scraping__canvas {
	position: absolute;
	z-index: 10;
	width: 100%;
	height: 100%;
}
.scraping__view {
	position: absolute;
	z-index: 1;
	color: #f29100;
	font-size: 20px;
	font-weight: bold;
}
</style>
