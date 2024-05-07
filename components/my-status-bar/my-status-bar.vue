<template>
	<view :style="{ height: statusBarHeight + 'px', backgroundColor: bgColor }" class="my-status-bar w-full"></view>
	<slot />
</template>
<script lang="ts">
export default { name: 'MyStatusBar' };
</script>
<script setup lang="ts">
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
const statusBarHeight = appStore.systemInfo.safeAreaInsets.top || 0;
defineProps({
	bgColor: {
		type: String,
		default: 'transparent'
	}
});
</script>
