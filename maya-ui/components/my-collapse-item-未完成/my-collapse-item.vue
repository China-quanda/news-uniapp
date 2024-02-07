<template>
	<view class="collapse-item" @click="toggleHandle()">
		
		<my-cell :border="border" :isLink="isLink" :clickable="clickable" :disabled="disabled">
			<template #icon>
				<slot name="icon"><my-icon v-if="icon" class="icon" :icon="icon" size="16" color="#969799" /></slot>
			</template>
			
			<template #title>
				<slot name="title">{{ title }}</slot>
			</template>
			
			<template #label>
				<slot name="label">{{ label }}</slot>
			</template>
			
			<template #value>
				<slot name="value">{{ value }}</slot>
			</template>
			
			<template #rightIcon>
				<my-icon :class="['icon', `icon-${isClickable ? 'shang' : 'xia'}`]" icon="icon-xiala" size="14" color="#969799" />
			</template>
		</my-cell>
		
		<view class="collapse-item-content" :style="style">
			<view class="collapse-item-content-text" :data-name="name"><slot></slot></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect, ref, inject, onMounted, nextTick } from 'vue';
import { getRect } from '@/maya-ui/utils/gloal';
const collapse = inject('collapse');

interface CollapseItemPorps {
	title?: String; // 面板标题
	value?: String; // 标题右侧内容
	label?: String; // 标题下方的描述信息
	isLink?: Boolean; // 是否展示右侧箭头并开启点击反馈
	clickable?: Boolean; // 是否开启点击反馈
	disabled?: Boolean; // 是否禁用面板
	border?: Boolean; // 是否显示内边框
	name?: String | Number; // 唯一标识符，如不设置，默认用当前collapse-item的索引值
	icon?: String; //标题左侧图片，可为绝对路径的图片或内置图标
	duration?: Number; // 面板展开收起的过渡时间，单位ms
}
const props = withDefaults(defineProps<CollapseItemPorps>(), {
	title: '',
	value: '',
	label: '',
	isLink: true,
	clickable: false,
	border: true,
	disabled:false,
	name: '',
	icon: '',
	duration: 300
});

let contentTexts = ref([]);
let isClickable = ref(false);

onMounted(() => {
	nextTick(() => {
		init()
	});
});

let duration = computed(() => {
	return props.duration + 'ms';
});

const style = computed(() => {
	let style = {
		height: '0px',
		transition: `height ${duration.value} ease-in-out 0ms`,
		transform: `${duration.value} ease-in-out 0ms`,
		'-webkit-transform': `${duration.value} ease-in-out 0ms`,
		'transform-origin': `50% 50% 0px`
	};
	if (isClickable.value) {
		let res = contentTexts.value.find(item => item.dataset.name && item.dataset.name === props.name);
		if (res) {
			style.height = `${res.height}px`;
		}
	} else {
		style.height = '0px';
	}
	return style;
});

const toggleHandle = (expand) => {
	if (props.disabled) return;
	isClickable.value = expand || !isClickable.value;
	uni.$emit('clickCollapseItem', {...props,isClickable:isClickable.value});
	console.log('collapse.accordion',collapse.accordion);
	if(collapse.accordion){
		console.log('开启手风琴模式');
		// toggleHandle(false)
		console.log(1);
	}else{
		console.log('未开启手风琴模式');
	}
};

const init = ()=>{
	getRect('.collapse-item-content-text', 'selectAll').then(res => {
		contentTexts.value = res;
	});
}

defineExpose({
	collapse:isClickable,
	toggle:toggleHandle,
	init
})

</script>
<!-- <style src="./style.scss" scoped lang="scss"></style> -->
<style scoped lang="scss">
.collapse-item {
	.collapse-item-content {
		overflow: hidden;
		.collapse-item-content-text{
			padding: 10px 15px;
		}
	}
	.icon {
		margin-left: 5px;
	}
}

.icon-shang {
	-webkit-animation: v-bind(duration) shang ease-out forwards;
	animation: v-bind(duration) shang ease-out forwards;
}
.icon-xia {
	-webkit-animation: v-bind(duration) xia ease-out forwards;
	animation: v-bind(duration) xia ease-out forwards;
}

@keyframes shang {
	0% {
		transform: rotateZ(0deg);
	}
	100% {
		transform: rotateZ(-180deg);
	}
}

@keyframes xia {
	0% {
		transform: rotateZ(-180deg);
	}
	100% {
		transform: rotateZ(0deg);
	}
}
</style>
