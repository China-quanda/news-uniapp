<!-- 发现bug；当父组件传入左侧插槽时，还会触发返回上一页，暂时解决办法是绑定clickLeft不执行操作 -->
<template>
	<view class="my-navBar">
		<uni-nav-bar 
		@clickLeft="clickLeft" 
		@clickRight="clickRight" 
		:title="title"
		:leftText="leftText"
		:rightText="rightText"
		:leftIcon="leftIcon"
		:rightIcon="rightIcon"
		:backgroundColor="backgroundColor"
		:fixed="fixed"
		:statusBar="statusBar"
		:shadow="shadow"
		:border="border"
		:height="height"
		:color="color"
		:leftWidth="leftWidth"
		:rightWidth="rightWidth"
		>
		<block v-slot:left>
			<slot name="left"></slot>
		</block>
		<view v-if="!title" @tap="clickCentre" class="default" >
			<slot name="default"></slot>
		</view>
		<block v-slot:right>
			<slot name="right"></slot>
		</block>
		</uni-nav-bar>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps({
		  title: {
		    type: String,
		    default: ''
		  },
		  leftText: {
		    type: String,
		    default: ''
		  },
		  rightText: {
		    type: String,
		    default: ''
		  },
		  leftIcon: {
		    type: String,
		    default: 'back'
		  },
		  rightIcon: {
		    type: String,
		    default: ''
		  },
		  color: {
		    type: String,
		    default: '#000000'
		  },
		  backgroundColor: {
		    type: String,
		    default: '#FFFFFF'
		  },
		  fixed: {
		    type: Boolean,
		    default: true
		  },
		  statusBar: {
		    type: Boolean,
		    default: true
		  },
		  shadow: {
		    type: Boolean,
		    default: false
		  },
			border: {
		    type: Boolean,
		    default: true
		  },
			height: {
			  type: [String, Number],
			  default: '44'
			},
			leftWidth: {
			  type: [String, Number],
			  default: '120rpx'
			},
			rightWidth: {
			  type: [String, Number],
			  default: '120rpx'
			},
		  clickLeft: {
		    type: Function,
		    default: () => {
					uni.navigateBack()
				}
		  },
			clickRight: {
			  type: Function,
			  default: () => {
					// console.log('clickRight');
				}
			},
			clickCentre: {
			  type: Function,
			  default: () => {
					// console.log('clickCentre');
				}
			}
		})
</script>

<style lang="scss" scoped>
.default{
	display: flex;
	// width: 100vw;
	flex: 1;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
}
</style>