<template>

	<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="210" @scroll="getleft" >
	      <view class="scroll-view-item_H" v-for="item in columnData" :key="item.id">
	            <view class="gold_item">
								<view class="" style="height: 30px;width: 30px;background-color: #ccc;">
									12
								</view>
	                <!-- <img :src="item.coverImg" alt="" /> -->
	            </view>
	      </view>
	 </scroll-view>
	 
	<view v-if="slideShow" class="slide">
	      <view class="slide-bar">
	           <view class="slide-show" :style="slideStyle"></view>
	      </view>
	</view>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
	let slideWidth = ref(0)
	let totalLength = ref(0)
	let slideLeft = ref(0)
	let slideShow = ref(false)
	let slideRatio = ref('')
	let slideStyle = ref({})
	let columnData =reactive([
		{coverImg:'12'},
		{coverImg:'12'},
		{coverImg:'12'},
		{coverImg:'12'},
		{coverImg:'12'}
	])
	
	let menus = ref([
		{pic:'',name:'aaa'},
		{pic:'',name:'aaa'},
		{pic:'',name:'aaa'},
	])
	
	const getRatio =() =>{
	  let systemInfo = uni.getSystemInfoSync();
	  windowWidth.value = systemInfo.windowWidth;
	  //数量少不需要滚动条
	  if (columnData.length <= 3) {
	    slideShow.value = false;
	  } else {
	    //分类列表总长度； 每个滑块宽度：240
	    let _totalLength = columnData.length * 240; 
	    //滚动列表长度与滑条 长度比例
	    let _ratio = (240 / _totalLength) * (750 / windowWidth.value); 
	    //当前显示红色滑条的长度
	    let _showLength = (750 / _totalLength) * 240; 
	    slideWidth.value = _showLength;
	    totalLength.value = _totalLength;
	    slideShow.value = true;
	    slideRatio.value = _ratio;
	  }
	  slideStyle.value = {
	    width: slideWidth.value + "rpx",
	    "margin-left": slideLeft.value <= 1 ? 0 : slideLeft.value + "rpx",
	  };
	}

	const getleft =(e)=> {
		slideLeft.value = e.detail.scrollLeft * slideRatio.value;
		slideStyle.value = {
		  width: slideWidth.value + "rpx",
		  "margin-left": slideLeft.value <= 1 ? 0 : slideLeft.value + "rpx",
		};
	}
	
const props = defineProps({
	stickyTop: {// 吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px	H5:44，其他:0
		type:String,
		default: '0px',
	},
	stickyBottom: {// 吸底时与底部的距离，支持 px vw vh rem 单位，默认 px
		type:String,
		default: '0px',
	},
	bgColor: {// 组件背景颜色
		type: String,
		default: 'transparent' 
	},
	disabled: {// 是否禁用吸顶功能
		type:Boolean,
		default:false
	},
	zIndex: {// 设置组件的 z-index 层级
		type:Number,
		default: 100
	},
	position:{//吸附位置，可选值为 bottom top
		type: String,
		default: 'top' 
	},
});
</script>

<style lang="scss" scoped>
	.scroll-view_H {
	  white-space: nowrap;
	  width: 100%;
	}
	.scroll-view-item_H {
	  display: inline-block;
	  width: 210rpx;
	  height: 200rpx;
	  margin-right: 30rpx;
	  line-height: 200rpx;
	  text-align: center;
	}
	.gold_item {
	  width: 210rpx;
	  height: 200rpx;
	  text-align: center;
	  display: flex;
	  line-height: 200rpx;
	  img {
	    width: 210rpx;
	    height: 200rpx;
	    border-radius: 20rpx;
	  }
	}
	.slide {
	  height: 30rpx;
	  background: #fff;
	  width: 100%;
	  padding: 14rpx 0 5rpx 0;
	  .slide-bar {
	    width: 240rpx;
	    margin: 0 auto;
	    height: 1.5px;
	    background: #eee;
	    .slide-show {
	       height: 100%;
	       background-color: #126bfa;
	    } 
	  }
	}
</style>
