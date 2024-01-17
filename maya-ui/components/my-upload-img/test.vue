<template>
	<view class="test">
		<myUploadImg required label="图片"  :count="5" :imgs="imgs" @getImgs="getImgs"></myUploadImg>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import myUploadImg from './my-upload-img.vue'
	const imgs = ref([])
	const getImgs = (imgList) =>{
		imgs.value = imgList
		console.log(imgs.value);
	}
</script>

<style scoped lang="scss"></style>