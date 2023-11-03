<template>
	<template v-if="loading">
		<view :class="['skeleton', animation ? 'skeleton-animation' : '']">
			<slot name="template">
				<my-skeleton-avatar v-if="avatar" :size="avatarSize" :round="avatarRound"/>
				<view class="skeleton-content">
					<my-skeleton-title v-if="title" :width="titleWidth" :height="titleHeight" :round="round"/>
					<my-skeleton-line v-for="(item,index) in Number(props.line)" :key="item"  :width="getLineWidth(index)" :height="getLineHeight(index)" :round="round"/>
				</view>
			</slot>
		</view>
	</template>
	<template v-else>
		<slot></slot>
	</template>
</template>
<script lang="ts" setup>
const props = defineProps({
	animation: {		// 是否开启动画效果
		type: Boolean,
		default: true
	},
	bgColor: {		// 组件背景颜色
		type: String,
		default: '#f2f3f5'
	},
	loading: {// 是否显示骨架屏，传 false 时会展示子组件内容
		type: Boolean,
		default: true
	},
	round: {// 是否将标题和段落显示为圆角风格
		type: Boolean,
		default: false
	},
	avatar: {// 是否显示头像占位图
		type: Boolean,
		default: false
	},
	avatarSize:{ // 头像占位图大小
		type: String,
		default: '32px'
	},
	avatarRound:{ // 头像占位图是否显示圆形
		type: Boolean,
		default: true
	},
	title: {// 是否显示标题占位图
		type: Boolean,
		default: false
	},
	titleWidth:{ // 标题占位图宽度
		type: String,
		default: '40%'
	},
	titleHeight:{ // 标题占位图高度
		type: String,
		default: '15px'
	},
	line:{ // 段落占位图行数
		type: [String,Number],
		default: 3
	},
	lineWidth:{ // 段落占位图宽度，可传数组来设置每一行的宽度
		type: [String,Number,Array],
		default: ()=>['100%','100%','50%']
	},
	lineHeight:{ //  段落占位图高度，可传数组来设置每一行的宽度
		type: [String,Number,Array],
		default: '15px'
	}
});

const getLineWidth =(index)=>{
	let width = ''
	let lineWidth = props.lineWidth
	if(Array.isArray(lineWidth)){
		width = lineWidth[index] ? lineWidth[index] : '100%'
	}else{
		width = lineWidth
	}
	return width
}

const getLineHeight =(index)=>{
	let height = ''
	let lineHeight = props.lineHeight
	if(Array.isArray(lineHeight)){
		height = lineHeight[index] ? lineHeight[index] : '15px'
	}else{
		height = lineHeight
	}
	return height
}
</script>

<style lang="scss" scoped>
// 呼吸灯效果
.skeleton {
	padding: 10px;
	display: flex;
	
	:deep(.skeleton-title) {
		margin-bottom: 18px;
		background-color: v-bind('props.bgColor');
	}
	
	:deep(.skeleton-line) {
		margin-bottom: 12px;
		background-color: v-bind('props.bgColor');
	}
	
	:deep(.round){
		border-radius: 100px;
	}
	
	:deep(.skeleton-avatar){
		display: inline-block;
		background-color: v-bind('props.bgColor');
	}
	
	:deep(.skeleton-image){
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: v-bind('props.bgColor');
	}
	
	.skeleton-avatar {
		flex-shrink: 0;
		margin-right: 15px;
	}
	.skeleton-content {
		flex: 1;
	}
}
.skeleton-animation {
	animation: skeleton-blink 1.2s ease-in-out infinite;
	@keyframes skeleton-blink {
		50% {
			opacity: 0.6;
		}
	}
}

// 加载效果
// .skeleton2 {
//   background: linear-gradient(
//     to right,
//     #f6f7f8 0%,
//     #edeef1 10%,
//     #f6f7f8 20%,
//     #f6f7f8 100%
//   );
//   background-size: 200% 100%;
// 	*{
// 		background-color: #f2f3f5 !important;
// 	}
// }
// .skeleton-animation2{
// 	animation: flow 1s linear infinite;
// 	@keyframes flow {
// 	  0% {
// 	    background-position: 50% 0;
// 	  }

// 	  100% {
// 	    background-position: -150% 0;
// 	  }
// 	}
// }
</style>
