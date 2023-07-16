<template>
  <view class='device-info'>
		<my-cell :isLink="false" title="登录设备" value="iPhone X" />
		<my-cell :isLink="false" title="最近活跃时间" value="2021-02-06 15:53" />
		<my-cell :isLink="false" title="登录地点" value="湖南省 郴州市" />
		<my-cell :isLink="false" title="登录方式" value="手机APP" />
		<my-cell :isLink="false" title="登录应用" value="今日头条" />
		<view class="btn-tuichu">
			<my-button type="danger" >退出登录</my-button>
		</view>
		
   </view>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
	.device-info{
		// background-color: #F8F8F8;
	}
	.btn-tuichu{
		margin: 20px 12px;
	}
</style>
