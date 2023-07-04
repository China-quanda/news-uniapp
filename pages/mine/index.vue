<template>
	我的
	<button @tap="toLogin">去登录</button>
</template>

<script setup lang="ts">
	let toLogin =()=>{
		console.log(1);
		uni.navigateTo({
			url:'/pages/login/login'
		})
	}
</script>

<style>
</style>