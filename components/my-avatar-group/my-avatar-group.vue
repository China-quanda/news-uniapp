<template>
	<view class="avatar-group">
		<view v-for="item in list" :key="item" class="avatar-group-item">
			<my-avatar 
			:src="item"
			:width="size"
			:height="size"
			:shape="shape"
			:radius="radius"
			></my-avatar>
		</view>
		<view v-if="showMore && moreNum" class="more" :alt="`+${moreNum}`">
			<my-avatar
			:src="urls[urls.length-1]"
			:width="size"
			:height="size"
			:shape="shape"
			:radius="radius"
			></my-avatar>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
const props = defineProps({
	urls:{
		// 头像图片组
		type:Array,
		required: true,
		default:()=>{}
	},
	maxCount: {
		// 最多展示的头像数量
		type: [String , Number],
		default: 5
	},
	gap: {
		// 头像之间的遮挡像素
		type: String,
		default: '-15px',
	},
	showMore: {
		// 超出maxCount时是否显示查看更多的提示
		type: Boolean,
		default: true
	},
	size: {
		//头像大小
		type: String,
		default: '40px'
	},
	shape: {
		// 头像形状，circle-圆形，square-方形
		type: String,
		default: 'circle'
	},
	radius: {
		// 圆角，默认单位px
		type: String,
		default: '4px'
	}
});
const list = ref([])
watchEffect(()=>{
	if(props.urls.length > props.maxCount){
		for (var i = 0; i < props.maxCount; i++) {
			list.value.push(props.urls[i])
		}
	}else{
		list.value = props.urls
	}
})
const moreNum = computed(()=>{
	if(props.urls.length){
		return props.urls.length > props.maxCount ? props.urls.length - props.maxCount : 0
	}else{
		return 0
	}
})
</script>

<style lang="scss" scoped>
.avatar-group {
	display: flex;
	position: relative;
	.avatar-group-item{
		&:not(:first-child) {
	    margin-left: v-bind('props.gap');
			// transform: translateX(-50%);
	  }
	}
	.more{
		position: relative;
		width: v-bind('props.size');
		height: v-bind('props.size');
		margin-left: v-bind('props.gap');
		&::before{
			position: absolute;
			content: attr(alt);
			width: 100%;
			height: 100%;
			color: #fff;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 1;
			font-size: 12px;
		}
	}
}
</style>
