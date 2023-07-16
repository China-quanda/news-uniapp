<template>
	<view class="my-panel" :style="{borderRadius:`${radius}px`}">
		<view class="my-panel-header">
			<slot name="header">
				<my-cell class="my-cell" 
				:title="title" 
				:label="label" 
				:value="value"
				:border="border"
				align="flex-start"
				>
				<block v-slot:icon>
					<slot name="icon">
							<my-icon v-if="icon" class="my-icon-left" :icon="icon" :size="iconSize" :color="iconColor" />
					</slot>
				</block>
				
				<block v-slot:rightIcon>
					<slot name="rightIcon">
						<my-icon v-if="rightIcon" class="my-icon-right" :icon="rightIcon" :size="iconSize" :color="iconColor" />
					</slot>
				</block>
				
				<block v-slot:title>
					<slot name="title">
						<my-text class="my-text-title" :text="props.title" :bold="bold" :size="titleSize" lines="1"/>
					</slot>
				</block>
				
				<block v-slot:label>
					<slot name="label">
						<my-text class="my-text-label" :text="props.label" />
					</slot>
				</block>
				
				<block v-slot:value>
					<slot name="value">
						<my-text class="my-text-value" :text="props.value" :size="valueSize"/>
					</slot>
				</block>
				
				</my-cell>
			</slot>
		</view>
		
		
		<view class="default">
			<slot></slot>
		</view>
		
		<view class="footer">
			<slot name="footer"> </slot>
		</view>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps({
		title: {
			// 标题
			type: String,
			default: 'default'
		},
		label: {
			// 描述
			type: String,
			default: ''
		},
		value: {
			// 状态
			type: String,
			default: ''
		},
		// 是否显示下边框
		border:{
			type: Boolean,
			default: true
		},
		radius: {
			// 圆角
			type: [String, Number],
			default: 0
		},
		bold:{
			// 标题字体粗体
			type: Boolean,
			default: false
		},
		titleSize:{
			// 标题字体大小
			type: [String, Number],
			default: 18
		},
		valueSize:{
			// 状态字体大小
			type: [String, Number],
			default: 15
		},
		icon: {
			// 前置图标
			type: String,
			default: ''
		},
		rightIcon: {
			// 后置图标
			type: String,
			default: ''
		},
		iconSize:{
			// 前后图标大小
			type: [String, Number],
			default: 18
		},
		iconColor:{
			// 前后图标颜色
			type: String,
			default: ''
		},
	})
</script>

<style lang="scss" scoped>
	.my-panel{
		display: flex;
		flex-direction: column;
		padding: 12px;
		overflow: hidden;
		background-color: #fff;
		.my-cell{
			padding: 0px;
			::v-deep.label{
				margin: 10px 0px;
			}
			.my-icon-left{
				margin-right: 8px;
			}
			.my-icon-right{
				
			}
		}
		.default{
			margin: 10px 0px;
		}
		.footer{
			
		}
	}

</style>