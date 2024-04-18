<template>
  <view :style="{ height: statusBarHeight + 'px', backgroundColor: bgColor }" class="my-status-bar w-full">
    <slot />
  </view>
</template>
<script lang="ts">
export default { name: 'statusBar' }
</script>
<script setup lang="ts">
const statusBarHeight = ref(0)
onMounted(() => {
  const systemInfo: GetSystemInfoResult = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight! || 0
})
defineProps({
  bgColor: {
    type: String,
    default: 'transparent'
  }
})
</script>