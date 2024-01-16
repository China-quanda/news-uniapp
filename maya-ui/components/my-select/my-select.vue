<template>
	<view class="my-select">
		<picker mode="selector" :value="pickerIndex" :disabled="disabled" :range="columns" :range-key="keyName"
			@change="pickSelect">
			<view :class="['my-select-text',props.disabled ? 'my-select-disabled' :'']">
				<text>{{valueName || placeholder}}</text>
				<uni-icons type="right" />
			</view>
		</picker>
	</view>
</template>

<script lang="ts">
	export default { name: 'my-example' }
</script>
<script setup lang="ts">
	import {  ref, watch } from 'vue';
	const emit = defineEmits<{
		(e : 'getSelect', obj : any) : void
	}>()
	interface ExamplePorps {
		disabled ?: boolean
		value : string | number
		columns : any[]
		keyName ?: string
		keyValue ?: string
		// title ?: string
		placeholder ?: string
		// cancelText ?: string
		// confirmText ?: string
	};
	const props = withDefaults(defineProps<ExamplePorps>(), {
		columns: () => [],
		value: '',
		keyName: 'dictLabel',
		keyValue: 'dictValue',
		// title: '',
		placeholder: '请选择',
		disabled: false,
		// cancelText: '取消',
		// confirmText: '确认'
	});
	const valueName = ref('')
	const pickerIndex = ref(0)

	// 获取dictLabel
	const getDictLabel = (value) => {
		if(!props.columns.length) return 
		props.columns.forEach((item,index)=>{
			if(value == item[props.keyValue]) {
				valueName.value = item[props.keyName]
				pickerIndex.value = index
			}
			if(value == item) {
				valueName.value = item
				pickerIndex.value = index
			}
		})
	}
	
	// 选择数据后
	const pickSelect = (e) => {
		const index = e.detail.value
		const selectData = props.columns[index]
		emit('getSelect', selectData)
	}
	
	// 监听数据回显
	watch([() => props.value, () => props.columns],
		() => {
			if (props.value !== '' && props.value !== null && props.value !== undefined && props.columns.length) {
				getDictLabel(props.value)
			}
		},
		{
			immediate: true
		}
	)
</script>
<style src="./style.scss" scoped lang="scss"/>