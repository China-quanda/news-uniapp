<template>
	<view class='download'>
		<!-- <u-empty mode="data"  text="暂无下载内容"/> -->
		<text class="iconfont icon-xiazai"></text>
		<text class="text">暂无下载内容</text>
	</view>
</template>

<script setup lang="ts">

</script>
<style lang="scss" scoped>
.download {

	@apply flex flex-col flex-items-center gap-y-20px translate-y-25vh;
	// transform: translateY(25vh);

	.iconfont {
		@apply text-40px;
	}

	.text {
		@apply text-14px;
	}
}
</style>
