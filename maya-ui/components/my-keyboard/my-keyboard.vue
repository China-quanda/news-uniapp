<script setup lang="ts">
import { watch, ref, reactive } from 'vue';

const props = defineProps({
	type: {
		//键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘
		type: String,
		default: 'number',
		validator(value) {
			return ['number', 'car', 'card'].includes(value);
		}
	},
	dotDisabled: {
		//是否显示"."按键，只在mode=number时有效
		type: Boolean,
		default: false
	},
	random: {
		//是否打乱键盘按键的顺序
		type: Boolean,
		default: false
	},
	tooltip: {
		//是否显示键盘顶部工具条
		type: Boolean,
		default: true
	},
	showTips: {
		//是否显示工具条中间的提示
		type: Boolean,
		default: true
	},
	tips: {
		//工具条中间的提示文字
		type: String,
		default: ''
	},
	showCancel: {
		//是否显示工具条左边的"取消"按钮
		type: Boolean,
		default: true
	},
	showConfirm: {
		//是否显示工具条右边的"完成"按钮
		type: Boolean,
		default: true
	},
	confirmText: {
		//确认按钮的文字
		type: String,
		default: '确认'
	},
	cancelText: {
		//取消按钮的文字
		type: String,
		default: '取消'
	},
	zIndex: {
		//弹出键盘的z-index值
		type: [String, Number],
		default: 1024
	}, 
	// 以下未实现 =====
	// 可以通过 v-model 绑定键盘当前输入值，并通过 maxlength 属性来限制输入长度。
	show: {
		//控制键盘的弹出与收起
		type: Boolean,
		default: true
	},
	maxlength: {
		//输入值最大长度
		type: Number
	},
	safeAreaInsetBottom: {
		//是否开启底部安全区适配
		type: Boolean,
		default: false
	},
	closeOnClickOverlay: {
		//是否允许点击遮罩收起键盘（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调）
		type: Boolean,
		default: false
	},
	overlay: {
		//是否显示遮罩
		type: Boolean,
		default: false
	}
});
// 打乱数组
const shuffle = arr => {
	for (let i = arr.length - 1; i >= 0; i--) {
		let rIndex = Math.floor(Math.random() * (i + 1));
		// 打印交换值
		// console.log(i, rIndex);
		let temp = arr[rIndex];
		arr[rIndex] = arr[i];
		arr[i] = temp;
	}
	return arr;
};
const tipsVal = ref('数字键盘');
let carModeKeyboard = ref<boolean>(true);
const numbermKeyboard = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
const carAreaKeyboard = ref([
	'京',
	'沪',
	'粤',
	'津',
	'冀',
	'豫',
	'云',
	'辽',
	'黑',
	'湘',
	'皖',
	'鲁',
	'苏',
	'浙',
	'赣',
	'鄂',
	'桂',
	'甘',
	'晋',
	'陕',
	'蒙',
	'吉',
	'闽',
	'贵',
	'渝',
	'川',
	'青',
	'琼',
	'宁',
	'使'
]);
const carAzKeyboard = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z']);
const emits = defineEmits(['change', 'delete', 'confirm', 'cancel', 'close']);
// 切换车牌输入模式
const toggle = () => {
	carModeKeyboard.value = !carModeKeyboard.value;
};
// 按键被点击(不包含退格键被点击)
const clickKeyboard = val => {
	console.log('change', val);
	emits('change', val);
};
// 键盘退格键被点击
const backspace = () => {
	console.log('delete');
	emits('delete');
};
//键盘顶部工具条右边的"完成"按钮被点击
const confirm = () => {
	console.log('confirm');
	emits('confirm');
};
//键盘顶部工具条左边的"取消"按钮被点击
const cancel = () => {
	console.log('cancel');
	emits('cancel');
};
// 键盘关闭
const close = () => {
	console.log('close');
	emits('close');
};

watch(
	() => props,
	() => {
		if (props.type === 'number') tipsVal.value = '数字键盘';
		if (props.type === 'card') tipsVal.value = '身份证键盘';
		if (props.type === 'car') tipsVal.value = '车牌号键盘';
		if (props.random) {
			if (props.type === 'number' || props.type === 'card') {
				numbermKeyboard.value = shuffle(numbermKeyboard.value);
			}
			if (props.type === 'car') {
				if(carModeKeyboard.value){
					carAreaKeyboard.value = shuffle(carAreaKeyboard.value);
				}else{
					carAzKeyboard.value = shuffle(carAzKeyboard.value);
				}
			}
		}
	},
	{ deep: true, immediate: true }
);

</script>

<template>
	<view v-if="show" class="keyboard">
		<view v-if="tooltip" class="keyboard-tooltip">
			<view>
				<text v-if="showCancel" class="tooltip-item tooltip-cancel" @click="cancel">{{ cancelText }}</text>
			</view>
			<view>
				<text v-if="showTips" class="tooltip-item tooltip-tips">{{ tips || tipsVal }}</text>
			</view>
			<view>
				<text v-if="showConfirm" class="tooltip-item tooltip-confirm" @click="confirm">{{ confirmText }}</text>
			</view>
		</view>
		<view class="keyboard-body">
			<template v-if="type === 'number'">
				<view v-for="key in numbermKeyboard" :key="key" class="button-wrapper" @click="clickKeyboard(key)">
					<text class="button-wrapper-text">{{ key }}</text>
				</view>
				<view v-if="dotDisabled" class="button-wrapper" @click="clickKeyboard('.')"><text class="button-wrapper-text">.</text></view>
				<view class="button-wrapper" :class="{ dotDisabled: !dotDisabled }" @click="clickKeyboard('0')"><text class="button-wrapper-text">0</text></view>
				<view class="button-wrapper delete" @click="backspace"><i class="iconfont icon-24gl-delete"></i></view>
			</template>
			<template v-if="type === 'car'">
				<template v-if="carModeKeyboard">
					<view v-for="key in carAreaKeyboard" :key="key" class="button-row-wrapper" @click="clickKeyboard(key)">
						<text class="button-row-wrapper-text">{{ key }}</text>
					</view>
				</template>
				<template v-else>
					<view v-for="key in carAzKeyboard" :key="key" class="button-row-wrapper" @click="clickKeyboard(key)">
						<text class="button-row-wrapper-text">{{ key }}</text>
					</view>
				</template>
				<view class="button-row-wrapper" @click="toggle">
					<view class="button-row-wrapper-text button-row-wrapper-btn">
						<text :class="{ show: carModeKeyboard }">中</text>
						<text>/</text>
						<text :class="{ show: !carModeKeyboard }">英</text>
					</view>
				</view>
				<view class="button-row-wrapper" @click="clickKeyboard(carModeKeyboard ? '臧' : 'X')">
					<text class="button-row-wrapper-text">{{ carModeKeyboard ? '臧' : 'X' }}</text>
				</view>
				<view class="button-row-wrapper" @click="clickKeyboard(carModeKeyboard ? '港' : 'C')">
					<text class="button-row-wrapper-text">{{ carModeKeyboard ? '港' : 'C' }}</text>
				</view>
				<view class="button-row-wrapper" @click="clickKeyboard(carModeKeyboard ? '澳' : 'V')">
					<text class="button-row-wrapper-text">{{ carModeKeyboard ? '澳' : 'V' }}</text>
				</view>
				<view class="button-row-wrapper" @click="clickKeyboard(carModeKeyboard ? '新' : 'B')">
					<text class="button-row-wrapper-text">{{ carModeKeyboard ? '新' : 'B' }}</text>
				</view>
				<view class="button-row-wrapper" @click="clickKeyboard(carModeKeyboard ? '台' : 'N')">
					<text class="button-row-wrapper-text">{{ carModeKeyboard ? '台' : 'N' }}</text>
				</view>
				<view class="button-row-wrapper" @click="clickKeyboard(carModeKeyboard ? '学' : 'M')">
					<text class="button-row-wrapper-text">{{ carModeKeyboard ? '学' : 'M' }}</text>
				</view>
				<view class="button-row-wrapper" @click="backspace">
					<view class="button-row-wrapper-text button-row-wrapper-btn">
						<view class="delete" @click="backspace"><i class="iconfont icon-24gl-delete"></i></view>
					</view>
				</view>
			</template>
			<template v-if="type === 'card'">
				<view v-for="key in numbermKeyboard" :key="key" class="button-wrapper" @click="clickKeyboard(key)">
					<text class="button-wrapper-text">{{ key }}</text>
				</view>
				<view class="button-wrapper" @click="clickKeyboard('x')"><text class="button-wrapper-text">x</text></view>
				<view class="button-wrapper" :class="{ dotDisabled: !dotDisabled }" @click="clickKeyboard('0')"><text class="button-wrapper-text">0</text></view>
				<view class="button-wrapper delete" @click="backspace"><i class="iconfont icon-24gl-delete"></i></view>
			</template>
		</view>
	</view>
</template>

<style scoped lang="scss">
.keyboard {
	position: fixed;
	bottom: 0;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	flex-grow: 0;
	flex-basis: auto;
	align-items: stretch;
	z-index: v-bind('props.zIndex');
	.keyboard-tooltip {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #fff;
		padding: 14px 12px;
		.tooltip-item {
			color: #333;
			flex: 1;
			text-align: center;
			font-size: 15px;
		}
		.tooltip-cancel {
			text-align: left;
			color: #888;
		}
		.tooltip-tips {
			color: #909193;
		}
		.tooltip-confirm {
			text-align: right;
			color: #3c9cff;
		}
	}
	.keyboard-body {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #e0e6eb;
		flex-wrap: wrap;
		padding: 8px 3px 8px 3px;
		.button-wrapper {
			box-shadow: 0 2px 0 #bbbcbe;
			margin: 4px 2px;
			border-radius: 4px;
			width: 115px;
			height: 34px;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-radius: 4px;
			&:active {
				background-color: #bbbcc6;
			}
			.button-wrapper-text {
				font-size: 20px;
				font-weight: 500;
				color: #303133;
			}
		}
		.dotDisabled {
			width: 238px;
		}
		.delete {
			&:active {
				opacity: 0.6;
			}
			.iconfont {
				font-size: 20px;
				font-weight: 500;
			}
		}
		.button-row {
			display: flex;
			flex-direction: row;
			justify-content: center;
			flex: 1;
		}
		.button-row-wrapper {
			box-shadow: 0 1px 0 #999992;
			margin: 3px 1px;
			border-radius: 4px;
			.button-row-wrapper-text {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 33px;
				background-color: #fff;
				height: 30px;
				border-radius: 4px;
				font-size: 16px;
				color: #303133;
			}
			.button-row-wrapper-btn {
				width: 70px;
				background-color: #bbbcc6;
				&:active {
					opacity: 0.6;
				}
				.show {
					color: #3c9cff;
				}
			}
		}
	}
}
</style>
