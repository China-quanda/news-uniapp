<template>
	<view :class="[
		'divider',
		hairline?'divider-hairline':'',
		dashed?'divider-dashed':'',
		vertical?'divider-vertical':'',
		`divider-${textPosition}`,
	]">
		<view class="divider-line"></view>
		<template v-if="dot"><view class="divider-dot"></view></template>
		<template v-if="!dot && !vertical && isText"><view class="divider-text"><slot>{{text}}</slot></view></template>		
		<view class="divider-line"></view>
	</view>
</template>
<script lang="ts" setup>
import { useSlots ,computed} from "vue";
const slots = useSlots()
const props = defineProps({
	dashed:{//是否使用虚线
		type:Boolean,
		default:false
	},
	hairline:{//是否细线 是否使用 0.5px 线
		type:Boolean,
		default:true
	},
	vertical:{//是否使用垂直
		type:Boolean,
		default:false
	},
	dot:{//是否以点替代文字，优先于text字段起作用
		type:Boolean,
		default:false
	},
	textPosition: {//内容文本的位置 ：left right		center
		type: String,
		default: 'center',
		validator(value) {
			return ['left', 'right', 'center'].includes(value);
		}
	},
	text: {// 文本内容
		type: [Number, String],
		default: '' 
	},
	textSize: {// 字体大小，单位px
		type: String,
		default: '14px' 
	},
	textColor: {// 文本颜色
		type: String,
		default: '#909399' 
	},
	lineColor: {// 线条颜色
		type: String,
		default: '#dcdfe6' 
	},
});

const isText = computed(()=>{
	if(!!slots.default || props.text) return true
	return false
})

</script>

<style lang="scss" scoped>
	.divider{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 15px 0;
		.divider-dot{
			opacity: 0.6;
			margin: 0 8px;
			border-radius: 50%;
			width: 8px;
			height: 8px;
			background-color: v-bind('props.textColor');
		}
		.divider-text{
			margin: 0 8px;
			font-size: v-bind('props.textSize');
			color: v-bind('props.textColor');
		}
		.divider-line{
			border: 1px solid v-bind('props.lineColor');
			flex: 1;
		}
	}
	.divider-vertical{
		display: inline-block;
		margin: 0 8px;
		vertical-align: middle;
		.divider-text{
			display: none;
		}
		.divider-line{
			border-width: 0.5px;
			height: 1em;
			&:first-child{
				display: none;
			}
		}
	}
	
	
	
	.divider-dashed{
		.divider-line{
			border-style: dashed;
		}
	}
	
	.divider-hairline{
		.divider-line{
			border-width: 0.5px;
		}
	}
	
	.divider-left{
		.divider-line{
			&:first-child{
				flex: 0.2;
			}
		}
	}
	
	.divider-right{
		.divider-line{
			&:last-child{
				flex: 0.2;
			}
		}
	}
</style>
