<template>
	<div class="my-switch" :class="{ 'checked': status }" @tap="handleTap">
		<span class="my-switch_core" ref="coreRef">
			<span class="my-switch_button">
				<view class="value">
					<view class="loading" v-if="loading"></view>
					<slot name="value" v-else>
						<text v-show="status">{{activeValue}}</text>
						<text v-show="!status">{{inactiveValue}}</text>
					</slot>
				</view>
			</span>
		</span>
	</div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
const props = defineProps({
	value: {
		// 通过v-model双向绑定的值
		type: [Number, String, Boolean],
		default: false
	},
	activeColor: {
		// switch 打开时的背景色
		type: [String],
		default: '#409EFF'
	},
	inactiveColor: {
		// switch 关闭时的背景色
		type: [String],
		default: '#ccc'
	},
	disabled: {
		// 是否禁用 
		type: Boolean,
		default: false
	},
	activeValue: {
		// switch打开时的值 
		type: [Number, String, Boolean],
		default: ''
	},
	inactiveValue: {
		// switch关闭时的值 
		type: [Number, String, Boolean],
		default: ''
	},
	loading: {
		// 是否处于加载中
		type: Boolean,
		default: false
	},
	size: {
		// 开关尺寸，单位px (未实现)
		type: [String, Number],
		default: ''
	},
	space: {
		//圆点与外边框的距离 (未实现)
		type: [String, Number],
		default: '1'
	}
});
let coreRef = ref(null);
let status = ref(false)
const emits = defineEmits(['update:value', 'change']);
const handleTap = () => {
	if(props.disabled || props.loading) return
	status.value = !props.value
	nextTick(() => {
		emits('update:value', !props.value); // 开关点击后的状态传给v-model
		emits('change', !props.value); //给组件增加change 事件
		setColor();
	});
};

const setColor = () => {
	const color = status.value ? props.activeColor : props.inactiveColor;
	coreRef.value.style.borderColor = color;
	coreRef.value.style.backgroundColor = color;
	
	if(props.disabled){
		coreRef.value.style.cursor = 'no-drop';
		coreRef.value.style.opacity = '0.5';
	}
};
onMounted(() => {
	status.value = props.value ? true : false
	setColor();
});

</script>

<style lang="scss" scoped>
.my-switch {
	display: inline-block;
	align-items: center;
	position: relative;
	font-size: 14px;
	line-height: 20px;
	vertical-align: middle;
	.my-switch_core {
		margin: 0;
		display: inline-block;
		position: relative;
		width: 40px;
		height: 20px;
		border: 1px solid #dcdfe6;
		outline: none;
		border-radius: 10px;
		box-sizing: border-box;
		background: #dcdfe6;
		cursor: pointer;
		transition: border-color 0.3s, background-color 0.3s;
		vertical-align: middle;
		.my-switch_button {
			position: absolute;
			top: 1px;
			left: 1px;
			border-radius: 100%;
			transition: all 0.3s;
			width: 16px;
			height: 16px;
			background-color: #fff;
		}
	}
}
/* // 选中样式 */
.checked {
	.my-switch_core {
		.my-switch_button {
			transform: translateX(20px);
		}
	}
}
.value{
	font-size: 12px;
	transform: scale(0.8);
	text-align: center;
	line-height: 1.5;
}
.loading {
  width: 16px;
  height: 16px;
  border: 2px solid #1890ff;
  border-bottom: 0.8px solid rgba(24, 144, 255, 0.2);
  border-left: 0.8px solid rgba(24, 144, 255, 0.2);
  border-right: 0.8px solid rgba(24, 144, 255, 0.2);
  border-radius: 50%;
	box-sizing: border-box;
  animation: rotate 0.75s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
