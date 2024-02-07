<template>
		
		<my-collapse></my-collapse>
		
	
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
let scrollTop = ref(230)
let iconStyle = reactive({
	fontSize:'16px',
	color:'#ccc'
})
onPageScroll(e => {
	scrollTop.value = e.scrollTop
})
</script>
<style scoped lang="scss">
	
</style>

