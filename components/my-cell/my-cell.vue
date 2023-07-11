<template>
	<view :class="[
		props.clickable ? 'clickable' : '',
		props.border ? 'border' : '' ,
		'my-cell'
		]" 
		@tap="toRouter">
		<view class="my-cell-left">
			<view class="title">
				<slot name="icon"></slot>
				<slot name="title">{{props.title}}</slot>
			</view>
			<view class="label">
				<slot name="label">{{props.label}}</slot>
			</view>
		</view>
		<view class="my-cell-right">
			<view class="value"><slot name="value">{{props.value}}</slot></view>
			<view class="rightIcon" v-if="props.isLink">
				<slot name="rightIcon"><my-icon :icon="props.rightIcon" size="14" color="#969799"/></slot>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive ,onUpdated} from 'vue';
	import router from '@/utils/router';
	import {isHttp} from '@/utils/validate';
	const props = defineProps({
		// 左侧标题
		title: {
			type: String,
			default: ''
		},
		// 标题下方的描述信息
		label: {
			type: String,
			default: ''
		},
		// 右侧的内容
		value: {
			type: String,
			default: ''
		},
		// 是否显示下边框
		border:{
			type: Boolean,
			default: true
		},
		// 点击后跳转的URL地址
		url:{
			type: String,
			default: ''
		},
		// 链接跳转的方式
		linkType:{
			type: String,
			default: 'push'
		},
		// 是否开启点击反馈(表现为点击时加上灰色背景)
		clickable:{
			type: Boolean,
			default: true
		},
		// 是否展示右侧箭头并开启点击反馈
		isLink:{
			type: Boolean,
			default: true
		},
		// 右侧的图标箭头
		rightIcon:{
			type: String,
			default: 'icon-xiangyoujiantou'
		}
	});
	const toRouter = ()=>{
		if(!props.url) return
		if(isHttp(props.url)){
			router.push(`/pages/common/webview/index?title=${props.title}&url=${props.url}`)
		}else{
			if(props.linkType === 'push') return router.push(props.url)
			if(props.linkType === 'tab') return router.tab(props.url)
			if(props.linkType === 'redirect') return router.redirect(props.url)
			if(props.linkType === 'reLaunch') return router.reLaunch(props.url)
		}
	}
</script>

<style lang="scss" scoped>
.my-cell{
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding:10px 12px;
	background-color: #fff;
	color: #323233;
	font-size: 14px;
}
.clickable{
	&:active{
		background-color: rgba(255,255,255,0.01);
		transform: all 0.5s;
	}
}
.border{
	border-bottom:0.5px solid #ebedf0;
}
.my-cell-left{
	.label{
		color: #c3b8b8;
		font-size: 13px;
	}
}
.my-cell-right{
	display: flex;
	align-items: center;
	.value{
		color: #c3b8b8;
		font-size: 13px;
	}
}
</style>