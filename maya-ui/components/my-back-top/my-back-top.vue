<template>
	<view v-if="showBackTop" :class="['back-top',`back-top-${mode}`]" :style="customStyle" @tap="handleTap">
		<slot>
			<i :class="`iconfont ${icon}`" :style="iconStyle"></i>
			<text v-if="text" class="back-text">{{text}}</text>
		</slot>
	</view>
</template>
<script lang="ts" setup>
import {computed} from 'vue';
const props = defineProps({
	mode: {
		// 按钮形状	
		type: String,
		default: 'circle' 
	},
	icon: {
		// 图标名称	
		type: String,
		default: 'icon-xiangshang' 
	},
	text: {
		// 返回顶部按钮的提示文字
		type: String,
		default: '' 
	},
	right: {
		// 距离页面右侧的距离，默认单位为 px
		type: String,
		default: '20px' 
	},
	bottom: {
		// 距离页面底部的距离，默认单位为 px
		type: String,
		default: '40px' 
	},
	duration: {
		// 返回顶部过程中的过渡时间，单位ms
		type: [String, Number],
		default: 200 
	},
	scrollTop: {
		// 页面的滚动距离，通过onPageScroll生命周期获取
		type:[String, Number],
		default: 0,
		required:true
	},
	top: {
		// 滚动条滑动多少距离时显示，单位px
		type:[String, Number],
		default: 200 
	},
	target: {
		// 设置滚动目标 元素选择器，用于指定要滚动到的元素位置
		type:String,
		default: '' 
	},
	immediate: {
		// 是否瞬间滚动到顶部
		type:Boolean,
		default: false
	},
	 zIndex: {
		// 设置组件的 z-index 层级
		type:Number,
		default: 100
	},
	iconStyle:{
		//图标的样式，对象形式	Object
		type:Object,
		default:()=>{}
	},
	customStyle:{
		//按钮外层的自定义样式	Object
		type:Object,
		default:()=>{}
	},
});
interface EmitsType {
	(e: 'click'): void;
}
const emit = defineEmits<EmitsType>();

const handleTap = () => {
	emit('click');
	uni.pageScrollTo({
		scrollTop: 0,
		duration: props.immediate ? 0 :props.duration,
		selector: props.target
	});
}

const showBackTop = computed(()=>{
	return props.scrollTop >= props.top ? true : false
})
</script>

<style lang="scss" scoped>
	.back-top{
		position: fixed;
		right: v-bind('props.right');
		bottom: v-bind('props.bottom');
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: v-bind('props.zIndex');
		background-color: pink;
		box-sizing: border-box;
		background-color: #52c1ff;
		color: #fff;
		width: 40px;
		height: 40px;
		.back-text{
			font-size: 13px;
		}
	}
	.back-top-circle{
		border-radius: 100px;
	}
	.back-top-square{
		border-radius: 4px;
	}
</style>
