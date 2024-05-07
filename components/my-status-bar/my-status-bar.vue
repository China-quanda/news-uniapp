<template>
	<view :style="{ height: statusBarHeight + 'px', backgroundColor: bgColor }" class="my-status-bar w-full"></view>
	<slot />
</template>
<script lang="ts">
export default { name: 'statusBar' };
</script>
<script setup lang="ts">
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
const systemInfo: GetSystemInfoResult = appStore.systemInfo;
const statusBarHeight = systemInfo.statusBarHeight || 0;
defineProps({
	bgColor: {
		type: String,
		default: 'transparent'
	}
});
</script>
