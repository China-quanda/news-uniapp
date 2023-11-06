<template>
	<my-list refresherEnabled :refresherTriggered="false" showBackTop @get-data="getData">
		<view v-for="(item, index) in list" class="scroll-view-item uni-bg-blue">{{ item }}</view>
	</my-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let list = ref([]);
const getData = e => {
	console.log('getData', e);
	list.value = e.list;
};
</script>

<style lang="scss" scoped>
.scroll-view-item {
	height: 60px;
	border-bottom: 1px solid #f7f7f7;
}
</style>
