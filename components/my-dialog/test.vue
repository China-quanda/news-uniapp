<template>
	
	<!-- <my-gap height="600px" bgColor="#ccc"></my-gap> -->
		<button @tap="tapHandle">show</button>
	
	<my-dialog :show="show" title="系统提示">
		模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作
	</my-dialog>
	
	
</template>

<script lang="ts" setup>
import { ref } from "vue";
	let show = ref(false)
const tapHandle=()=>{
	console.log(1,show.value);
	show.value = true
	console.log(2,show.value);
}
const closed=()=>{
	console.log(1,show.value);
	show.value = false
	console.log(2,show.value);
	console.log('closed');
}
const confirm =()=>{
	console.log('confirm,confirm');
}
</script>
<style lang="scss" scoped>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: calc(50vh - 50px);
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100px;
		width: 100px;
		border-radius: 8px;
		background-color: #ccc;
	}
}
</style>

