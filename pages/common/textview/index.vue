<template>
	<uni-card class="view-title font-500" :title="title">
		<text class="uni-body view-content">{{ content }}</text>
	</uni-card>
</template>

<script setup lang="ts">
const title = ref('');
const content = ref('');
onLoad((options) => {
	title.value = options.title;
	content.value = options.content;
	uni.setNavigationBarTitle({
		title: options.title
	});
});
</script>

<style scoped>
page {
	background-color: #ffffff;
}

.view-content {
	font-size: 26rpx;
	padding: 12px 5px 0;
	color: #333;
	line-height: 24px;
	font-weight: normal;
}
</style>
