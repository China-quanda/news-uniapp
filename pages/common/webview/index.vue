<template>
  <view v-if="params.url">
    <web-view :webview-styles="webviewStyles" :src="`${params.url}`"></web-view>
  </view>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	let params = reactive({})
	let webviewStyles = reactive({
		progress: {
		  color: "#FF3333"
		}
	})
	onLoad((event)=>{
		params = event
		console.log(event);
		if (event.title) {
		  uni.setNavigationBarTitle({
		    title: event.title
		  })
		}
	})

</script>
