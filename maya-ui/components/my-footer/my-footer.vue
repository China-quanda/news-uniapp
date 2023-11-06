<script setup lang="ts">
const props = defineProps({
	copyright:{//底部文本
		type:String,
		default:'All Rights Reserved.'
	},
	color: {//copyright 字体颜色
		type: String,
		default: '#A7A7A7'
	},
	size: {
		type: String,
		default: '13px'
	},
	navigate: {// 导航链接设置
		type: Array,
		default: ()=>[]
	},
	bgColor:{//footer背景颜色
		type:String,
		default:'transparent'
	},
	linkColor:{//链接文本颜色，navigate 属性中未传color值时有效
		type:String,
		default:'#586c94'
	},
	fixed:{//是否固定在底部
		type:Boolean,
		default:true
	},
	zIndex: {
		// 设置组件的 z-index 层级
		type: Number,
		default: 100
	}
});
const handleClick=(row)=>{
	if(!row?.url || row?.openType) return
	if(row.openType === 'navigate') uni.navigateTo({ url: row.url })
	if(row.openType === 'redirect') uni.redirectTo({ url: row.url })
	if(row.openType === 'reLaunch') uni.reLaunch({ url: row.url })
	if(row.openType === 'switchTab') uni.switchTab({ url: row.url })
	if(row.openType === 'navigateBack') uni.navigateBack({ delta: row.delta || 1 })
}
const getLinkStyle = (row)=>{
	let style = {color:'',fonrSize:''}
	style.color = row?.color ? row.color : props.linkColor
	style.fontSize = row?.size ? row.size : props.size
	return style
}
</script>

<template>
	<view class="footer" :class="{ 'footer-fixed': fixed }">
		<view v-if="navigate.length" class="navigate">
			<text class="navigate-text" v-for="(item, index) in navigate" :key="index" @tap="handleClick(item)" :style="getLinkStyle(item)">{{ item.text }}</text>
		</view>
		<text class="Copyright">{{ copyright }}</text>
	</view>
</template>
<style scoped lang="scss">
.footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: v-bind('props.bgColor');
	z-index: v-bind('props.zIndex');
	.navigate {
		display: flex;
		cursor: pointer;
		.navigate-text {
			margin: 2px 5px;
		}
	}
	.Copyright {
		font-size: v-bind('props.size');
		color: v-bind('props.color');
	}
}
.footer-fixed {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
