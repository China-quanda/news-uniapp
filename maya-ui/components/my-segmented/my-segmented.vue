<template>
	<view :class="['segmented',`segmented-${mode}`,disabled ? 'segmented-disabled' : '']">
		<view 
			v-for="(item,index) in list" :key="index"
			:id="`segmented-${index}-item`"
			:class="[
				'segmented-item',bold ? 'segmented-item-bold':'',
				modelValue === index ? 'segmented-item-active' :'',
				item?.disabled ? 'segmented-item-disabled' : ''
			]" 
			@tap="handleTap(item,index)"
		>
			<text class="text">{{item.label}}</text>
		</view>
		<view class="line"></view>
	</view>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref, watchEffect } from "vue";
const props = defineProps({
	modelValue:{ // 当前选中的值
		type: [Number, String],
		default: '0'
	},
	list:{// 选项的数组
		type:Array,
		default:()=>[]
	},
	activeColor: {// 激活时的颜色
		type: String,
		default: '#3c9cff' 
	},
	inactiveColor: {// 未激活时的颜色
		type: String,
		default: '#303133' 
	},
	mode: {// 模式选择 button subsection line
		type: String,
		default: 'subsection' 
	},
	disabled:{//是否禁用分段器
		type:Boolean,
		default:false
	},
	vibrateShort:{//切换选项时是否振动
		type:Boolean,
		default:false
	},
	fontSize: {// 字体大小，单位px
		type: String,
		default: '12px' 
	},
	bold:{//激活选项的字体是否加粗
		type:Boolean,
		default:false
	},
	bgColor: {// 背景颜色
		type: String,
		default: '#eeeeef' 
	},
	size: { //未启用 尺寸 :支持 large、normal、small、mini 四种尺寸，默认为 normal。
		type: String,
		default: 'normal',
		validator(value) {
			return ['large', 'normal', 'small','mini'].includes(value);
		}
	},
	type: {//未启用 类型 ：primary、success、info、warning、danger 默认为 default
		type: String,
		default: 'default',
		validator(value) {
			return ['primary', 'success', 'info','warning','danger','default'].includes(value);
		}
	},
});

let lineLeft = ref('')
let lineWidth = ref('')
let segmentedItem = ref([])
let segmentedItemText = ref([])

interface EmitsType {
	(e: 'update:modelValue', e): void;
	(e: 'change', e): void;
}

const emit = defineEmits<EmitsType>();

const handleTap = (data,current) =>{
	if(props.disabled || data?.disabled) return
	if(props.vibrateShort) uni.vibrateShort();
	emit('update:modelValue',current)
	emit('change',{data,current})
	setLinePosition(current)
}

onMounted(()=>{
	const query = uni.createSelectorQuery().in(this);
	
	query.selectAll('.text').boundingClientRect(data => {
		segmentedItemText.value = data
	}).exec();
	
	query.selectAll('.segmented-item').boundingClientRect(data => {
		segmentedItem.value = data
	}).exec();
})

watchEffect(()=>{
	nextTick(()=>{
		if(segmentedItem.value && segmentedItemText.value) {
			setLinePosition(props.modelValue)
		}
	})
})

const setLinePosition = (current)=>{
	let item = segmentedItem.value[current]
	let text = segmentedItemText.value[current]
	
	if(props.mode === 'subsection'){
		lineLeft.value = `${item.left}px`
		lineWidth.value = `${item.width}px`
	}
	if(props.mode === 'button'){
		lineLeft.value = `${item.left + 2}px`
		lineWidth.value = `${item.width - 4}px`
	}
	if(props.mode === 'line'){
		lineLeft.value = text.left + 'px'
		lineWidth.value = text.width + 'px'
	}
}
</script>

<style lang="scss" scoped>
	
.segmented{
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: relative;
	box-sizing: border-box;
	background-color: v-bind('props.bgColor');
	.segmented-item{
		padding: 5px 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		color: v-bind('props.inactiveColor');
		font-size: v-bind('props.fontSize');
		.text{
			z-index: 1;
		}
	}
	.segmented-item-bold{
		font-weight: bold;
	}
	.segmented-item-disabled{
		opacity: 0.7;
		cursor: not-allowed;
	}
	.segmented-item-active{
		transition: color 0.3s;
	}
	.line{
		position: absolute;
		transition: all 0.5s; 
	}
}

.segmented-subsection{
	background-color: #fff;
	border: 1px solid v-bind('props.activeColor');
	.segmented-item{
		&:not(:first-child){
			border-left: 1px solid v-bind('props.activeColor');
		}
		background-color: #fff;	
	}
	.segmented-item-active{
		color: #fff;
		// background-color: v-bind('props.activeColor');
	}
	.line{
		top: 0;
		left: v-bind(lineLeft);
		width: v-bind(lineWidth);
		height: 26.5px;
		background-color: v-bind('props.activeColor');
	}
}

.segmented-button{
	padding:3px;
	.segmented-item{
		padding: 3px 10px;
		border-radius: 3px;
	}
	.segmented-item-active{
		color: v-bind('props.activeColor');
	}
	.line{
		left: v-bind(lineLeft);
		width: v-bind(lineWidth);
		height: 22.5px;
		border-radius: 3px;
		background-color: #fff;
	}
}


.segmented-line{
	background-color: #fff;
	.segmented-item{}
	.segmented-item-active{
		color: v-bind('props.activeColor');
	}
	.line{
		bottom: 0;
		height: 1px;
		left: v-bind(lineLeft);
		width: v-bind(lineWidth);
		border-radius: 3px;
		background-color: v-bind('props.activeColor');
	}
}

.segmented-disabled{
	opacity: 0.7;
	cursor: not-allowed;
}
</style>
