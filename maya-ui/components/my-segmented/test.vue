<template>
	
	禁用分段器
	通过设置 disabled 属性为 true，禁用分段器。
	<my-gap></my-gap>
	<my-segmented v-model="current" :list="list" disabled @change="change" />
	<my-gap></my-gap>
	
	带振动效果的分段器
	通过设置 vibrate-short 属性为 true，使手机在切换选项时产生短暂振动。
	<my-gap></my-gap>
	<my-segmented v-model="current" :list="list" vibrate-short @change="change" />
	<my-gap></my-gap>
	
	模式选择
	通过设置mode属性为 button subsection line模式
	<my-gap></my-gap>
	<my-segmented v-model="current" :list="list" mode="subsection" @change="change" />
	<my-gap></my-gap>
	<my-segmented v-model="current" :list="list" mode="button" @change="change" />
	<my-gap></my-gap>
	<my-segmented v-model="current" :list="list" mode="line" @change="change" />
	
	
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let current = ref(0)
const change = (e)=>{
	console.log(e);
}
let list = ref([
	{label:'收藏',disabled:false},
	{label:'评论',disabled:false},
	{label:'点赞',disabled:false},
	{label:'转发',disabled:false},
]);

</script>

<style lang="scss" scoped>

</style>
