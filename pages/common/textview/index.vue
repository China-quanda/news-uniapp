<template>
  <view>
    <uni-card class="view-title" :title="title">
      <text class="uni-body view-content">{{ content }}</text>
    </uni-card>
  </view>
</template>

<script setup lang="ts">
	import { ref,reactive } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	let title = ref('')
	let content = ref('')
	onLoad((options)=>{
		this.title = options.title
		this.content = options.content
		uni.setNavigationBarTitle({
		  title: options.title
		})
	})
</script>

<style scoped>
  page {
    background-color: #ffffff;
  }

  .view-title {
    font-weight: bold;
  }

  .view-content {
    font-size: 26rpx;
    padding: 12px 5px 0;
    color: #333;
    line-height: 24px;
    font-weight: normal;
  }
</style>
