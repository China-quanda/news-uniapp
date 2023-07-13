<template>
	<!-- app不支持 h5正常-->
  <div class="percentloop" ref="percentloop">
    <div class="circle-left">
      <div ref="leftcontent"></div>
    </div>
    <div class="circle-right">
      <div ref="rightcontent"></div>
    </div>
    <div class="internal">
      <slot></slot>
    </div>
  </div>
</template>
 
<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watch } from "vue";
// defineOptions({ name: "TaskCircle" });
const props = defineProps({
  /**
   * 说明：进度百分比
   * 可选值：0-100
   */
  percentNum: {
    type: [String, Number],
    required: false,
    default: 0,
  },
  /**
   * 说明：动画加载速度
   * 可选值：推荐2-5
   */
  speed: {
    type: [String, Number],
    required: false,
    default: 4,
  },
  /**
   * 说明：圆环进度条大小(单位：px)
   */
  size: {
    type: [String, Number],
    required: false,
    default: 260,
  },
});
 
const data = reactive({
  percent: 0,
  initDeg: 0,
  timeId: null,
  animationing: false,
});
 
// 获取dom元素
const percentloop = ref(null);
const leftcontent = ref(null);
const rightcontent = ref(null);
 
const methods = reactive({
  transformToDeg(percent) {
    let deg = 0;
    if (percent >= 100) {
      deg = 360;
    } else {
      deg = parseInt((360 * percent) / 100);
    }
    return deg;
  },
  transformToPercent(deg) {
    let percent = 0;
    if (deg >= 360) {
      percent = 100;
    } else {
      percent = parseInt((100 * deg) / 360);
    }
    return percent;
  },
  rotateLeft(deg) {
    // 大于180时，执行的动画
    if (leftcontent.value?.style)
      leftcontent.value.style.transform = "rotate(" + (deg - 180) + "deg)";
  },
  rotateRight(deg) {
    // 小于180时，执行的动画
    if (rightcontent.value?.style)
      rightcontent.value.style.transform = "rotate(" + deg + "deg)";
  },
  goRotate(deg) {
    data.animationing = true;
    data.timeId = setInterval(() => {
      if (deg > data.initDeg) {
        // 递增动画
        data.initDeg += Number(props.speed);
        if (data.initDeg >= 180) {
          methods.rotateLeft(data.initDeg);
          methods.rotateRight(180); // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
        } else {
          methods.rotateRight(data.initDeg);
        }
      } else {
        // 递减动画
        data.initDeg -= Number(props.speed);
        if (data.initDeg >= 180) {
          methods.rotateLeft(data.initDeg);
        } else {
          methods.rotateLeft(180); // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
          methods.rotateRight(data.initDeg);
        }
      }
      data.percent = methods.transformToPercent(data.initDeg); // 百分比数据滚动动画
      const remainer = Number(deg) - data.initDeg;
      if (Math.abs(remainer) < props.speed) {
        data.initDeg += remainer;
        if (data.initDeg > 180) {
          methods.rotateLeft(deg);
        } else {
          methods.rotateRight(deg);
        }
        methods.animationFinished();
      }
    }, 10);
  },
  animationFinished() {
    data.percent = props.percentNum; // 百分比数据滚动动画
    data.animationing = false;
    clearInterval(data.timeId);
  },
});
 
onMounted(() => {
  methods.goRotate(methods.transformToDeg(props.percentNum));
  // percentloop.value.style.height = props.size + "px";
  // percentloop.value.style.width = props.size + "px";
	// leftcontent.value.style.backgroundColor = '#0095d4'
	// rightcontent.value.style.backgroundColor = '#0095d4'
	
});
watch(
  () => props.percentNum,
  (val) => {
    if (data.animationing) return;
    methods.goRotate(methods.transformToDeg(val));
  }
);
</script>
 
<style scoped lang="scss">
.percentloop {
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  overflow: hidden;
  .circle-left,
  .circle-right {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    // 设置进度条颜色
    // background: linear-gradient(180deg, #00f9ff, #0095d4);
		background-color: #0095d4 !important;
    overflow: hidden;
    & > div {
      width: 100%;
      height: 100%;
      background: #04173a;
			// background-color: #ccc;
      opacity: 0.9;
      transform-origin: right center;
    }
  }
  .circle-right {
    left: 50%;
    & > div {
      transform-origin: left center;
    }
  }
  .internal {
    position: absolute;
    // 设置进度条宽度
    top: 3%;
    bottom: 3%;
    left: 3%;
    right: 3%;
    background-color: #010d23;
    // background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>