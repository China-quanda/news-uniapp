<template>
	<view
		v-if="show"
		:class="['overlay', show ? 'show' : '',isHide ?'hide':'',className]" 
		:style="customStyle"
		@touchmove="moveHandle"
		@tap="handleClick">
		<slot></slot>
	</view>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
const props = defineProps({
	show: { // v-model:show 控制遮罩的显示/隐藏
		type: Boolean,
		default: false
	},
	tapClose: { //点击遮罩时是否关闭
		type: Boolean,
		default: false
	},
	bgColor: {// 背景颜色
		type: String,
		default: 'rgba(0, 0, 0, 0.5)'
	},
	className: {// 自定义遮罩类名
		type: String,
		default: ''
	},
	customStyle: {// 自定义遮罩样式
		type: Object,
		default: ()=>{}
	},
	duration:{// 显示/隐藏的动画时长，单位毫秒,设置为 0 可以禁用动画
		type: [Number,String],
		default: 300
	},
	zIndex: {// 自定义遮罩层级
		type: Number,
		default: 1
	},
	lockScroll: { //是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动
	// 1 catchtouchmove="true" 未测试 h5无效
	// 2 @touchmove.prevent="moveHandle" 未测试 h5有效 const moveHandle =()=>{return false}
	// 3 未测试 overflow: hidden; 未测试 h5无效
		type: Boolean,
		default: false
	},
});

interface EmitsType {
	(e: 'click'): void;
	(e: 'update:show',e): void;
}
const emit = defineEmits<EmitsType>();

let isHide = ref(false)

const handleClick = () => {
	emit('click');
	console.log(props.tapClose);
	if (props.tapClose) {
		isHide.value = true
		let time = setTimeout(() => {
			clearTimeout(time)
			emit('update:show',false)
			isHide.value = false
		}, props.duration);
	}
};

let duration = computed(()=>{
	return `${props.duration}ms`
})

const moveHandle =(e)=>{
	props.lockScroll && e.preventDefault()
}

</script>

<style lang="scss" scoped>
.overlay {
	position: fixed;
	inset: 0px;
	z-index: v-bind('props.zIndex');
	background-color: v-bind('props.bgColor');
}

.show{
	-webkit-animation: v-bind(duration) show ease-out forwards;
	animation: v-bind(duration) show ease-out forwards;
}
.hide {
	-webkit-animation: v-bind(duration) hide ease-out forwards;
	animation: v-bind(duration) hide ease-out forwards;
}

@keyframes show {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}


@keyframes hide {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
