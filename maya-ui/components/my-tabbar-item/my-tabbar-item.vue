<template>
	<view class="tabbar-item" @tap="handleTap">
		<my-badge :value="badge" :max="badgeMax" :isDot="badgeDot" :customStyle="badgeStyle"/>
			<view class="tabbar-item-wrapper">
				<slot>
					<view class="tabbar-item-icon">
						<slot name="icon"><i :class="`iconfont ${props.icon}`" :style="iconStyle"></i></slot>
					</view>
					<view class="tabbar-item-text" :style="textStyle">
						<slot name="text">{{ props.text }}</slot>
					</view>
				</slot>
			</view>
	</view>
</template>

<script setup lang="ts">
import { inject, computed,reactive } from 'vue';
import { isHttp } from '@/utils/validate';
const tabbarData = inject('tabbar');
const props = defineProps({
	name: {
		// item标签的名称，作为与tabbar的v-model参数匹配的标识符
		type: String,
		default: ''
	},
	text: {
		// 描述文本
		type: String,
		default: ''
	},
	icon: {
		// 图标或者绝对路径的图片
		type: String,
		default: ''
	},
	badge: {
		type: [String, Number],
		default: 0
	},
	badgeMax:{
		type: [String, Number],
		default: 99
	},
	badgeDot: {
		//是否显示圆点，将会覆盖badge参数
		type: Boolean,
		default: false
	},
	iconStyle: {
		//图标的样式，对象形式	Object
		type: Object,
		default: () => {}
	},
	textStyle: {
		//字体的自定义样式	Object
		type: Object,
		default: () => {}
	},
	url: {
		// 点击后跳转的链接地址
		type: String,
		default: ''
	},
	openType: {
		// 跳转类型
		type: String,
		default: 'navigate',
		validator(value) {
			return ['navigate', 'redirect', 'reLaunch','switchTab','navigateBack'].includes(value);
		}
	},
	// 后续加上
	// activeIcon: {
	// 	// 激活状态的图标
	// 	type: String,
	// 	default: ''
	// },
	// inactiveIcon: {
	// 	// 未激活状态图标
	// 	type: String,
	// 	default: ''
	// },
	// 参考中间凸起按钮https://thorui.cn/doc/docs/thorui/tui-tabbar.html
});

let badgeStyle = reactive({
	fontSize :'12px',
	transform: 'scale(0.9)',
	// top:'-5px',
	right:'-25px'
})

interface EmitsType {
	(e: 'click', e): void;
}
const emit = defineEmits<EmitsType>();

const handleTap = e => {
	uni.$emit('clickTabbarItem', props);
	emit('click', props);
	if(!tabbarData.route || !props.url) return
	if (isHttp(props.url)) {
		uni.navigateTo({ url: `/pages/common/webview/index?title=${props.text}&url=${props.url}` })
	} else {
		if(props.openType === 'navigate') uni.navigateTo({ url: props.url })
		if(props.openType === 'redirect') uni.redirectTo({ url: props.url })
		if(props.openType === 'reLaunch') uni.reLaunch({ url: props.url })
		if(props.openType === 'switchTab') uni.switchTab({ url: props.url })
		if(props.openType === 'navigateBack') uni.navigateBack()
	}

};
const activeColor = computed(() => (tabbarData.modelValue == props.name ? tabbarData.activeColor : tabbarData.inactiveColor));
</script>

<style scoped lang="scss">
.tabbar-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	.tabbar-item-wrapper{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		color: v-bind(activeColor);
	}
	.tabbar-item-icon {
		display: flex;
		flex-direction: row;
		position: relative;
		width: 56px;
		justify-content: center;
		color: v-bind(activeColor);
	}
	.tabbar-item-text {
		margin-top: 2px;
		font-size: 12px;
		color: v-bind(activeColor);
	}
}
</style>
