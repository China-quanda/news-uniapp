<template>
	<view class="read-more">
		<view :class="['read-more-content', isOpen ? 'read-more-content-auto' : '']">
			<view class="slot" ref="slotRef">
				<slot></slot>
			</view>
		</view>
		<view v-if="showHeight && showToggle" :class="['read-more-toggle', !isOpen ? 'read-more-toggle-show' : '']">
			<view class="read-more-toggle-text" @tap="handleToggle">
				<text v-if="!isOpen">
					{{ openText }}
					<my-icon icon="icon-xiala" :color="color"/>
				</text>
				<text v-if="isOpen && toggle">
					{{ closeText }}
					<my-icon icon="icon-xiangshang" :color="color"/>
				</text>
			</view>
		</view>
	</view>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref, watchEffect } from 'vue';
const props = defineProps({
	showHeight: {
		// 内容超出此高度才会显示展开全文按钮，单位px
		type: String,
		default: ''
	},
	toggle: {
		// 展开后是否显示收起按钮
		type: Boolean,
		default: false
	},
	closeText: {
		// 关闭时的提示文字
		type: String,
		default: '收起'
	},
	openText: {
		// 展开时的提示文字
		type: String,
		default: '展开阅读全文'
	},
	fontSize: {
		// 提示文字的大小，默认单位px
		type: String,
		default: '14px'
	},
	color: {
		// 提示文字的颜色
		type: String,
		default: '#2979ff'
	}
});
const emits = defineEmits(['open', 'close']);
const showToggle = ref(false);
const isOpen = ref(false);
const slotRef = ref()
onMounted(()=>{
	init()
})

const init = ()=>{
	let h = props.showHeight.substr(0,props.showHeight.length-2)
	// #ifdef APP-PLUS
	const query = uni.createSelectorQuery().in(this);
	query.select('.slot').boundingClientRect(data => {
		showToggle.value = data.height > Number(h) ? true : false
	}).exec();
	// #endif
	// #ifdef H5
	nextTick(()=>{
		showToggle.value = slotRef.value.$el.offsetHeight > Number(h) ? true : false
	})
	// #endif
}

const handleToggle = () => {
	if (!props.showHeight) return;
	isOpen.value = !isOpen.value;
	if (isOpen.value) {
		emits('close', isOpen.value);
	} else {
		emits('open', isOpen.value);
	}
};
defineExpose({
	init
})
</script>

<style lang="scss" scoped>
.read-more {
	position: relative;
	background-color: #fff;
	.read-more-content {
		height: v-bind('props.showHeight');
		overflow: hidden;
	}
	.read-more-content-auto {
		height: auto;
	}
	.read-more-toggle {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.read-more-toggle-text {
			margin-top: 6px;
			font-size: v-bind('props.fontSize');
			color: v-bind('props.color');
			line-height: 14px;
		}
	}
	.read-more-toggle-show {
		background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 80%);
		padding-top: 100px;
		margin-top: -100px;
	}
}
</style>
