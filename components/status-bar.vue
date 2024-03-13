<template>
	<view :style="{ height: statusBarHeight }" class="status-bar bg-red w-full">
		<slot />
	</view>
</template>
<script lang="ts">
	export default { name: 'statusBar' }
</script>
<script setup lang="ts">
const statusBarHeight = ref('0px')
onMounted(() => {

	statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight + 'px'
  console.log('statusBarHeight.value',statusBarHeight.value)

})
</script>

<style lang="scss" >
	.status-bar {
		// height: 20px;
		height: var(--status-bar-height);
	}
</style>
