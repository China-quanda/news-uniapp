<template>
	<view class="collapse">
		<view v-if="border" class="collapse-line"></view>
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
import { computed, reactive ,watchEffect,ref,provide, onMounted,nextTick,getCurrentInstance} from 'vue';
const instance = getCurrentInstance();
onMounted(()=>{
	console.log('getCurrentInstance',instance);
})
	interface CollapsePorps  {
	  value?: string | number | array // 当前展开面板的name，非手风琴模式：[<String | Number>]，手风琴模式：String | Number
	  accordion?:Boolean // 是否手风琴模式
	  border?:Boolean // 是否显示外边框
	};
	const props = withDefaults(defineProps<CollapsePorps>(), {
		value: '',
		accordion: false,
		border:true,
	});
	
	provide('collapse',props)
	
	const emit = defineEmits<{
		(e: 'change', activeNames: String | Array): void;
		(e: 'open', activeNames: String | Array): void;
		(e: 'close', activeNames: String | Array): void;
	}>();
	
	uni.$on('clickCollapseItem', data => {
		if(data.isClickable) emit('open',props.value)
		if(!data.isClickable) emit('close',props.value)
		emit('change',props.value)
	});

	// defineExpose({
	//   test,
	// 	handleTest
	// })
	
</script>



<style src="./style.scss" scoped lang="scss"></style>