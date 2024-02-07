<template>
	<view class="test">
		<my-collapse @change="change" @open="open" @close="close" value="1" :accordion="true">
			<my-collapse-item value="value" title="title" label="label" :isLink = 'false' clickable>23445</my-collapse-item>
			<my-collapse-item value="value" title="title" name="aaa">
				1
				<my-gap></my-gap>
				2
				<my-gap></my-gap>
				3
				<my-gap></my-gap>
				4
				<my-gap></my-gap>
				5
				<my-gap></my-gap>
				6
				<my-gap></my-gap>
				7
			</my-collapse-item>
			<my-collapse-item value="value" title="title" label="label" name="bbb" :disabled="true" clickable>
				1
				<my-gap></my-gap>
				2
				<my-gap></my-gap>
				3
				<my-gap></my-gap>
				4
			</my-collapse-item>
			<my-collapse-item value="value" title="title" label="label" name="ccc">
				1
				<my-gap></my-gap>
				2
				<my-gap></my-gap>
				3
				<my-gap></my-gap>
				4
				<my-gap></my-gap>
				5
			</my-collapse-item>
		</my-collapse>
	</view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
let scrollTop = ref(230);
let iconStyle = reactive({
	fontSize: '16px',
	color: '#ccc'
});
onPageScroll(e => {
	scrollTop.value = e.scrollTop;
});
const open = (e)=>{
	console.log('open',e);
}
const change = (e)=>{
	console.log('change',e);
}
const close = (e)=>{
	console.log('close',e);
}
</script>
<style scoped lang="scss">
.test {
	padding: 10px;
}
</style>
