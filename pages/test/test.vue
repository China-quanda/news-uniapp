<template>
	<view class="content">
		<!-- 刮刮乐-中大奖 -->
		<!-- <view class="box"> -->
		<!-- <scraping-happy ref="scrapingHappy" /> -->
		<!-- </view> -->
		<!-- <button @tap="again">再来一次</button> -->
		<!-- <button @click="po">po</button> -->
		<button @click="fenxiang">分享</button>
		<!-- 打印组件 -->
		<!-- <printBtn ref="print"/> -->
		<button @click="bluetoothConnect">连接蓝牙</button>
		<button @click="printBtn">printBtn</button>
	</view>
</template>

<script setup lang="ts">
	import { useBluetoothStore } from '@/store/bluetooth'
	const useStore = useBluetoothStore()
// import printBtn from './components/print.vue';
// import { storeToRefs } from 'pinia'
// import { useSettingStore } from '@/store/setting'
// const useStore = useSettingStore()
// const { collapse } = storeToRefs(useStore)

import {onMounted,ref ,onBeforeUnmount,nextTick} from 'vue';
import { onLoad, onHide } from "@dcloudio/uni-app";
// import ScrapingHappy from './ScrapingHappy.vue';
console.log(useStore.test);
useStore.test = '2223111'
const fenxiang = ()=>{

}
const bluetoothConnect=()=>{
	uni.navigateTo({
		url:'/pages/index/bluetoothConnect'
	})
}
const printBtn =()=>{
	console.log(1);
	uni.navigateTo({
		url:'/pages/test/components/print'
	})
}
// let print = ref()

// onMounted(()=>{
// 	nextTick(()=>{
// 		console.log(print);
// 		print.value.print()
// 	})

// })

// const po =()=>{
// 	console.log(print);
// 	print.value.print()
// }

// let scrapingHappy = ref(null)
// const again =(e)=>{
// 	scrapingHappy.value.reset();
// }
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
