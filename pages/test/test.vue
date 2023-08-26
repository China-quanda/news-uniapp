<template>
  <view class="content">
    <!-- 刮刮乐-中大奖 -->
    <view class="box">
      <!-- <scraping-happy ref="scrapingHappy" /> -->
    </view>
    <!-- <button @tap="again">再来一次</button> -->
		<button @click="po">po</button>
<!-- 打印组件 -->
		<printBtn ref="print"/>
  </view>
</template>



<script setup lang="ts">
	import printBtn from './components/print.vue';
	// import { storeToRefs } from 'pinia'
	// import { useSettingStore } from '@/store/setting'
	// const useStore = useSettingStore()
	// const { collapse } = storeToRefs(useStore)
	
	import {onMounted,ref ,onBeforeUnmount,nextTick} from 'vue';
	import { onLoad, onHide } from "@dcloudio/uni-app";
	// import ScrapingHappy from './ScrapingHappy.vue';
	
	let print = ref()
	
	onMounted(()=>{
		nextTick(()=>{
			console.log(print);
			print.value.print()
		})
		
	})
	
	const po =()=>{
		console.log(print);
		print.value.print()
	}
	
	let scrapingHappy = ref(null)
	const again =(e)=>{
		scrapingHappy.value.reset();
	}


	
</script>

<style lang="scss">
.content {
  box-sizing: border-box;
  padding: 24rpx;
}
.box {
  width: 100%;
  height: 200rpx;
  margin: 20rpx auto;
}
</style>
