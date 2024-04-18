<template>
	<web-view v-if="params.url" :webview-styles="webviewStyles" :src="`${params.url}`"></web-view>
</template>

<script setup lang="ts">
let params = reactive({
	url: null
})
let webviewStyles = reactive({
	progress: {
		color: "#FF3333"
	}
})
onLoad((event) => {
	params = event
	if (event.title) {
		uni.setNavigationBarTitle({
			title: event.title
		})
	}
})

</script>
