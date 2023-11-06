<template>
	<view :class="['sticky',`sticky-${position}`,disabled ? 'sticky-disabled':'']">
		<slot></slot>
	</view>
</template>
<script lang="ts" setup>
const props = defineProps({
	stickyTop: {// 吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px	H5:44，其他:0
		type:String,
		default: '0px',
	},
	stickyBottom: {// 吸底时与底部的距离，支持 px vw vh rem 单位，默认 px
		type:String,
		default: '0px',
	},
	bgColor: {// 组件背景颜色
		type: String,
		default: 'transparent' 
	},
	disabled: {// 是否禁用吸顶功能
		type:Boolean,
		default:false
	},
	zIndex: {// 设置组件的 z-index 层级
		type:Number,
		default: 100
	},
	position:{//吸附位置，可选值为 bottom top
		type: String,
		default: 'top' 
	},
});
</script>

<style lang="scss" scoped>
	.sticky{
		position: sticky;
		background-color: v-bind('props.bgColor');
		z-index: v-bind('props.zIndex');
	}
	.sticky-top{
		top: v-bind('props.stickyTop');
	}
	.sticky-bottom{
		bottom: v-bind('props.stickyBottom');
	}
	.sticky-disabled{
		position: unset;
	}
</style>
