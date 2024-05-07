<template>
	<view :style="{ height: safeAreaInsetsBottom + 'px', backgroundColor: bgColor }"
		class="my-safeAreaInsets-bottom w-full">
	</view>
</template>
<script lang="ts">
export default { name: 'MySafeAreaInsetsBottom' };
</script>
<script setup lang="ts">
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
const safeAreaInsetsBottom = appStore.systemInfo.safeAreaInsets.bottom || 0;
defineProps({
	bgColor: {
		type: String,
		default: 'transparent'
	}
});
</script>
