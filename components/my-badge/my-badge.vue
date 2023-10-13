<script setup lang="ts">
import { watch, ref } from 'vue';

const props = defineProps({
	value: {
		type: [String, Number],
		default: 0
	},
	max: {
		type: Number
	},
	isDot: {
		type: Boolean,
		default: false
	},
	showZero: {
		type: Boolean,
		default: false
	},
	color: {
		type: String,
		default: '#fff'
	},
	bgColor: {
		type: String,
		default: '#f56c6c'
	},
	position: {
		type: String,
		default: 'top-right'
	}
});

let content = ref(props.value);
const emits = defineEmits(['click']);
const handleTap = ()=>{
	emits('click');
}
watch(
	() => props,
	() => {
		if (typeof props.value === 'number' && props.max) {
			if (props.value > props.max) {
				content.value = `${props.max}+`;
			} else {
				content.value = props.value;
			}
		} else {
			content.value = props.value;
		}
	},
	{ deep: true, immediate: true }
);
</script>

<template>
	<view class="badge">
		<text v-if="value || showZero" :class="['badge-content', isDot ? 'badge-dot' : '', position]" @tap="handleTap">{{ content }}</text>
		<slot></slot>
	</view>
</template>

<style scoped lang="scss">
.badge {
	position: relative;
	vertical-align: middle;
	display: inline-block;
	.badge-content {
		position: absolute;
		background-color: v-bind('props.bgColor');
		border-radius: 100px;
		color: v-bind('props.color');
		display: inline-block;
		font-size: 12px;
		height: 18px;
		line-height: 18px;
		padding: 0 6px;
		text-align: center;
		white-space: nowrap;
	}
	.top-left {
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
	}
	.top-right {
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
	.bottom-left {
		bottom: 0;
		left: 0;
		transform: translate(-50%, 50%);
	}
	.bottom-right {
		bottom: 0;
		right: 0;
		transform: translate(50%, 50%);
	}

	.badge-dot {
		height: 8px;
		max-height: 8px;
		width: 8px;
		max-width: 8px;
		padding: 0;
		color: v-bind('props.bgColor');
		overflow: hidden;
	}
}
</style>
