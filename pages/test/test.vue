<template>
	<view class="content">
		<!-- 刮刮乐-中大奖 -->
		<!-- <view class="box"> -->
		<!-- <scraping-happy ref="scrapingHappy" /> -->
		<!-- </view> -->
		<!-- <button @tap="again">再来一次</button> -->
		<!-- <button @click="po">po</button> -->
		<!-- <button @click="fenxiang">分享</button> -->
		<!-- 打印组件 -->
		<!-- <printBtn ref="print"/> -->
		<!-- <button @click="bluetoothConnect">连接蓝牙</button> -->
		<!-- <button @click="printBtn">printBtn</button> -->

		<!-- <view class="" @click="fenxiang">
			1234
		</view>
		<br> -->
		<!-- <my-example>11</my-example> -->
		<!-- <test></test> -->
	</view>
</template>

<script setup lang="ts">
	import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
	import { onPageScroll } from '@dcloudio/uni-app'
	let scrollTop = ref(0)
	onPageScroll(e => {
		scrollTop.value = e.scrollTop
	  // console.log(e);
	}) 
	// import test from '@/components/my-grid/test.vue';
	// import test from '@/components/my-link/test.vue';
	// import test from '@/components/my-cell/test.vue';
	// import test from '@/components/my-icon/test.vue';
	// import test from '@/components/my-step/test.vue';
	// import test from '@/components/my-back-top/test.vue';
	// import test from '@/components/my-footer/test.vue';
	// import test from '@/components/my-tabbar/test.vue';
	// import test from '@/components/my-index-bar/test.vue';
	// import test from '@/components/my-list/test.vue';
	// import test from '@/components/my-waterfall/test.vue';
	// import test from '@/components/my-segmented/test.vue';
	// import test from '@/components/my-divider/test.vue';
	// import test from '@/components/my-sticky/test.vue';
	// import test from '@/components/my-skeleton/test.vue';
	// import test from '@/components/my-overlay/test.vue';
	// import test from '@/components/my-dialog/test.vue';
	// import test from '@/maya-ui/components/my-signature/test.vue';
	
	// import test from '@/components/my-scrollList/test.vue';
	// import test from '@/maya-ui/components/my-collapse/test.vue';
	// import test from '@/maya-ui/components/my-notify/test.vue';
import { useBluetoothStore } from '@/store/bluetooth';
const useStore = useBluetoothStore();
// import printBtn from './components/print.vue';
// import { storeToRefs } from 'pinia'
// import { useSettingStore } from '@/store/setting'
// const useStore = useSettingStore()
// const { collapse } = storeToRefs(useStore)


import { onLoad, onHide,onBackPress } from '@dcloudio/uni-app';
onBackPress(e=>{
	console.log('e',onBackPress);
})
// import ScrapingHappy from './ScrapingHappy.vue';
// console.log(useStore.test);
useStore.test = '2223111';
const fenxiang = () => {
	console.log(1);
};

const bluetoothConnect = () => {
	uni.navigateTo({
		url: '/pages/index/bluetoothConnect'
	});
};
const printBtn = () => {
	console.log(1);
	uni.navigateTo({
		url: '/pages/test/components/print'
	});
};
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
page {
	// background-color: #1890ff;
}
// .content {
// 	box-sizing: border-box;
// 	padding: 24rpx;
// }
// .box {
// 	width: 100%;
// 	height: 200rpx;
// 	margin: 20rpx auto;
// }
</style>
