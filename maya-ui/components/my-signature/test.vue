<template>
	<view class="test">
		<my-signature @confirm="confirm" />
	</view>
</template>

<script setup lang="ts">
	const confirm = (e)=>{
		console.log('e',e); // { image: string}
	}
</script>

<style scoped lang="scss">

</style>