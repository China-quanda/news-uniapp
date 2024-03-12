<template>
  <div>
    11
  </div>
</template>

<script setup lang="ts">

const testFn = (str)=>{
  console.log()
}
	import { computed, reactive ,watchEffect,ref} from 'vue';
	// import type {ExamplePorps ,ExampleEmits} from './types'; // uniapp vue3.3+才能使用 uniapp目前还是3.2版本 不支持外部PorpsType类型 将类型定义抽取出来则会报错编译失败。 
	// defineOptions({ name: 'MyEmpty'}) //这个宏指令要vue3.3+才能使用 uniapp目前还是3.2版本 所以使用不了
	
	const emit = defineEmits<{
		(e: 'click'): void
		(e: 'change', id: number): void
		(e: 'update:show', value: string): void
	}>()
	
	
	let test = ref(2)
	
	const handleTest = ()=>{
		emit('click')
		console.log('test');
	}
	
	
	interface ExamplePorps  {
	  bgColor?: string // 背景颜色
	  columns?: string|number // 每列显示个数
	  clickable?:boolean // 是否开启格子点击反馈
	};
	
	const props = withDefaults(defineProps<ExamplePorps>(), {
		bgColor: '#fff',
		columns: 4,
		clickable:false,
	});

	defineExpose({
	  test,
		handleTest
	})
</script>

<style scoped lang="scss">

</style>