<template>
	<view class="security-index">
		<my-cell title="账号锁定" isLink  @tap="router.push('security-lock?type=lock&title=账号锁定')"/>
		<my-cell title="解除锁定" isLink  @tap="router.push('security-lock?type=unlock&title=解除锁定')"/>
	</view>
</template>

<script setup lang="ts">
	import router from '@/utils/router';
</script>

<style>
</style>